/**
 * Maps API icon slugs (e.g. "car-wash") to bundled SVG components from assets/icons/{slug}.svg.
 * Regenerate after adding icons: `pnpm sync:icons`
 */
import AcademicCap from '@/assets/icons/academic-cap.svg';
import AddPlus from '@/assets/icons/add-plus.svg';
import AltArrowLeft from '@/assets/icons/alt-arrow-left.svg';
import AltArrowRight from '@/assets/icons/alt-arrow-right.svg';
import Apple from '@/assets/icons/apple.svg';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import ArrowLeftSmall from '@/assets/icons/arrow-left-small.svg';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import ArrowRightSmall from '@/assets/icons/arrow-right-small.svg';
import BiomarkerTesting from '@/assets/icons/biomarker-testing.svg';
import Book from '@/assets/icons/book.svg';
import Calendar from '@/assets/icons/calendar.svg';
import CalendarDate from '@/assets/icons/calendar-date.svg';
import CardArrow from '@/assets/icons/card-arrow.svg';
import Check from '@/assets/icons/check.svg';
import CheckSquare from '@/assets/icons/check-square.svg';
import Checklist from '@/assets/icons/checklist.svg';
import ChefHat from '@/assets/icons/chef-hat.svg';
import ChevronDown from '@/assets/icons/chevron-down.svg';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import ChevronUp from '@/assets/icons/chevron-up.svg';
import Close from '@/assets/icons/close.svg';
import CloseSquare from '@/assets/icons/close-square.svg';
import CourseUp from '@/assets/icons/course-up.svg';
import Email from '@/assets/icons/email.svg';
import Export from '@/assets/icons/export.svg';
import Eye from '@/assets/icons/eye.svg';
import Facebook from '@/assets/icons/facebook.svg';
import Filters from '@/assets/icons/filters.svg';
import Flag from '@/assets/icons/flag.svg';
import Google from '@/assets/icons/google.svg';
import Hamburger from '@/assets/icons/hamburger.svg';
import Help from '@/assets/icons/help.svg';
import IconBodyShop from '@/assets/icons/icon-body-shop.svg';
import IconBreakfast from '@/assets/icons/icon-breakfast.svg';
import IconCarWash from '@/assets/icons/icon-car-wash.svg';
import IconChurch from '@/assets/icons/icon-church.svg';
import IconDentist from '@/assets/icons/icon-dentist.svg';
import IconDinner from '@/assets/icons/icon-dinner.svg';
import IconHotel from '@/assets/icons/icon-hotel.svg';
import IconMore from '@/assets/icons/icon-more.svg';
import IconPainter from '@/assets/icons/icon-painter.svg';
import IconPlumber from '@/assets/icons/icon-plumber.svg';
import InfoCircle from '@/assets/icons/info-circle.svg';
import Instagram from '@/assets/icons/instagram.svg';
import Lightbulb from '@/assets/icons/lightbulb.svg';
import Mask from '@/assets/icons/mask.svg';
import Moon from '@/assets/icons/moon.svg';
import Notebook from '@/assets/icons/notebook.svg';
import Notification from '@/assets/icons/notification.svg';
import Phone from '@/assets/icons/phone.svg';
import PlayCircle from '@/assets/icons/play-circle.svg';
import Profile from '@/assets/icons/profile.svg';
import Progress from '@/assets/icons/progress.svg';
import QuestionCircle from '@/assets/icons/question-circle.svg';
import Restart from '@/assets/icons/restart.svg';
import Risk from '@/assets/icons/risk.svg';
import Running from '@/assets/icons/running.svg';
import Search from '@/assets/icons/search.svg';
import ShieldUser from '@/assets/icons/shield-user.svg';
import Strike from '@/assets/icons/strike.svg';
import Support from '@/assets/icons/support.svg';
import Tick from '@/assets/icons/tick.svg';
import TickCircle from '@/assets/icons/tick-circle.svg';
import Treadmill from '@/assets/icons/treadmill.svg';
import Tuning from '@/assets/icons/tuning.svg';
import Unread from '@/assets/icons/unread.svg';
import UserCircle from '@/assets/icons/user-circle.svg';
import UsersGroup from '@/assets/icons/users-group.svg';
import Walking from '@/assets/icons/walking.svg';
import Weight from '@/assets/icons/weight.svg';
import WineGlass from '@/assets/icons/wine-glass.svg';

import type { IconComponent } from './types';

export const DEFAULT_ICON_KEY = 'checklist' as const;

export type IconSlug = keyof typeof iconRegistry;

export const iconRegistry = {
  'academic-cap': AcademicCap,
  'add-plus': AddPlus,
  'alt-arrow-left': AltArrowLeft,
  'alt-arrow-right': AltArrowRight,
  apple: Apple,
  'arrow-left': ArrowLeft,
  'arrow-left-small': ArrowLeftSmall,
  'arrow-right': ArrowRight,
  'arrow-right-small': ArrowRightSmall,
  'biomarker-testing': BiomarkerTesting,
  book: Book,
  calendar: Calendar,
  'calendar-date': CalendarDate,
  'card-arrow': CardArrow,
  check: Check,
  'check-square': CheckSquare,
  checklist: Checklist,
  'chef-hat': ChefHat,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  close: Close,
  'close-square': CloseSquare,
  'course-up': CourseUp,
  email: Email,
  export: Export,
  eye: Eye,
  facebook: Facebook,
  filters: Filters,
  flag: Flag,
  google: Google,
  hamburger: Hamburger,
  help: Help,
  'icon-body-shop': IconBodyShop,
  'icon-breakfast': IconBreakfast,
  'icon-car-wash': IconCarWash,
  'icon-church': IconChurch,
  'icon-dentist': IconDentist,
  'icon-dinner': IconDinner,
  'icon-hotel': IconHotel,
  'icon-more': IconMore,
  'icon-painter': IconPainter,
  'icon-plumber': IconPlumber,
  'info-circle': InfoCircle,
  instagram: Instagram,
  lightbulb: Lightbulb,
  mask: Mask,
  moon: Moon,
  notebook: Notebook,
  notification: Notification,
  phone: Phone,
  'play-circle': PlayCircle,
  profile: Profile,
  progress: Progress,
  'question-circle': QuestionCircle,
  restart: Restart,
  risk: Risk,
  running: Running,
  search: Search,
  'shield-user': ShieldUser,
  strike: Strike,
  support: Support,
  tick: Tick,
  'tick-circle': TickCircle,
  treadmill: Treadmill,
  tuning: Tuning,
  unread: Unread,
  'user-circle': UserCircle,
  'users-group': UsersGroup,
  walking: Walking,
  weight: Weight,
  'wine-glass': WineGlass,
} as const satisfies Record<string, IconComponent>;
