import { router, usePathname } from 'expo-router';
import { cn } from 'heroui-native';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { navItems } from '../../constants/nav';
import { useSession } from '../../contexts/auth';
import { ContentLayout } from '../layouts/content';
import { Text } from '../ui/text';

export const Nav = () => {
  const pathname = usePathname();
  const { isAuthorized } = useSession();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const iconColor = String(useCSSVariable('--color-neutral-700'));
  const activeColor = String(useCSSVariable('--color-primary-600'));

  if (Platform.OS !== 'web') return null;

  return (
    <View
      className="bg-neutral-50 border-b-1 border-b-neutral-200"
      role="navigation"
      accessibilityLabel="Sub navigation"
    >
      <ContentLayout className="items-center flex-row px-0">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="items-center gap-5 px-5"
          role="list"
        >
          {navItems.map((item: any, index: number) => {
            const route = `/${item.name}`;
            const isActive = pathname === `/${item.name}`;
            const isHovered = hoveredIndex === index;

            return (
              <View key={item.name} role="listitem">
                <Pressable
                  key={item.name}
                  onPress={() => router.push(route)}
                  {...Platform.select({
                    web: {
                      onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          router.push(route);
                        }
                      },
                      onHoverIn: () => setHoveredIndex(index),
                      onHoverOut: () => setHoveredIndex(null),
                    },
                  })}
                  className={cn(
                    'py-1 flex-row items-center gap-2 border-b-2',
                    isActive || isHovered
                      ? 'border-primary-500'
                      : 'border-transparent hover:border-primary-500',
                  )}
                  role="link"
                  accessibilityState={{ selected: isActive }}
                  accessibilityLabel={`${item.label}${isActive ? `, Current page` : ''}`}
                >
                  <View accessible={false}>
                    {item.icon({
                      color: isActive || isHovered ? activeColor : iconColor,
                    })}
                  </View>
                  <Text
                    className={cn(
                      'text-base py-2',
                      isActive || isHovered
                        ? 'text-primary-600'
                        : 'text-neutral-700 hover:text-primary-600',
                    )}
                    accessible={false}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      </ContentLayout>
    </View>
  );
};