import { View } from 'react-native';

import { Text } from '@/src/components/ui/text';
import { useTenant } from '@/src/contexts/tenant';

type TenantAuthHeaderProps = {
  title: string;
  subtitle?: string;
};

export function TenantAuthHeader({ title, subtitle }: TenantAuthHeaderProps) {
  const { tenant } = useTenant();
  const companyName = tenant?.companyName ?? 'Ashker Hub';

  return (
    <View className="mb-8 items-center">
      <Text className="mb-1 text-center text-2xl font-semibold">{title}</Text>
      <Text className="text-center text-base text-neutral-600">{subtitle ?? companyName}</Text>
    </View>
  );
}
