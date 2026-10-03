export default function EmptyState({ searchQuery, onReset }) {
  return (
    <div className="text-center py-5 px-3 border rounded-3 bg-body-tertiary empty-state-container my-4">
      <div
        className="d-inline-flex align-items-center justify-content-center rounded-circle bg-secondary-subtle text-secondary mb-3"
        style={{ width: '64px', height: '64px' }}
      >
        <i className="bi bi-search fs-3" />
      </div>
      <h3 className="h5 fw-bold text-body mb-2">No commands found</h3>
      <p className="text-secondary small mb-4 mx-auto" style={{ maxWidth: '380px' }}>
        {searchQuery ? (
          <>
            No matching commands for <strong className="text-body">&ldquo;{searchQuery}&rdquo;</strong>. Try another keyword, category, or command type.
          </>
        ) : (
          'Try selecting another category or command type filter.'
        )}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="btn btn-sm btn-outline-primary px-3 rounded-2"
        >
          <i className="bi bi-arrow-counterclockwise me-1" />
          Reset filters
        </button>
      )}
    </div>
  );
}
