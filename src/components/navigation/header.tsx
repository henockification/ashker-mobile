import { router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';

import ArrowLeft from '@/assets/icons/arrow-left.svg';
import Hamburger from '@/assets/icons/hamburger.svg';
import { defaultHederHeight } from '@/src/constants/ui';

import { routes } from '../../constants/routes';
import { ContentLayout } from '@/src/components/layouts/content';
import { Button } from '../ui/button';
import { Text } from '../ui/text';

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
                  <Button.Label className="text-white no-underline text-lg">
                    Back
                  </Button.Label>
                </Button>
              </View>

              {Platform.OS !== 'web' && (
                <View className="flex-2 items-center justify-center">
                  {typeof title === 'string' ? (
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      className="text-white font-semibold"
                    >
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
                    <Button
                      className="p-3"
                      variant="ghost"
                      size="md"
                      isIconOnly
                      onPress={() => {}}
                    >
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
