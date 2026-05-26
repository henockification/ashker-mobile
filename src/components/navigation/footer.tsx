import type { Href } from 'expo-router';
import { router } from 'expo-router';
import { cn } from 'heroui-native';
import { ReactElement } from 'react';
import { Linking, Platform, Pressable, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import Facebook from '@/assets/icons/facebook.svg';
import Instagram from '@/assets/icons/instagram.svg';

import { routes } from '../../constants/routes';
import { ContentLayout } from '../layouts/content';
import { Button } from '../ui/button';
import { Text } from '../ui/text';

function hrefToString(href: Href | string): string {
  return typeof href === 'string' ? href : href.pathname;
}

interface FooterLink {
  label?: string;
  icon?: (props: { color: string }) => ReactElement;
  href: string | Href;
}

interface FooterColumn {
  title: string;
  links?: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: 'sitemap',
    links: [{ label: 'tab_today', href: routes.auth.signIn() }],
  },
  {
    title: 'legal',
    links: [
      { label: 'terms_of_use', href: '/' },
      { label: 'privacy_policy', href: '/' },
      { label: 'cookie_policy', href: '/' },
      { label: 'nevada_privacy_rights', href: '/' },
      { label: 'consumer_policy', href: '/' },
    ],
  },
  {
    title: 'company',
    links: [
      { label: 'support', href: routes.home() },
      { label: 'contact_us', href: routes.home() },
    ],
  },
];

export const Footer = ({ visible = true }: { visible?: boolean }) => {
  const iconColor = String(useCSSVariable('--color-white'));

  const handleLinkPress = (href: string) => {
    if (Platform.OS === 'web') {
      window.location.href = href;
    } else {
      Linking.openURL(href);
    }
  };

  if (Platform.OS !== 'web' || !visible) {
    return null;
  }

  const ConnectColumn = () => {
    return (
      <>
        <View className="items-center md:items-start">
          <Text className="text-xl font-semibold text-neutral-100 mb-3">Connect</Text>
          <View className={cn('flex-row gap-2')}>
            <Pressable
              onPress={() => handleLinkPress('https://instagram.com/retainyourbrain')}
              role="link"
              accessibilityRole="link"
            >
              <View className="p-4">
                <Instagram stroke={iconColor} width={24} height={24} />
              </View>
            </Pressable>
            <Pressable
              onPress={() => handleLinkPress('https://www.facebook.com/retainyourbrain/')}
              role="link"
              accessibilityRole="link"
            >
              <View className="p-4">
                <Facebook stroke={iconColor} width={24} height={24} />
              </View>
            </Pressable>
          </View>
        </View>
      </>
    );
  };

  return (
    <View className="bg-primary-800 py-14">
      <ContentLayout>
        <Text className="text-sm text-neutral-100 text-center md:text-left pt-14">
          © {new Date().getFullYear()} Retain Health Inc.
        </Text>
      </ContentLayout>
    </View>
  );
};
