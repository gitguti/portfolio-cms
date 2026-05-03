interface CraftTagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export const CraftTagFilter = ({ tags, selectedTag, onTagSelect }: CraftTagFilterProps) => {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <button
        onClick={() => onTagSelect(null)}
        className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
          selectedTag === null
            ? 'bg-gray-800 text-white dark:bg-zinc-50 dark:text-gray-900'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700'
        }`}
      >
        All
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
          className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
            selectedTag === tag
              ? 'bg-gray-800 text-white dark:bg-zinc-50 dark:text-gray-900'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
