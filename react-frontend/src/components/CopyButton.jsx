import { useState, useEffect } from 'react';
import { copyToClipboard } from '../utils/clipboard';

/**
 * Reusable copy button with temporary 'Copied!' state and feedback
 */
export default function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
  className = 'btn btn-sm btn-outline-secondary',
  onCopy = null,
  showIcon = true
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async (e) => {
    e.stopPropagation();
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      if (onCopy) {
        onCopy(text);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`${className} d-inline-flex align-items-center gap-1 transition-all ${
        copied ? 'btn-success text-white border-success' : ''
      }`}
      title={copied ? 'Copied to clipboard' : 'Copy command to clipboard'}
      aria-label={copied ? 'Copied' : label}
    >
      {showIcon && (
        <i
          className={`bi ${copied ? 'bi-check2' : 'bi-clipboard'} fs-6`}
          aria-hidden="true"
        />
      )}
      <span className="fw-medium">{copied ? copiedLabel : label}</span>
    </button>
  );
}
