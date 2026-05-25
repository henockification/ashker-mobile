import Help from '@/assets/icons/help.svg';
import Notification from '@/assets/icons/notification.svg';
import Support from '@/assets/icons/support.svg';
import { navItems } from './nav';
import { ROUTES } from './routes';

interface SidebarIconProps {
  color: string;
}

export const sidebarNavItems = [
  ...navItems.filter((item) => item.name !== ROUTES.me),
  {
    name: ROUTES.me,
    label: 'Messages',
    icon: ({ color }: SidebarIconProps) => <Notification stroke={color} width={20} height={20} />,
  },
];

export const sidebarExtraItems = [
  {
    name: ROUTES.faq,
    label: 'faq',
    icon: ({ color }: SidebarIconProps) => <Help stroke={color} width={20} height={20} />,
  },
  {
    name: ROUTES.contactSupport,
    label: 'contact_support',
    icon: ({ color }: SidebarIconProps) => <Support stroke={color} width={20} height={20} />,
  },
];