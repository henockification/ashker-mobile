import { useMemo } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AltArrowLeft from '@/assets/icons/alt-arrow-left.svg';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import { Text } from '@/src/components/ui/text';
import { useCategories } from '@/src/hooks/use-categories';
import type { Category, CategorySection } from '@/src/types/categories';
import { RegistryIcon } from '@/src/utils/iconRegistry';

const iconColor = '#18181b';

function buildCategorySections(categories: Category[] | undefined): CategorySection[] {
  if (!Array.isArray(categories)) {
    return [];
  }

  const active = categories.filter((category) => category.isActive);
  const parentIdsWithChildren = new Set(
    active
      .filter((category) => category.parentCategory)
      .map((category) => category.parentCategory!.id),
  );
  const sectionOrder: string[] = [];
  const sectionsByParentId = new Map<string, CategorySection>();

  for (const category of active) {
    const parent = category.parentCategory;
    if (!parent) continue;

    let section = sectionsByParentId.get(parent.id);
    if (!section) {
      section = { title: parent.name, items: [] };
      sectionsByParentId.set(parent.id, section);
      sectionOrder.push(parent.id);
    }

    section.items.push({
      id: category.id,
      name: category.name,
      icon: category.icon,
      showChevron: parentIdsWithChildren.has(category.id),
    });
  }

  return sectionOrder
    .map((parentId) => sectionsByParentId.get(parentId))
    .filter((section): section is CategorySection => Boolean(section?.items.length));
}

interface MoreCategoriesDrawerProps {
  visible: boolean;
  onClose: () => void;
}

export function MoreCategoriesDrawer({ visible, onClose }: MoreCategoriesDrawerProps) {
  const insets = useSafeAreaInsets();
  const { data: categories = [], isLoading, isError } = useCategories();
  const sections = useMemo(() => buildCategorySections(categories), [categories]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        <View
          className="flex-row items-center border-b border-neutral-200 bg-white px-4 py-3"
          style={{ paddingTop: insets.top + 12, paddingBottom: 12 }}
        >
          <Pressable onPress={onClose} className="flex-row items-center gap-1 pr-4" hitSlop={12}>
            <AltArrowLeft width={24} height={24} fill={iconColor} />
            <Text className="text-base text-neutral-900">Back</Text>
          </Pressable>
          <Text className="text-lg font-semibold text-neutral-900 flex-1 text-center">
            More Categories
          </Text>
          <View style={{ width: 80 }} />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32, backgroundColor: '#f4f4f5' }}
          style={{ backgroundColor: '#f4f4f5' }}
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <View className="items-center justify-center py-16">
              <ActivityIndicator size="large" color={iconColor} />
            </View>
          ) : isError ? (
            <View className="px-4 pt-6">
              <Text className="text-center text-base text-neutral-600">
                Could not load categories. Please try again.
              </Text>
            </View>
          ) : sections.length === 0 ? (
            <View className="px-4 pt-6">
              <Text className="text-center text-base text-neutral-600">
                No categories available.
              </Text>
            </View>
          ) : (
            sections.map((section) => (
              <View key={section.title} className="px-4 pt-6">
                <Text className="text-sm font-semibold text-neutral-700 mb-3">{section.title}</Text>
                <View className="rounded-xl overflow-hidden bg-white border border-neutral-200">
                  {section.items.map((item, index) => (
                    <Pressable
                      key={item.id}
                      className="flex-row items-center px-4 py-3 border-b border-neutral-100 last:border-b-0"
                      style={
                        index === section.items.length - 1 ? { borderBottomWidth: 0 } : undefined
                      }
                    >
                      <View className="w-10 items-center justify-center">
                        <RegistryIcon icon={item.icon} color={iconColor} />
                      </View>
                      <Text className="flex-1 text-base text-neutral-900">{item.name}</Text>
                      {item.showChevron ? (
                        <ChevronRight width={20} height={20} stroke={iconColor} />
                      ) : null}
                    </Pressable>
                  ))}
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}
