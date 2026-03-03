import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function AppIndexScreen() {
  return (
    <View className="flex-1 items-center justify-center p-5">
      <Text className="text-2xl font-bold">App Home</Text>
      <Link href="/faq" className="mt-4">
        <Text className="text-blue-600">FAQ</Text>
      </Link>
      <Link href="/contact-support" className="mt-2">
        <Text className="text-blue-600">Contact Support</Text>
      </Link>
    </View>
  );
}
