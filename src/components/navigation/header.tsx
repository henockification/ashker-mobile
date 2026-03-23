import { Ionicons } from '@expo/vector-icons';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';

import ArrowLeft from '@/assets/icons/arrow-left.svg';
import Hamburger from '@/assets/icons/hamburger.svg';
import { ContentLayout } from '@/src/components/layouts/content';
import { defaultHederHeight } from '@/src/constants/ui';

import { Button } from '../ui/button';
import { Text } from '../ui/text';

export const WEB_HEADER_HEIGHT = 65;
const WEB_MENU_ROUTES = ['index', 'projects', 'collections', 'me'] as const;

interface HeaderProps {
  showBackButton?: boolean;
  title?: string | ((props: { children: string; tintColor?: string }) => React.ReactNode);
}

export const Header = ({ showBackButton = false, title = '' }: HeaderProps) => {
  const insets = useSafeAreaInsets();

  const iconColor = String(useCSSVariable('--color-white'));

  return (
    <>
      <View className="bg-primary-800 border-b border-b-primary-700">
        <ContentLayout
          className="items-center flex-row w-full"
          style={{
            height: defaultHederHeight + insets.top,
            paddingTop: insets.top,
          }}
        >
          <>
            <View className="flex-1 items-start">
              <Button onPress={() => router.back()} variant="ghost" size="md">
                <ArrowLeft stroke={iconColor} width={20} height={20} />
                <Button.Label className="text-white no-underline text-lg">Back</Button.Label>
              </Button>
            </View>

            {Platform.OS !== 'web' && (
              <View className="flex-2 items-center justify-center">
                {typeof title === 'string' ? (
                  <Text numberOfLines={1} ellipsizeMode="tail" className="text-white font-semibold">
                    {title}
                  </Text>
                ) : null}
              </View>
            )}

            <View className="flex-1 items-end">
              <View className="web:gap-3 flex-row items-center">
                {Platform.OS === 'web' ? (
                  <Pressable
                    className="rounded-full bg-opacity-40 w-7 h-7 align-center justify-center"
                    style={{ backgroundColor: 'rgba(250, 250, 250, 0.40)' }}
                    hitSlop={10}
                    onPress={() => {}}
                  >
                    <Text className="text-white text-sm">?</Text>
                  </Pressable>
                ) : (
                  <Button className="p-3" variant="ghost" size="md" isIconOnly onPress={() => {}}>
                    <Hamburger stroke={iconColor} />
                  </Button>
                )}
              </View>
            </View>
          </>
        </ContentLayout>
      </View>
    </>
  );
};

type WebTopBannerMenuTabBarProps = Parameters<typeof BottomTabBar>[0];
interface WebTopBannerMenuProps extends WebTopBannerMenuTabBarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WebTopBannerMenuTabBar({
  state,
  navigation,
  open,
  onOpenChange,
}: WebTopBannerMenuProps) {
  const neutral400 = String(useCSSVariable('--color-neutral-400') ?? '#a1a1aa');
  const neutral100 = String(useCSSVariable('--color-neutral-100') ?? '#f4f4f5');
  const neutral200 = String(useCSSVariable('--color-neutral-200') ?? '#e4e4e7');
  const white = String(useCSSVariable('--color-white') ?? '#ffffff');
  const menuRoutes = state.routes.filter((route) =>
    WEB_MENU_ROUTES.includes(route.name as (typeof WEB_MENU_ROUTES)[number]),
  );
  const activeRoute = state.routes[state.index]?.name;
  const userInitials = 'sh';
  const labelMap: Record<string, string> = {
    index: 'Home',
    projects: 'Projects',
    collections: 'Collections',
    me: 'Me',
  };
  const iconMap: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
    index: 'home-outline',
    projects: 'briefcase-outline',
    collections: 'albums-outline',
    me: 'person-circle-outline',
  };

  return (
    <View
      pointerEvents="box-none"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: WEB_HEADER_HEIGHT,
          backgroundColor: '#163550',
          borderBottomWidth: 1,
          borderBottomColor: '#224f77',
          justifyContent: 'center',
          zIndex: 20,
        }}
      >
        <ContentLayout
          className="w-full flex-row items-center justify-end"
          style={{ height: WEB_HEADER_HEIGHT }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open app menu"
            onPress={() => onOpenChange(!open)}
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: neutral400,
            }}
          >
            <Text className="text-xl font-semibold text-primary-800">{userInitials}</Text>
          </Pressable>
        </ContentLayout>
      </View>

      {open ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss app menu"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(24,24,27,0.35)',
            zIndex: 15,
          }}
          onPress={() => onOpenChange(false)}
        />
      ) : null}

      <View
        className="absolute inset-y-0 right-0 w-80 border-l border-l-primary-700 bg-primary-800 px-4 pt-3.5"
        style={
          {
            boxShadow: '-12px 0 30px -12px rgba(0,0,0,0.25)',
            zIndex: 30,
            transform: [{ translateX: open ? 0 : 320 }],
            transitionProperty: 'transform',
            transitionDuration: '220ms',
            transitionTimingFunction: 'ease',
          } as any
        }
        pointerEvents={open ? 'auto' : 'none'}
      >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close app menu"
            onPress={() => onOpenChange(false)}
            className="absolute right-4 top-4"
          >
            <Ionicons name="close" size={26} color={neutral100} />
          </Pressable>

          <Text className="mb-10 mt-10 px-3 text-2xl font-bold text-white">Henock Melisse</Text>

          {menuRoutes.map((route) => {
            const active = route.name === activeRoute;
            const label = labelMap[route.name] ?? route.name;
            const icon = iconMap[route.name] ?? 'ellipse-outline';

            return (
              <Pressable
                key={route.key}
                onPress={() => {
                  navigation.navigate(route.name as never);
                  onOpenChange(false);
                }}
                className="mb-5 flex-row items-center rounded-xl px-3 py-2"
                style={{ backgroundColor: active ? 'rgba(255,255,255,0.09)' : 'transparent' }}
              >
                <Ionicons name={icon} size={22} color={active ? white : neutral200} />
                <Text
                  className={`ml-4 text-lg ${active ? 'font-bold text-white' : 'text-neutral-100'}`}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
      </View>
    </View>
  );
}
