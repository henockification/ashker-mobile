import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

import { Text } from '@/src/components/ui/text';
import type { Tenant } from '@/src/types/tenant-events';
import { getHeaderGradientColors } from '@/src/utils/theme-palette';

type TenantLandingHeaderProps = {
  tenant: Tenant | null;
  companyName: string;
  accentColor?: string | null;
  paddingTop: number;
  eventCount: number;
};

export function TenantLandingHeader({
  tenant,
  companyName,
  accentColor,
  paddingTop,
  eventCount,
}: TenantLandingHeaderProps) {
  const [gradientStart, gradientEnd] = getHeaderGradientColors(accentColor);
  const eventLabel =
    eventCount === 1 ? '1 active event' : `${eventCount} active events`;

  return (
    <View className="overflow-hidden">
      <LinearGradient
        colors={[gradientStart, gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop, paddingHorizontal: 20, paddingBottom: 24 }}
      >
        <View className="flex-row items-center gap-4">
          <View
            className="items-center justify-center overflow-hidden rounded-2xl bg-white"
            style={{
              width: 76,
              height: 76,
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
            }}
          >
            {tenant?.profilePhotoUrl ? (
              <Image
                source={{ uri: tenant.profilePhotoUrl }}
                style={{ width: 68, height: 68 }}
                contentFit="contain"
              />
            ) : (
              <Text className="text-2xl font-bold text-neutral-400">
                {companyName.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>

          <View className="min-w-0 flex-1">
            <Text className="text-[22px] font-bold leading-7 text-white" numberOfLines={2}>
              {companyName}
            </Text>
            <View className="mt-2 self-start rounded-full bg-white/20 px-2.5 py-1">
              <Text className="text-xs font-semibold text-white">{eventLabel}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View className="h-4 rounded-t-[20px] bg-white" style={{ marginTop: -1 }} />
    </View>
  );
}
