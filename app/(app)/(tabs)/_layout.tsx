import { Ionicons } from '@expo/vector-icons';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import FlagIcon from '@/assets/icons/flag.svg';
import NotebookIcon from '@/assets/icons/notebook.svg';
import ProfileIcon from '@/assets/icons/mask.svg';
import { Header } from '@/src/components/navigation/header';

const primary600 = '#c62828';
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

export default function TabsLayout() {
  const activeColor = useCSSVariable('--color-primary-600') ?? primary600;
  const inactiveColor = useCSSVariable('--color-neutral-600') ?? neutral600;
  const isWeb = Platform.OS === 'web' || typeof document !== 'undefined';

  return (
    <Tabs
      initialRouteName="search"
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        header: () => <Header />,
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
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={focused ? 'search' : 'search-outline'} size={22} color={color} />
            </View>
          ),
        }}
      />
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
      <Tabs.Screen
        name="businesses"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
