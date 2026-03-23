import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

const iconDark = '#18181b';

export function ReviewsMenuIcon() {
  return (
    <View className="h-9 w-9 items-center justify-center rounded-lg border border-neutral-900">
      <Ionicons name="star-outline" size={18} color={iconDark} />
    </View>
  );
}

export function AddedBusinessesMenuIcon() {
  return (
    <View className="relative h-9 w-9 items-center justify-center">
      <Ionicons name="storefront-outline" size={26} color={iconDark} />
      <View className="absolute -bottom-0.5 -right-0.5 h-4 w-4 items-center justify-center rounded-full bg-white">
        <Ionicons name="add" size={12} color={iconDark} />
      </View>
    </View>
  );
}

export function YelpEliteMenuIcon() {
  return (
    <View className="h-9 w-9 items-center justify-center rounded-full border border-neutral-900">
      <Ionicons name="sparkles-outline" size={20} color={iconDark} />
    </View>
  );
}

export function TalkMenuIcon() {
  return (
    <View className="relative h-9 w-9 items-center justify-center">
      <Ionicons name="chatbubble-ellipses-outline" size={26} color={iconDark} />
      <View className="absolute" style={{ top: 5 }}>
        <Ionicons name="star" size={11} color={iconDark} />
      </View>
    </View>
  );
}

export function ReservationsMenuIcon() {
  return (
    <View className="relative h-9 w-9 items-center justify-center">
      <Ionicons name="calendar-outline" size={26} color={iconDark} />
      <View className="absolute -bottom-0 -right-0.5 rounded-full bg-white">
        <Ionicons name="checkmark-circle" size={14} color={iconDark} />
      </View>
    </View>
  );
}
