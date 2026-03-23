import { Ionicons } from '@expo/vector-icons';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { useState } from 'react';
import { Platform, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import FlagIcon from '@/assets/icons/flag.svg';
import NotebookIcon from '@/assets/icons/notebook.svg';
import ProfileIcon from '@/assets/icons/profile.svg';
import { WEB_HEADER_HEIGHT, WebTopBannerMenuTabBar } from '@/src/components/navigation/header';

const primary600 = '#23537c';
const neutral600 = '#52525b';

function TabIcon({
  Icon,
  color,
  size = 24,
}: {
  Icon: React.ComponentType<{ width?: number; height?: number; fill?: string; stroke?: string }>;
  color: string;
  size?: number;
}) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Icon width={size} height={size} fill={color} stroke={color} />
    </View>
  );
}

export default function AppLayout() {
  const activeColor = useCSSVariable('--color-primary-600') ?? primary600;
  const inactiveColor = useCSSVariable('--color-neutral-600') ?? neutral600;
  const isWeb = Platform.OS === 'web' || typeof document !== 'undefined';
  const [webMenuOpen, setWebMenuOpen] = useState(false);

  return (
    <Tabs
      initialRouteName="index"
      tabBar={(props) =>
        isWeb ? (
          <WebTopBannerMenuTabBar
            {...props}
            open={webMenuOpen}
            onOpenChange={setWebMenuOpen}
          />
        ) : (
          <BottomTabBar {...props} />
        )
      }
      screenOptions={{
        headerShown: false,
        sceneStyle:
          isWeb
            ? ({
                paddingTop: WEB_HEADER_HEIGHT,
                marginRight: webMenuOpen ? 320 : 0,
                transitionProperty: 'margin-right',
                transitionDuration: '220ms',
                transitionTimingFunction: 'ease',
              } as any)
            : undefined,
        tabBarActiveTintColor: typeof activeColor === 'string' ? activeColor : primary600,
        tabBarInactiveTintColor: typeof inactiveColor === 'string' ? inactiveColor : neutral600,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
        tabBarStyle: isWeb
          ? { display: 'none' }
          : {
              backgroundColor: '#ffffff',
              borderTopWidth: 1,
              borderTopColor: '#e4e4e7',
              shadowColor: '#18181b',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.06,
              shadowRadius: 4,
              elevation: 8,
            },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen name="feed" options={{ href: null }} />
      <Tabs.Screen name="search" options={{ href: null }} />
      <Tabs.Screen name="businesses" options={{ href: null }} />
      <Tabs.Screen name="businesses/[id]" options={{ href: null }} />
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects',
          tabBarIcon: ({ color }) => <TabIcon Icon={NotebookIcon} color={color} />,
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: 'Collections',
          tabBarIcon: ({ color }) => <TabIcon Icon={FlagIcon} color={color} />,
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: 'Me',
          tabBarIcon: ({ color }) => <TabIcon Icon={ProfileIcon} color={color} />,
        }}
      />
    </Tabs>
  );
}
