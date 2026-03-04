import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Minimal auth layout: full-screen black/white container that renders children.
 * Use for sign-in, sign-up, etc.
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <View
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      className={Platform.OS === 'web' ? 'web:min-h-screen' : undefined}
      role="main"
    >
      <StatusBar style="dark" />
      <View
        style={[
          { flex: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
          Platform.OS === 'web' && { maxWidth: 1140, width: '100%', alignSelf: 'center' },
        ]}
      >
        {children}
      </View>
    </View>
  );
}
