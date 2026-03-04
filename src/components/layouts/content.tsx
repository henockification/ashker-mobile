import { cn } from 'heroui-native';
import { View, type ViewStyle } from 'react-native';

interface ContentLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  className?: string;
  size?: 'wide' | 'narrow';
}

export const ContentLayout = ({
  children,
  size = 'wide',
  style,
  className = '',
}: ContentLayoutProps) => {
  const sizes = {
    narrow: 'md:max-w-[400px] lg:max-w-[500px] px-6 md:px-0',
    wide: 'max-w-[1180px] px-5',
  };

  return (
    <View
      className={cn(
        `
          mx-auto
          ${sizes[size]}
          w-full
        `,
        className,
      )}
      style={style}
    >
      {children}
    </View>
  );
};
