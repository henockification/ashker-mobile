export type Category = {
  id: string;
  name: string;
  code?: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  parentCategory?: Category;
};

export type CategoryFilters = {
  name?: string;
};

export type CategoryItem = {
  id: string;
  name: string;
  icon?: string;
  showChevron?: boolean;
};

export type CategorySection = {
  title: string;
  items: CategoryItem[];
};
