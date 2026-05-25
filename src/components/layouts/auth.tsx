import { StatusBar } from 'expo-status-bar';
import { cn, useThemeColor } from 'heroui-native';
import { routes } from '@/src/constants/routes';
import { Platform, ScrollView, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { RadialGradientBackground } from '../gradients/radial-gradient-background';
import { ContentLayout } from './content';
import { Button } from '../ui/button';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { router } from 'expo-router';
interface AuthLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  isModal?: boolean;
}

export function AuthLayout({ children, showBackButton = false }: AuthLayoutProps) {
  const accentColor = useThemeColor('accent');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      role="main"
      aria-label="Authentication Page"
    >
      <RadialGradientBackground variant="light">
        <ScrollView
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="flex-grow-1 web:min-h-screen web:justify-between"
          bounces={false}
          contentInsetAdjustmentBehavior="never"
          accessible={false}
        >
          <View className="px-5 py-10 flex-1">
            {showBackButton && (
              <ContentLayout className="items-start px-0 pb-8">
                <Button
                  onPress={() => {
                    router.push(routes.auth.signIn());
                  }}
                  variant="ghost"
                  className="self-start"
                  size="md"
                  accessibilityRole="button"
                  accessibilityLabel="Back to sign in"
                  accessibilityHint="Back to sign in"
                >
                  <ArrowLeft fill={accentColor} accessible={false} />
                  <Button.Label>Back to sign in</Button.Label>
                </Button>
              </ContentLayout>
            )}
            <View
              className={cn(
                'items-stretch xl:items-center w-full max-w-[500px] px-6 py-10 md:px-9 md:py-12 lg:px-12 lg:py-14 mx-auto rounded-xl bg-white shadow-md android:elevation-3',
              )}
            >
              {children}
            </View>
          </View>
        </ScrollView>
      </RadialGradientBackground>
    </KeyboardAvoidingView>
  );
}
