import { cn } from 'heroui-native';
import { Platform, ScrollView, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';

import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { navigateToHome } from '@/src/utils/navigation';

import { Button } from '../ui/button';
import { ContentLayout } from './content';

interface AuthLayoutProps {
  children: React.ReactNode;
  showBackToHome?: boolean;
}

export function AuthLayout({ children, showBackToHome = false }: AuthLayoutProps) {
  const insets = useSafeAreaInsets();
  const primaryColor = String(useCSSVariable('--color-primary-600'));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-neutral-50"
      role="main"
      aria-label="Authentication Page"
    >
      <ScrollView
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-grow-1 web:min-h-screen"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        bounces={false}
        contentInsetAdjustmentBehavior="never"
        accessible={false}
      >
        <View className="flex-1 px-5" style={{ paddingTop: insets.top + 12 }}>
          {showBackToHome ? (
            <ContentLayout className="items-start px-0 pb-4">
              <Button
                onPress={navigateToHome}
                variant="ghost"
                className="self-start px-0"
                size="md"
                accessibilityRole="button"
                accessibilityLabel="Back to events"
                accessibilityHint="Return to the events list"
              >
                <ArrowLeft fill={primaryColor} accessible={false} />
                <Button.Label className="no-underline text-primary-600">
                  Back to events
                </Button.Label>
              </Button>
            </ContentLayout>
          ) : null}

          <View
            className={cn(
              'mx-auto w-full max-w-[500px] items-stretch rounded-xl border border-neutral-200 bg-white px-6 py-10 shadow-sm md:px-9 md:py-12',
            )}
          >
            {children}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
