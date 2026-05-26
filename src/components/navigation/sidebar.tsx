import { type DrawerContentComponentProps, useDrawerStatus } from '@react-navigation/drawer';
import { router, usePathname } from 'expo-router';
import { cn } from 'heroui-native';
import React, { useEffect, useMemo, useRef } from 'react';
import { PanResponder, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';

import Close from '@/assets/icons/close.svg';
import { routes } from '@/src/constants/routes';
import { useUserContext } from '@/src/contexts/user';
import { getAppVersionString } from '@/src/utils';
import { webActionProps } from '@/src/utils/accessibility';

import { sidebarExtraItems, sidebarNavItems } from '../../constants/sidebar';
import { useSession } from '../../contexts/auth';
import { Button } from '../ui/button';
import { Text } from '../ui/text';

const SWIPE_TO_CLOSE_DISTANCE = 50;
const SWIPE_TO_CLOSE_START = 12;

export const Sidebar = ({ ...props }: DrawerContentComponentProps) => {
  const pathname = usePathname();
  const { isAuthenticated, signOut } = useSession();
  const { user } = useUserContext();
  const insets = useSafeAreaInsets();
  const sidebarRef = useRef(null);

  const iconColor = String(useCSSVariable('--color-white'));

  const isOpen = useDrawerStatus() === 'open';

  const swipeToCloseResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (_, gestureState) =>
          isOpen &&
          gestureState.dx > SWIPE_TO_CLOSE_START &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onPanResponderRelease: (_, gestureState) => {
          if (
            gestureState.dx > SWIPE_TO_CLOSE_DISTANCE &&
            Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
          ) {
            props.navigation.closeDrawer();
          }
        },
      }),
    [isOpen, props.navigation],
  );

  return (
    <View
      className="flex-1 bg-primary-800 py-7 gap-4"
      style={{
        paddingTop: insets.top,
      }}
      pointerEvents={isOpen ? 'auto' : 'none'}
      importantForAccessibility={isOpen ? 'auto' : 'no-hide-descendants'}
      accessibilityElementsHidden={!isOpen}
      accessibilityLabel="Sidebar menu"
      tabIndex={isOpen ? 0 : -1}
      ref={sidebarRef}
      {...swipeToCloseResponder.panHandlers}
    >
      <View className="flex-row justify-end items-center">
        <Button
          variant="ghost"
          isIconOnly
          onPress={() => props.navigation.closeDrawer()}
          size="md"
          role="button"
          accessibilityLabel="Close menu"
          tabIndex={isOpen ? 0 : -1}
        >
          <Close fill={iconColor} accessible={false} />
        </Button>
      </View>
      <View className="flex-1 px-5">
        <ScrollView
          contentContainerClassName="gap-7"
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
        >
          {user ? (
            <Text className="text-xl font-semibold text-white" role="heading" aria-level={2}>
              {user.name}
            </Text>
          ) : null}
          <View className="items-start gap-5" role="list">
            {sidebarNavItems.map((item) => {
              const isActive = pathname === `/${item.name}`;
              const route = `/${item.name}`;

              return (
                <View role="listitem" key={`${item.name}-${item.label}`}>
                  <Pressable
                    onPress={() => {
                      router.push(route);
                      props.navigation.closeDrawer();
                    }}
                    className={cn(
                      'rounded-sm gap-2 px-3 py-2 flex-row items-center',
                      isActive ? 'bg-primary-600' : 'bg-transparent',
                    )}
                    role="link"
                    accessibilityState={{ selected: isActive }}
                    accessibilityLabel={`${item.label}${isActive ? `, current page` : ''}`}
                    tabIndex={isOpen ? 0 : -1}
                    {...webActionProps(() => {
                      router.push(route);
                      props.navigation.closeDrawer();
                    })}
                  >
                    <View accessible={false}>
                      {item.icon({
                        color: iconColor,
                      })}
                    </View>
                    <Text className="text-md text-white font-semibold">{item.label}</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>

          <View className="border-b-1 border-white w-full" accessible={false} />

          <View className="items-start gap-5" role="list">
            {sidebarExtraItems.map((item) => {
              const isActive = pathname === `/${item.name}`;
              const route = `/${item.name}`;

              return (
                <View role="listitem" key={`${item.name}-${item.label}`}>
                  <Pressable
                    onPress={() => {
                      router.push(route);
                      props.navigation.closeDrawer();
                    }}
                    className={cn(
                      'rounded-sm gap-2 px-3 py-2 flex-row items-center',
                      isActive ? 'bg-primary-600' : 'bg-transparent',
                    )}
                    role="link"
                    accessibilityState={{ selected: isActive }}
                    accessibilityLabel={`${item.label}${isActive ? `, current page` : ''}`}
                    tabIndex={isOpen ? 0 : -1}
                    {...webActionProps(() => {
                      router.push(route);
                      props.navigation.closeDrawer();
                    })}
                  >
                    <View accessible={false}>
                      {item.icon({
                        color: iconColor,
                      })}
                    </View>
                    <Text className="text-md text-white font-semibold">{item.label}</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
          <View className="gap-7 flex items-start">
            {isAuthenticated ? (
              <Button
                onPress={() => {
                  signOut();
                }}
                variant="tertiary"
                className="border-white"
                size="md"
                role="button"
                accessibilityLabel="Sign out"
                tabIndex={isOpen ? 0 : -1}
              >
                <Button.Label className="text-white">Sign out</Button.Label>
              </Button>
            ) : (
              <Button
                onPress={() => {
                  router.push(routes.auth.signIn());
                  props.navigation.closeDrawer();
                }}
                variant="tertiary"
                className="border-white"
                size="md"
                role="button"
                accessibilityLabel="Sign in"
                tabIndex={isOpen ? 0 : -1}
              >
                <Button.Label className="text-white">Sign in</Button.Label>
              </Button>
            )}
            <Text className="text-center text-white text-xs">
              © {new Date().getFullYear()} Ein1. {getAppVersionString()}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
