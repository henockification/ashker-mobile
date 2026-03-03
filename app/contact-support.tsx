import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function ContactSupportScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Contact Support' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-lg">Contact Support</Text>
      </View>
    </>
  );
}
