import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function FaqScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'FAQ' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-lg">Frequently Asked Questions</Text>
      </View>
    </>
  );
}
