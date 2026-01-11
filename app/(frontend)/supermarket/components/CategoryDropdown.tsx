"use client";

import React, { useState, useEffect } from 'react';
import { getCategories, addCategory } from '../data/categories';

interface CategoryDropdownProps {
  value: string;
  onChange: (category: string) => void;
  label?: string;
  required?: boolean;
}

export default function CategoryDropdown({ value, onChange, label = 'Category', required = false }: CategoryDropdownProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [showAddNew, setShowAddNew] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const updated = addCategory(newCategory.trim());
      setCategories(updated);
      onChange(newCategory.trim());
      setNewCategory('');
      setShowAddNew(false);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === '__add_new__') {
      setShowAddNew(true);
    } else {
      onChange(selectedValue);
      setShowAddNew(false);
    }
  };

  return (
    <div>
      <label className="block text-black font-medium mb-2">{label}</label>
      
      {showAddNew ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-black"
            autoFocus
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setShowAddNew(false);
              setNewCategory('');
            }}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <select
          value={value}
          onChange={handleSelectChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
          required={required}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          <option value="__add_new__" className="font-semibold text-orange-600">
            + Add New Category
          </option>
        </select>
      )}
    </div>
  );
}
