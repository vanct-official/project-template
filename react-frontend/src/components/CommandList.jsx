import CommandCard from './CommandCard';
import EmptyState from './EmptyState';
import { COMMAND_TYPES } from '../data';

export default function CommandList({
  commands = [],
  selectedType = 'all',
  onSelectType,
  favorites = [],
  onToggleFavorite,
  onToast,
  searchQuery = '',
  onResetFilters,
  onSelectTag
}) {
  const count = commands.length;

  return (
    <section className="command-list-section">
      {/* Controls Bar: Type filter pills & Results Count */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 pb-2 border-bottom">
        {/* Type Filter Buttons */}
        <div className="d-flex align-items-center gap-1 overflow-x-auto py-1 type-filter-bar">
          <span className="small text-secondary fw-semibold me-1 d-none d-md-inline">
            Type:
          </span>
          {COMMAND_TYPES.map((t) => {
            const isSelected = selectedType === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => onSelectType(t)}
                className={`btn btn-xs rounded-pill px-2-5 py-0.5 text-uppercase fw-semibold transition-all ${
                  isSelected
                    ? 'btn-dark text-white'
                    : 'btn-outline-secondary border-0 bg-body-tertiary text-secondary'
                }`}
                style={{ fontSize: '0.72rem' }}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Counter Header */}
        <div className="text-secondary small fw-medium">
          <span className="text-body fw-bold">{count}</span> {count === 1 ? 'command' : 'commands'} found
        </div>
      </div>

      {/* Grid or Empty State */}
      {count === 0 ? (
        <EmptyState searchQuery={searchQuery} onReset={onResetFilters} />
      ) : (
        <div className="row g-3 g-md-4">
          {commands.map((cmd) => (
            <div key={cmd.id} className="col-12 col-lg-6">
              <CommandCard
                command={cmd}
                isFavorite={favorites.includes(cmd.id)}
                onToggleFavorite={onToggleFavorite}
                onToast={onToast}
                onSelectTag={onSelectTag}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
