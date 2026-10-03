export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      className="position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1100 }}
      role="status"
      aria-live="polite"
    >
      <div className="toast show align-items-center text-bg-dark border-0 shadow-lg rounded-3">
        <div className="d-flex">
          <div className="toast-body d-flex align-items-center gap-2 py-2 px-3 small">
            <i className="bi bi-check-circle-fill text-success fs-6" />
            <span>{message}</span>
          </div>
          {onClose && (
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={onClose}
              aria-label="Close notification"
            />
          )}
        </div>
      </div>
    </div>
  );
}
