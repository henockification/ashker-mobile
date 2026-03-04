import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Minimal auth layout: full-screen black/white container that renders children.
 * Use for sign-in, sign-up, etc.
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }} role="main">
      <StatusBar style="dark" />
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 }}>
        {children}
      </View>
    </View>
  );
}
