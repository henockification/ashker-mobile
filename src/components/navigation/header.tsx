import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation, usePathname } from 'expo-router';
import React from 'react';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import LogoTitle from '@/assets/images/logo.svg';
import { ContentLayout } from '@/src/components/layouts/content';
import { defaultHederHeight } from '@/src/constants/ui';
import Hamburger from '@/assets/icons/hamburger.svg';
import { routes } from '@/src/constants/routes';
import { useSession } from '@/src/contexts/auth';
import { webActionProps } from '@/src/utils/accessibility';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { Nav } from './nav';

const HEADER_LOGO_HEIGHT = 28;
const HEADER_LOGO_WIDTH = 106;

function HeaderMeActions({ iconColor }: { iconColor: string }) {
  return (
    <View className="flex-row items-center gap-1">
      <Button
        variant="ghost"
        size="md"
        isIconOnly
        className="p-2"
        accessibilityLabel="Notifications"
      >
        <Ionicons name="notifications-off-outline" size={22} color={iconColor} accessible={false} />
      </Button>
      <Button variant="ghost" size="md" isIconOnly className="p-2" accessibilityLabel="Share profile">
        <Ionicons name="share-outline" size={22} color={iconColor} accessible={false} />
      </Button>
      <Button variant="ghost" size="md" isIconOnly className="p-2" accessibilityLabel="Profile QR code">
        <Ionicons name="qr-code-outline" size={22} color={iconColor} accessible={false} />
      </Button>
    </View>
  );
}

function HeaderLogo() {
  return (
    <View
      style={{
        height: HEADER_LOGO_HEIGHT,
        width: HEADER_LOGO_WIDTH,
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <LogoTitle
        accessible={false}
        width={HEADER_LOGO_WIDTH}
        height={HEADER_LOGO_HEIGHT}
        preserveAspectRatio="xMidYMid meet"
      />
    </View>
  );
}

interface HeaderProps {
  showBackButton?: boolean;
  showNav?: boolean;
  title?: string | ((props: { children: string; tintColor?: string }) => React.ReactNode);
}

export const Header = ({ showBackButton = false, showNav = true, title = '' }: HeaderProps) => {
  const pathname = usePathname();
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const { isAuthenticated, isLoading } = useSession();
  const iconColor = String(useCSSVariable('--color-white'));

  const showMeActions =
    !isLoading && isAuthenticated && (pathname === routes.app.me() || pathname.endsWith('/me'));

  const goBack = () => router.back();
  const goToHome = () => router.push(routes.app.home());
  const openDrawer = () => {
    nav.dispatch(DrawerActions.openDrawer());
  };

  return (
    <>
      <View className="bg-primary-800 border-b-1 border-b-primary-700" role="toolbar">
        <ContentLayout
          className="items-center flex-row w-full"
          style={{
            height: defaultHederHeight + insets.top,
            paddingTop: insets.top,
          }}
        >
          <View className="flex-1 items-start">
            {showBackButton ? (
              <Button
                onPress={goBack}
                variant="ghost"
                size="md"
                role="link"
                accessibilityLabel="Go back"
              >
                <ArrowLeft stroke={iconColor} width={20} height={20} accessible={false} />
                <Button.Label className="text-white no-underline text-lg">Back</Button.Label>
              </Button>
            ) : (
              <Pressable
                onPress={goToHome}
                role="button"
                accessibilityLabel="Go to home"
                className="outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
                {...webActionProps(goToHome)}
              >
                <HeaderLogo />
              </Pressable>
            )}
          </View>

          {Platform.OS !== 'web' && typeof title === 'string' && title.length > 0 ? (
            <View className="flex-2 items-center justify-center px-2">
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-white font-semibold"
                role="heading"
                aria-level={1}
              >
                {title}
              </Text>
            </View>
          ) : null}

          <View className="flex-1 items-end">
            <View className="flex-row items-center">
              {showMeActions ? <HeaderMeActions iconColor={iconColor} /> : null}
              <Button
                className="p-3"
                variant="ghost"
                size="md"
                isIconOnly
                onPress={openDrawer}
                role="button"
                accessibilityLabel="Open navigation menu"
              >
                <Hamburger stroke={iconColor} accessible={false} />
              </Button>
            </View>
          </View>
        </ContentLayout>
      </View>
      {showNav ? <Nav /> : null}
    </>
  );
};