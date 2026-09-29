import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShoppingBag, Code2, Globe, Zap } from 'lucide-react';

export const CATEGORIES = [
  { id: 'All', label: 'All Projects', icon: Layers },
  { id: 'Shopify', label: 'Shopify', icon: ShoppingBag },
  { id: 'MERN', label: 'MERN Stack', icon: Code2 },
  { id: 'WordPress', label: 'WordPress', icon: Globe },
  { id: 'SEO', label: 'SEO & Speed', icon: Zap },
];

export const matchesProjectCategory = (project, categoryId) => {
  if (!categoryId || categoryId === 'All') return true;

  const cat = categoryId.toLowerCase();
  const projCat = (project.category || '').toLowerCase();
  const tags = (project.technologies || project.tags || []).map((t) => (typeof t === 'string' ? t.toLowerCase() : ''));
  const desc = (project.description || '').toLowerCase();

  if (cat === 'mern') {
    return (
      projCat.includes('mern') ||
      projCat.includes('full-stack') ||
      projCat.includes('react') ||
      tags.some((t) => ['mern', 'react.js', 'react', 'node.js', 'node', 'express', 'express.js', 'mongodb'].includes(t)) ||
      tags.some((t) => t.includes('mern') || t.includes('react'))
    );
  }

  if (cat === 'shopify') {
    return (
      projCat.includes('shopify') ||
      tags.some((t) => t.includes('shopify') || t.includes('liquid'))
    );
  }

  if (cat === 'wordpress') {
    return (
      projCat.includes('wordpress') ||
      projCat.includes('woocommerce') ||
      tags.some((t) => t.includes('wordpress') || t.includes('woocommerce') || t.includes('elementor'))
    );
  }

  if (cat === 'seo') {
    return (
      projCat.includes('seo') ||
      tags.some((t) =>
        ['seo', 'speed optimization', 'core web vitals', 'cro', 'search optimization', 'seo & speed'].includes(t)
      ) ||
      desc.includes('seo') ||
      desc.includes('core web vitals')
    );
  }

  return projCat.includes(cat) || tags.includes(cat);
};

export const ProjectCategoryFilter = ({
  selectedCategory,
  onSelectCategory,
  projects = [],
  className = '',
}) => {
  // Compute counts dynamically
  const getCount = (categoryId) => {
    return projects.filter((p) => matchesProjectCategory(p, categoryId)).length;
  };

  return (
    <div
      className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full ${className}`}
      role="tablist"
      aria-label="Filter projects by technology stack"
    >
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isSelected = selectedCategory === cat.id;
        const count = getCount(cat.id);

        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectCategory(cat.id)}
            className={`relative group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 shrink-0 cursor-pointer ${
              isSelected
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 border border-blue-500'
                : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 hover:bg-slate-850'
            }`}
          >
            {isSelected && (
              <motion.span
                layoutId="activeFilterBubble"
                className="absolute inset-0 rounded-xl bg-blue-600 -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Icon
              className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                isSelected ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
              }`}
            />
            <span className="font-semibold">{cat.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                isSelected
                  ? 'bg-blue-800/80 text-blue-100'
                  : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ProjectCategoryFilter;
