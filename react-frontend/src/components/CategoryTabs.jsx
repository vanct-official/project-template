import { CATEGORIES } from '../data';

export default function CategoryTabs({
  selectedCategory,
  onSelectCategory,
  categoryCounts = {},
  showFavoritesOnly,
  onToggleFavoritesOnly,
  favoritesCount = 0
}) {
  return (
    <div className="category-navigation mb-3">
      {/* Scrollable category list */}
      <div className="d-flex align-items-center gap-1 overflow-x-auto pb-2 category-scroll-container">
        {CATEGORIES.map((cat) => {
          const isSelected = !showFavoritesOnly && selectedCategory === cat;
          const count = categoryCounts[cat] ?? 0;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                if (showFavoritesOnly) onToggleFavoritesOnly(false);
                onSelectCategory(cat);
              }}
              className={`btn btn-sm text-nowrap rounded-2 px-3 py-1-5 fw-medium d-inline-flex align-items-center gap-1.5 transition-all ${
                isSelected
                  ? 'btn-primary shadow-sm text-white'
                  : 'btn-outline-secondary border-0 bg-body-tertiary text-body'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`badge rounded-pill ${
                  isSelected
                    ? 'bg-white text-primary'
                    : 'bg-secondary-subtle text-secondary-emphasis'
                }`}
                style={{ fontSize: '0.72rem' }}
              >
                {count}
              </span>
            </button>
          );
        })}

        {/* Favorite filter toggle button */}
        <button
          type="button"
          onClick={() => onToggleFavoritesOnly(!showFavoritesOnly)}
          className={`btn btn-sm text-nowrap rounded-2 px-3 py-1-5 fw-medium d-inline-flex align-items-center gap-1.5 transition-all ms-auto ${
            showFavoritesOnly
              ? 'btn-warning text-dark shadow-sm'
              : 'btn-outline-secondary border-0 bg-body-tertiary text-body'
          }`}
          title="Filter favorited commands"
        >
          <i
            className={`bi ${showFavoritesOnly ? 'bi-star-fill text-dark' : 'bi-star text-warning'}`}
          />
          <span>Favorites</span>
          <span
            className={`badge rounded-pill ${
              showFavoritesOnly
                ? 'bg-dark text-warning'
                : 'bg-secondary-subtle text-secondary-emphasis'
            }`}
            style={{ fontSize: '0.72rem' }}
          >
            {favoritesCount}
          </span>
        </button>
      </div>
    </div>
  );
}
