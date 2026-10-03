import { useRef, useEffect } from 'react';

export default function SearchBar({ value, onChange, onClear }) {
  const inputRef = useRef(null);

  // Keyboard shortcut: Pressing '/' or 'Ctrl+K' focuses search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) && document.activeElement !== inputRef.current) {
        // Prevent typing slash into the input immediately if triggered by '/'
        if (e.key === '/') e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="search-bar-container my-3">
      <div className="position-relative">
        {/* Search Icon */}
        <div
          className="position-absolute top-50 start-0 translate-middle-y ps-3 text-secondary pointer-events-none d-flex align-items-center"
          style={{ pointerEvents: 'none' }}
        >
          <i className="bi bi-search fs-6" />
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          className="form-control form-control-lg ps-5 pe-5 py-2-5 rounded-3 fs-6 shadow-sm border"
          placeholder="Search commands, packages, frameworks..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search commands"
          autoComplete="off"
          spellCheck="false"
        />

        {/* Clear & Keyboard shortcut indicator */}
        <div className="position-absolute top-50 end-0 translate-middle-y pe-3 d-flex align-items-center gap-1">
          {value ? (
            <button
              type="button"
              className="btn btn-sm btn-link text-secondary p-0 text-decoration-none"
              onClick={onClear}
              title="Clear search query (Esc)"
              aria-label="Clear search"
            >
              <i className="bi bi-x-circle-fill fs-5" />
            </button>
          ) : (
            <kbd className="d-none d-md-inline-block text-secondary bg-body-tertiary border rounded px-1.5 py-0.5 small" style={{ fontSize: '0.72rem' }}>
              /
            </kbd>
          )}
        </div>
      </div>
    </div>
  );
}
