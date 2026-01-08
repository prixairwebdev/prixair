// Centralized category management
export const defaultCategories = [
  'Dairy & Eggs',
  'Bakery',
  'Fruits & Vegetables',
  'Meat & Poultry',
  'Beverages',
  'Pantry & Staples',
  'Snacks',
  'Frozen Foods',
  'Medicine',
  'Personal Care',
  'Baby Care',
  'Household',
];

// Get categories from localStorage or use defaults
export const getCategories = (): string[] => {
  if (typeof window === 'undefined') return defaultCategories;
  
  const stored = localStorage.getItem('product_categories');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultCategories;
    }
  }
  return defaultCategories;
};

// Add a new category
export const addCategory = (category: string): string[] => {
  const categories = getCategories();
  if (!categories.includes(category)) {
    const updated = [...categories, category].sort();
    localStorage.setItem('product_categories', JSON.stringify(updated));
    return updated;
  }
  return categories;
};

// Remove a category
export const removeCategory = (category: string): string[] => {
  const categories = getCategories();
  const updated = categories.filter(c => c !== category);
  localStorage.setItem('product_categories', JSON.stringify(updated));
  return updated;
};

// Reset to default categories
export const resetCategories = (): string[] => {
  localStorage.setItem('product_categories', JSON.stringify(defaultCategories));
  return defaultCategories;
};
