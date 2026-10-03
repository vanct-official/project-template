import CopyButton from './CopyButton';
import { TYPE_BADGE_CONFIG } from '../data';

export default function CommandCard({
  command,
  isFavorite = false,
  onToggleFavorite,
  onToast,
  onSelectTag
}) {
  const { id, name, category, technology, description, link, type, commands = [], tags = [] } = command;

  const typeConfig = TYPE_BADGE_CONFIG[type] || TYPE_BADGE_CONFIG.other;

  // Joined string for "Copy All" when multiple commands exist
  const allCommandsText = commands.join('\n');
  const hasMultipleCommands = commands.length > 1;

  const handleCopyToast = () => {
    if (onToast) {
      onToast(`Command copied to clipboard`);
    }
  };

  const handleCopyAllToast = () => {
    if (onToast) {
      onToast(`All ${commands.length} commands copied to clipboard`);
    }
  };

  return (
    <div className="card h-100 border rounded-3 shadow-none command-card">
      <div className="card-body p-3 p-md-4 d-flex flex-column">
        {/* Top Header: Title, Category/Type Badges, and Favorite Star */}
        <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
          <div className="flex-grow-1 min-w-0">
            <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
              <h2 className="h5 mb-0 fw-bold text-body text-truncate command-title">
                {name}
              </h2>
              {technology && (
                <span className="badge text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle px-2 py-0.5 small fw-normal">
                  {technology}
                </span>
              )}
            </div>
            <p className="card-subtitle text-secondary small mb-0 line-clamp-2">
              {description}
            </p>
            {link && (
              <p className="text-secondary small mb-0 mt-1 text-truncate">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-primary d-inline-flex align-items-center gap-1"
                  title={link}
                >
                  <i className="bi bi-box-arrow-up-right" style={{ fontSize: '0.72rem' }} />
                  <span>Reference link: {link}</span>
                </a>
              </p>
            )}
          </div>

          <div className="d-flex align-items-center gap-1.5 flex-shrink-0">
            {/* Category / Type Badges */}
            <span
              className={`badge ${typeConfig.bg} ${typeConfig.text} border ${typeConfig.border} px-2 py-1 text-uppercase fw-semibold`}
              style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}
            >
              {typeConfig.label}
            </span>

            {/* Favorite Button */}
            <button
              type="button"
              onClick={() => onToggleFavorite(id)}
              className={`btn btn-sm btn-link p-1 text-decoration-none transition-transform ${
                isFavorite ? 'text-warning' : 'text-secondary opacity-50'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <i className={`bi ${isFavorite ? 'bi-star-fill fs-5' : 'bi-star fs-5'}`} />
            </button>
          </div>
        </div>

        {/* Multiple Commands Header (if applicable) */}
        {hasMultipleCommands && (
          <div className="d-flex align-items-center justify-content-between my-2 pb-1 border-bottom">
            <span className="small text-secondary fw-medium">
              {commands.length} Commands
            </span>
            <CopyButton
              text={allCommandsText}
              label="Copy All"
              copiedLabel="All Copied!"
              className="btn btn-xs btn-outline-primary border-primary-subtle py-0.5 px-2"
              onCopy={handleCopyAllToast}
            />
          </div>
        )}

        {/* Command Code Blocks */}
        <div className="command-code-blocks my-2 flex-grow-1 d-flex flex-column gap-2">
          {commands.map((cmdText, idx) => (
            <div
              key={idx}
              className="command-block-item d-flex align-items-stretch justify-content-between rounded-2 border bg-body-tertiary p-2 gap-2"
            >
              <div className="command-code-wrapper d-flex align-items-center flex-grow-1 min-w-0 overflow-hidden">
                <span className="command-prompt text-secondary me-2 user-select-none opacity-50">$</span>
                <code className="command-code text-body font-monospace text-break user-select-all">
                  {cmdText}
                </code>
              </div>
              <div className="d-flex align-items-center flex-shrink-0">
                <CopyButton
                  text={cmdText}
                  label="Copy"
                  copiedLabel="Copied!"
                  className="btn btn-sm btn-outline-secondary border-0 bg-transparent"
                  onCopy={handleCopyToast}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer: Tags & Category Info */}
        <div className="mt-2 pt-2 border-top d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div className="d-flex align-items-center flex-wrap gap-1">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onSelectTag && onSelectTag(tag)}
                className="badge bg-transparent border-0 text-secondary p-0 text-decoration-none small tag-pill me-1"
                title={`Filter by #${tag}`}
              >
                #{tag}
              </button>
            ))}
          </div>
          <span className="badge text-secondary bg-body-secondary small fw-normal">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}
