import { useCallback } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AltArrowLeft from '@/assets/icons/alt-arrow-left.svg';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import ChefHat from '@/assets/icons/chef-hat.svg';
import Checklist from '@/assets/icons/checklist.svg';
import Tuning from '@/assets/icons/tuning.svg';
import WineGlass from '@/assets/icons/wine-glass.svg';

import { Text } from '@/src/components/ui/text';

export type CategoryItem = { id: string; name: string; showChevron?: boolean };

export type CategorySection = { title: string; items: CategoryItem[] };

const SECTION_ICON_MAP: Record<string, React.ComponentType<{ width?: number; height?: number; stroke?: string; fill?: string }>> = {
  default: Checklist,
  Restaurants: ChefHat,
  'Coffee & Tea': WineGlass,
  Bars: WineGlass,
  Desserts: ChefHat,
  Accountants: Checklist,
  Handyman: Tuning,
  Electricians: Tuning,
  'Hair Salons': Checklist,
  Massage: Checklist,
  'Day Spas': Checklist,
  'Car Wash': Tuning,
  'Auto Repair': Tuning,
  'Gas Stations': Tuning,
};

const MORE_SECTIONS: CategorySection[] = [
  {
    title: 'Popular',
    items: [
      { id: 'accountants', name: 'Accountants' },
      { id: 'handyman', name: 'Handyman' },
      { id: 'electricians', name: 'Electricians' },
    ],
  },
  {
    title: 'Snacks & Drinks',
    items: [
      { id: 'coffee-tea', name: 'Coffee & Tea' },
      { id: 'bars', name: 'Bars' },
      { id: 'desserts', name: 'Desserts' },
    ],
  },
  {
    title: 'Spas & Salons',
    items: [
      { id: 'hair-salons', name: 'Hair Salons' },
      { id: 'massage', name: 'Massage' },
      { id: 'day-spas', name: 'Day Spas' },
    ],
  },
  {
    title: 'Auto Services',
    items: [
      { id: 'car-wash', name: 'Car Wash' },
      { id: 'auto-repair', name: 'Auto Repair' },
      { id: 'gas-stations', name: 'Gas Stations' },
    ],
  },
  {
    title: 'All Categories',
    items: [{ id: 'restaurants', name: 'Restaurants', showChevron: true }],
  },
];

const iconColor = '#18181b';

interface MoreCategoriesDrawerProps {
  visible: boolean;
  onClose: () => void;
}

export function MoreCategoriesDrawer({ visible, onClose }: MoreCategoriesDrawerProps) {
  const insets = useSafeAreaInsets();

  const SectionIcon = useCallback(({ name }: { name: string }) => {
    const Icon = SECTION_ICON_MAP[name] ?? SECTION_ICON_MAP.default;
    return <Icon width={24} height={24} stroke={iconColor} fill={iconColor} />;
  }, []);

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
          <Pressable
            onPress={onClose}
            className="flex-row items-center gap-1 pr-4"
            hitSlop={12}
          >
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
          {MORE_SECTIONS.map((section) => (
            <View key={section.title} className="px-4 pt-6">
              <Text className="text-sm font-semibold text-neutral-700 mb-3">
                {section.title}
              </Text>
              <View className="rounded-xl overflow-hidden bg-white border border-neutral-200">
                {section.items.map((item, index) => (
                  <Pressable
                    key={item.id}
                    className="flex-row items-center px-4 py-3 border-b border-neutral-100 last:border-b-0"
                    style={index === section.items.length - 1 ? { borderBottomWidth: 0 } : undefined}
                  >
                    <View className="w-10 items-center justify-center">
                      <SectionIcon name={item.name} />
                    </View>
                    <Text className="flex-1 text-base text-neutral-900">{item.name}</Text>
                    {item.showChevron && (
                      <ChevronRight width={20} height={20} stroke={iconColor} />
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}
