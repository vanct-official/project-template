import { useState, useMemo, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import CommandList from '../components/CommandList';
import Toast from '../components/Toast';
import ApiHealthCard from '../components/ApiHealthCard';
import allCommands, { CATEGORIES } from '../data';
import { filterCommands } from '../utils/commandFilter';

const FAVORITES_STORAGE_KEY = 'vanct_toolkit_favorites';

export default function Home({ initialCategory = 'All' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedType, setSelectedType] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showHealthPanel, setShowHealthPanel] = useState(true);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load favorites from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((commandId) => {
    setFavorites((prev) => {
      const exists = prev.includes(commandId);
      const updated = exists ? prev.filter((id) => id !== commandId) : [...prev, commandId];
      return updated;
    });
  }, []);

  // Toast handler with auto-dismiss
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage('');
    }, 2400);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Compute category counts for badge indicators
  const categoryCounts = useMemo(() => {
    const counts = { All: allCommands.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = allCommands.filter(
          (c) => c.category.toLowerCase() === cat.toLowerCase()
        ).length;
      }
    });
    return counts;
  }, []);

  // Filter commands based on current criteria
  const filteredCommands = useMemo(() => {
    return filterCommands(allCommands, {
      category: selectedCategory,
      type: selectedType,
      searchQuery,
      onlyFavorites: showFavoritesOnly,
      favorites
    });
  }, [selectedCategory, selectedType, searchQuery, showFavoritesOnly, favorites]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedType('all');
    setShowFavoritesOnly(false);
  };

  const handleSelectTag = (tag) => {
    setSearchQuery(tag);
  };

  return (
    <div className="container-fluid px-3 px-lg-4 py-3">
      {/* Search Header Area */}
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="text-center my-2 d-md-none">
            <h1 className="h5 fw-bold mb-1">VanCT Developer Toolkit</h1>
            <p className="text-secondary small mb-0">
              Quick references for project setup, libraries, and CLI tools.
            </p>
          </div>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            totalMatches={filteredCommands.length}
            totalCommands={allCommands.length}
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="row justify-content-center mt-1">
        <div className="col-12 col-xl-10">
          {/* Collapsible API Health Monitor Panel */}
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="small text-secondary fw-semibold d-inline-flex align-items-center gap-1">
              <i className="bi bi-hdd-network text-primary" />
              Kết nối Backend API (Express)
            </span>
            <button
              type="button"
              className="btn btn-xs btn-outline-secondary py-0 px-2 rounded small"
              onClick={() => setShowHealthPanel(!showHealthPanel)}
            >
              <i className={`bi bi-chevron-${showHealthPanel ? 'up' : 'down'} me-1`} />
              {showHealthPanel ? 'Thu gọn trạng thái API' : 'Xem thông tin API Health'}
            </button>
          </div>

          {showHealthPanel && <ApiHealthCard />}

          {/* Desktop & Mobile Category Tabs */}
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
            showFavoritesOnly={showFavoritesOnly}
            onToggleFavoritesOnly={setShowFavoritesOnly}
            favoritesCount={favorites.length}
          />

          {/* Active filter badges indicator */}
          {(searchQuery || selectedCategory !== 'All' || selectedType !== 'all' || showFavoritesOnly) && (
            <div className="d-flex align-items-center flex-wrap gap-2 mb-3 small">
              <span className="text-secondary">Active filters:</span>
              {selectedCategory !== 'All' && (
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle d-inline-flex align-items-center gap-1">
                  Category: {selectedCategory}
                  <i
                    className="bi bi-x cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedCategory('All')}
                    title="Remove category filter"
                  />
                </span>
              )}
              {selectedType !== 'all' && (
                <span className="badge bg-dark-subtle text-body border d-inline-flex align-items-center gap-1">
                  Type: {selectedType}
                  <i
                    className="bi bi-x cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedType('all')}
                    title="Remove type filter"
                  />
                </span>
              )}
              {searchQuery && (
                <span className="badge bg-secondary-subtle text-secondary-emphasis border d-inline-flex align-items-center gap-1">
                  Query: &ldquo;{searchQuery}&rdquo;
                  <i
                    className="bi bi-x cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => setSearchQuery('')}
                    title="Clear search query"
                  />
                </span>
              )}
              {showFavoritesOnly && (
                <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle d-inline-flex align-items-center gap-1">
                  Favorites Only
                  <i
                    className="bi bi-x cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => setShowFavoritesOnly(false)}
                    title="Show all items"
                  />
                </span>
              )}
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn btn-link btn-xs text-secondary text-decoration-none p-0 ms-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Command List & Cards */}
          <CommandList
            commands={filteredCommands}
            selectedType={selectedType}
            onSelectType={setSelectedType}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onToast={showToast}
            searchQuery={searchQuery}
            onResetFilters={handleResetFilters}
            onSelectTag={handleSelectTag}
          />
        </div>
      </div>

      {/* Floating Copy Feedback Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}
