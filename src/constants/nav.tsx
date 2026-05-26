import ShieldUser from '@/assets/icons/shield-user.svg';

interface NavIconProps {
  color: string;
}

export const navItems = [
  {
    name: 'index',
    label: 'Home',
    icon: ({ color }: NavIconProps) => <ShieldUser stroke={color} width={20} height={20} />,
  },
];
