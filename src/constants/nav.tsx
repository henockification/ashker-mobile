import AcademicCap from '@/assets/icons/academic-cap.svg';
import Checklist from '@/assets/icons/checklist.svg';
import Progress from '@/assets/icons/progress.svg';
import Restart from '@/assets/icons/restart.svg';
import ShieldUser from '@/assets/icons/shield-user.svg';

import { ROUTES } from './routes';

interface NavIconProps {
  color: string;
}

export const navItems = [
  {
    name: ROUTES.search,
    label: 'Search',
    icon: ({ color }: NavIconProps) => <ShieldUser stroke={color} width={20} height={20} />,
  },
  {
    name: ROUTES.projects,
    label: 'Projects',
    icon: ({ color }: NavIconProps) => <Checklist stroke={color} width={20} height={20} />,
  },
  {
    name: ROUTES.collections,
    label: 'Collections',
    icon: ({ color }: NavIconProps) => <Progress stroke={color} width={20} height={20} />,
  },
  {
    name: ROUTES.me,
    label: 'Me',
    icon: ({ color }: NavIconProps) => <Restart stroke={color} width={20} height={20} />,
  },
];