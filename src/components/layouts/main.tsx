import { Platform, View, ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { Footer } from '../navigation/footer';
import { ContentLayout } from './content';

interface MainLayoutProps {
  children: React.ReactNode;
  contentLayoutSize?: 'full' | 'wide' | 'narrow';
  footerShown?: boolean;
}

export const MainLayout = ({
  children,
  contentLayoutSize = 'wide',
  footerShown = true,
}: MainLayoutProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      role="main"
    >
      <View className="flex-1 bg-white">
        <ScrollView
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="flex-grow-1 web:min-h-screen justify-between"
          bounces={false}
          contentInsetAdjustmentBehavior="never"
        >
          {contentLayoutSize === 'full' ? (
            <View style={Platform.OS === 'web' ? { maxWidth: 1140, width: '100%', alignSelf: 'center' } : undefined}>
              {children}
            </View>
          ) : (
            <ContentLayout className="py-10 flex-1" size={contentLayoutSize}>
              {children}
            </ContentLayout>
          )}
          <Footer visible={footerShown} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
