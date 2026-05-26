import { Ionicons } from '@expo/vector-icons';
import { useField } from 'formik';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, TextInput, View } from 'react-native';

import { Text } from '@/src/components/ui/text';
import { useCategories } from '@/src/hooks/use-categories';
import type { Category } from '@/src/types/categories';

interface FormikCategoryMultiSelectProps {
  name: string;
  label: string;
  placeholder?: string;
}

export function FormikCategoryMultiSelect({
  name,
  label,
  placeholder = 'Search categories…',
}: FormikCategoryMultiSelectProps) {
  const [field, meta, helpers] = useField<string[]>(name);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedById, setSelectedById] = useState<Record<string, Category>>({});

  const selectedIds = field.value ?? [];

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const shouldSearch = debouncedSearch.length > 0;

  const {
    data: searchResults = [],
    isLoading,
    isFetching,
  } = useCategories({ name: debouncedSearch }, { enabled: shouldSearch });

  const showError = Boolean(meta.touched && meta.error);
  const availableCategories = shouldSearch
    ? searchResults.filter((category) => !selectedIds.includes(category.id))
    : [];

  const addCategory = (category: Category) => {
    if (selectedIds.includes(category.id)) return;
    void helpers.setValue([...selectedIds, category.id]);
    setSelectedById((current) => ({ ...current, [category.id]: category }));
    setSearch('');
  };

  const removeCategory = (categoryId: string) => {
    void helpers.setValue(selectedIds.filter((id) => id !== categoryId));
    setSelectedById((current) => {
      const next = { ...current };
      delete next[categoryId];
      return next;
    });
  };

  const handleBlur = () => {
    void helpers.setTouched(true);
  };

  return (
    <View className="mb-4 last:mb-0">
      <Text className="mb-1.5 text-sm font-semibold text-neutral-800">{label}</Text>

      {selectedIds.length > 0 ? (
        <View className="mb-3 flex-row flex-wrap gap-2">
          {selectedIds.map((categoryId) => {
            const category = selectedById[categoryId];
            return (
              <View
                key={categoryId}
                className="flex-row items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5"
              >
                <Text className="text-sm font-medium text-primary-800">
                  {category?.name ?? 'Category'}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${category?.name ?? 'category'}`}
                  className="ml-1.5 p-0.5"
                  hitSlop={8}
                  onPress={() => removeCategory(categoryId)}
                >
                  <Ionicons name="close-circle" size={18} color="#a32222" />
                </Pressable>
              </View>
            );
          })}
        </View>
      ) : null}

      <View
        className={`rounded-xl border bg-neutral-50 ${showError ? 'border-danger-600' : 'border-neutral-200'}`}
      >
        <View className="flex-row items-center px-4 py-3">
          <Ionicons name="search-outline" size={18} color="#71717a" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            onBlur={handleBlur}
            placeholder={placeholder}
            placeholderTextColor="#a1a1aa"
            className="ml-2 flex-1 text-base text-neutral-900"
            returnKeyType="search"
          />
          {shouldSearch && (isLoading || isFetching) ? (
            <ActivityIndicator size="small" color="#a32222" />
          ) : null}
        </View>

        {!shouldSearch ? (
          <View className="border-t border-neutral-200 px-4 py-3">
            <Text className="text-sm text-neutral-500">Type to search for categories.</Text>
          </View>
        ) : availableCategories.length > 0 ? (
          <ScrollView
            className="max-h-44 border-t border-neutral-200"
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
          >
            {availableCategories.map((category, index) => (
              <Pressable
                key={category.id}
                className={`flex-row items-center px-4 py-3 ${
                  index < availableCategories.length - 1 ? 'border-b border-neutral-100' : ''
                }`}
                onPress={() => addCategory(category)}
              >
                <Text className="flex-1 text-base text-neutral-800">{category.name}</Text>
                <Ionicons name="add-circle-outline" size={20} color="#c62828" />
              </Pressable>
            ))}
          </ScrollView>
        ) : !isLoading && !isFetching ? (
          <View className="border-t border-neutral-200 px-4 py-3">
            <Text className="text-sm text-neutral-500">No categories match your search.</Text>
          </View>
        ) : null}
      </View>

      {showError ? <Text className="mt-1.5 text-xs text-danger-600">{meta.error}</Text> : null}
    </View>
  );
}
