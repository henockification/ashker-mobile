import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import SearchIcon from '@/assets/icons/search.svg';
import NotebookIcon from '@/assets/icons/notebook.svg';
import FlagIcon from '@/assets/icons/flag.svg';
import ProfileIcon from '@/assets/icons/profile.svg';

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

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: typeof activeColor === 'string' ? activeColor : primary600,
        tabBarInactiveTintColor: typeof inactiveColor === 'string' ? inactiveColor : neutral600,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
        tabBarStyle: {
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
          title: 'Search',
          tabBarIcon: ({ color }) => <TabIcon Icon={SearchIcon} color={color} />,
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
    </Tabs>
  );
}
