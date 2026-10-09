import { useState, useEffect, useCallback } from 'react';
import { healthApi } from '../api';
import CopyButton from './CopyButton';

function SingleBackendView({ result, loading }) {
  const [showJson, setShowJson] = useState(false);
  const isExpress = result.backend === 'ExpressJS';
  const themeColor = isExpress ? 'primary' : 'success';
  const icon = isExpress ? 'bi-node-plus-fill' : 'bi-cup-hot-fill';
  const frameworkName = isExpress ? 'ExpressJS (Node.js)' : 'Spring Boot (Java 17)';

  const rawJsonString = result?.data ? JSON.stringify(result.data, null, 2) : '';

  return (
    <div className={`card border border-${themeColor}-subtle shadow-sm h-100`}>
      {/* Header */}
      <div className="card-header bg-body-tertiary d-flex align-items-center justify-content-between py-2 px-3">
        <div className="d-flex align-items-center gap-2">
          <div
            className={`d-inline-flex align-items-center justify-content-center rounded p-1-5 text-white ${
              result.success ? `bg-${themeColor}` : 'bg-danger'
            }`}
            style={{ width: '28px', height: '28px' }}
          >
            <i className={`bi ${icon}`} />
          </div>
          <div>
            <div className="fw-bold small d-flex align-items-center gap-1">
              <span>{frameworkName}</span>
              <span className={`badge bg-${themeColor}-subtle text-${themeColor} border border-${themeColor}-subtle font-monospace`}>
                :{result.port}
              </span>
            </div>
          </div>
        </div>

        <div>
          {loading ? (
            <span className="spinner-border spinner-border-sm text-secondary" role="status" />
          ) : result.success ? (
            <span className="badge bg-success-subtle text-success border border-success-subtle d-inline-flex align-items-center gap-1">
              <span className="badge rounded-circle bg-success p-1 animate-pulse" style={{ width: '6px', height: '6px' }} />
              <span>Online ({result.latency}ms)</span>
            </span>
          ) : (
            <span className="badge bg-danger-subtle text-danger border border-danger-subtle d-inline-flex align-items-center gap-1">
              <span className="badge rounded-circle bg-danger p-1" style={{ width: '6px', height: '6px' }} />
              <span>Offline</span>
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="card-body p-3">
        {result.success && result.data ? (
          <div>
            {/* Stats row */}
            <div className="row g-2 mb-3">
              <div className="col-6">
                <div className="p-2 border rounded bg-body-tertiary text-center">
                  <div className="text-secondary small" style={{ fontSize: '0.72rem' }}>Thời gian chạy</div>
                  <div className="fw-semibold text-body small">
                    <i className="bi bi-clock-history me-1 text-secondary" />
                    {result.data.data?.uptime || 'N/A'}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="p-2 border rounded bg-body-tertiary text-center">
                  <div className="text-secondary small" style={{ fontSize: '0.72rem' }}>Môi trường / Phiên bản</div>
                  <div className="fw-semibold text-body small font-monospace">
                    {result.data.data?.nodeVersion || result.data.data?.javaVersion || 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            {/* Memory breakdown */}
            {result.data.data?.memory && (
              <div className="p-2 border rounded bg-body-tertiary mb-3">
                <div className="small fw-semibold text-body mb-1" style={{ fontSize: '0.75rem' }}>
                  <i className="bi bi-memory text-primary me-1" />
                  Bộ nhớ RAM tiêu thụ:
                </div>
                <div className="row g-1 text-center font-monospace" style={{ fontSize: '0.75rem' }}>
                  <div className="col-4">
                    <div className="bg-body p-1 rounded border">
                      <span className="text-secondary d-block" style={{ fontSize: '0.68rem' }}>RSS</span>
                      <strong>{result.data.data.memory.rss}</strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-body p-1 rounded border">
                      <span className="text-secondary d-block" style={{ fontSize: '0.68rem' }}>Heap Total</span>
                      <strong className="text-info">{result.data.data.memory.heapTotal}</strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-body p-1 rounded border">
                      <span className="text-secondary d-block" style={{ fontSize: '0.68rem' }}>Heap Used</span>
                      <strong className="text-warning-emphasis">{result.data.data.memory.heapUsed}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Server message */}
            <div className="small text-secondary mb-2" style={{ fontSize: '0.78rem' }}>
              <i className="bi bi-info-circle me-1" />
              <span>Thông điệp: <strong className="text-body">&ldquo;{result.data.message}&rdquo;</strong></span>
            </div>

            {/* Toggle Raw JSON */}
            <div>
              <div className="d-flex align-items-center justify-content-between">
                <button
                  type="button"
                  className="btn btn-xs btn-link text-decoration-none p-0 small text-primary"
                  onClick={() => setShowJson(!showJson)}
                >
                  <i className={`bi bi-chevron-${showJson ? 'up' : 'down'} me-1`} />
                  {showJson ? 'Ẩn JSON' : 'Xem JSON thô'}
                </button>
                {showJson && (
                  <CopyButton textToCopy={rawJsonString} label="Copy JSON" variant="outline" size="sm" />
                )}
              </div>
              {showJson && (
                <pre
                  className="mt-2 p-2 bg-dark text-light rounded font-monospace small mb-0 overflow-auto"
                  style={{ maxHeight: '160px', fontSize: '0.75rem', lineHeight: '1.4' }}
                >
                  <code>{rawJsonString}</code>
                </pre>
              )}
            </div>
          </div>
        ) : (
          <div className="alert alert-danger py-2 px-3 small mb-0">
            <div className="fw-semibold mb-1">
              <i className="bi bi-exclamation-octagon-fill me-1" />
              Không thể kết nối đến cổng {result.port}
            </div>
            <div className="text-secondary font-monospace" style={{ fontSize: '0.75rem' }}>
              {isExpress ? 'cd express-backend && npm run dev' : 'cd spring-backend && mvn spring-boot:run'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ApiHealthCard({ compact = false }) {
  const [healthResults, setHealthResults] = useState({ express: null, spring: null });
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchBoth = useCallback(async (signal) => {
    setLoading(true);
    try {
      const results = await healthApi.getParallelHealth({ signal });
      if (!signal?.aborted) {
        setHealthResults(results);
      }
    } catch (err) {
      if (!signal?.aborted) {
        console.error('Error fetching parallel health:', err);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
        setLastChecked(new Date().toLocaleTimeString('vi-VN'));
      }
    }
  }, []);

  // Initial load with cleanup and request cancellation
  useEffect(() => {
    const controller = new AbortController();
    let isSubscribed = true;

    healthApi
      .getParallelHealth({ signal: controller.signal })
      .then((results) => {
        if (isSubscribed && !controller.signal.aborted) {
          setHealthResults(results);
        }
      })
      .catch((err) => {
        if (isSubscribed && !controller.signal.aborted) {
          console.error('Error fetching parallel health:', err);
        }
      })
      .finally(() => {
        if (isSubscribed && !controller.signal.aborted) {
          setLoading(false);
          setLastChecked(new Date().toLocaleTimeString('vi-VN'));
        }
      });

    return () => {
      isSubscribed = false;
      controller.abort();
    };
  }, []);

  const handleManualRefresh = useCallback(() => {
    const controller = new AbortController();
    fetchBoth(controller.signal);
  }, [fetchBoth]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      const controller = new AbortController();
      fetchBoth(controller.signal);
    }, 10000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchBoth]);

  // Compact navbar mode
  if (compact) {
    const { express, spring } = healthResults;
    return (
      <div className="d-flex align-items-center gap-2">
        {/* Express indicator */}
        <button
          type="button"
          onClick={handleManualRefresh}
          className={`btn btn-xs ${express?.success ? 'btn-outline-primary' : 'btn-outline-danger'} d-inline-flex align-items-center gap-1 px-2 py-0-5 rounded-pill`}
          title={`Express (Port 5000): ${express?.success ? `Online (${express.latency}ms)` : 'Offline'}`}
        >
          <span className={`badge rounded-circle ${express?.success ? 'bg-primary animate-pulse' : 'bg-danger'} p-1`} style={{ width: '6px', height: '6px' }} />
          <span className="small">Express:5000</span>
          {express?.success && <span className="text-secondary small">({express.latency}ms)</span>}
        </button>

        {/* Spring Boot indicator */}
        <button
          type="button"
          onClick={handleManualRefresh}
          className={`btn btn-xs ${spring?.success ? 'btn-outline-success' : 'btn-outline-danger'} d-inline-flex align-items-center gap-1 px-2 py-0-5 rounded-pill`}
          title={`Spring Boot (Port 8080): ${spring?.success ? `Online (${spring.latency}ms)` : 'Offline'}`}
        >
          <span className={`badge rounded-circle ${spring?.success ? 'bg-success animate-pulse' : 'bg-danger'} p-1`} style={{ width: '6px', height: '6px' }} />
          <span className="small">Spring:8080</span>
          {spring?.success && <span className="text-secondary small">({spring.latency}ms)</span>}
        </button>
      </div>
    );
  }

  const express = healthResults.express;
  const spring = healthResults.spring;

  return (
    <div className="card shadow-sm border border-secondary-subtle mb-4">
      {/* Card Header */}
      <div className="card-header bg-body-tertiary d-flex align-items-center justify-content-between flex-wrap gap-2 py-2 px-3">
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded bg-primary text-white p-2"
            style={{ width: '32px', height: '32px' }}
          >
            <i className="bi bi-hdd-network" />
          </div>
          <div>
            <h2 className="h6 mb-0 fw-bold d-flex align-items-center gap-2">
              <span>Hệ thống Backend Song Song (Dual RESTful API)</span>
              <span className="badge bg-secondary-subtle text-secondary border small font-monospace">
                Express:5000 & Spring:8080
              </span>
            </h2>
            <span className="small text-secondary" style={{ fontSize: '0.78rem' }}>
              Kiểm tra đồng thời cả 2 máy chủ Backend: ExpressJS và Spring Boot
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="d-flex align-items-center gap-2">
          <div className="form-check form-switch mb-0 d-none d-sm-flex align-items-center gap-1">
            <input
              className="form-check-input cursor-pointer"
              type="checkbox"
              id="autoRefreshSwitch"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            <label className="form-check-label small text-secondary cursor-pointer" htmlFor="autoRefreshSwitch">
              Tự động làm mới (10s)
            </label>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
            onClick={handleManualRefresh}
            disabled={loading}
          >
            <i className={`bi bi-arrow-clockwise ${loading ? 'spin-animation' : ''}`} />
            <span>{loading ? 'Đang kiểm tra...' : 'Làm mới cả hai'}</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body p-3">
        {loading && !express && !spring ? (
          <div className="text-center py-4 text-secondary">
            <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
            <span>Đang gửi yêu cầu kiểm tra song song đến Port 5000 và Port 8080...</span>
          </div>
        ) : (
          <div>
            {/* Dual Backend Columns */}
            <div className="row g-3">
              {/* ExpressJS Column */}
              <div className="col-12 col-lg-6">
                {express && <SingleBackendView result={express} loading={loading} />}
              </div>

              {/* Spring Boot Column */}
              <div className="col-12 col-lg-6">
                {spring && <SingleBackendView result={spring} loading={loading} />}
              </div>
            </div>

            {/* Footer with last update */}
            <div className="d-flex align-items-center justify-content-between text-secondary small pt-2 mt-3 border-top" style={{ fontSize: '0.78rem' }}>
              <div>
                <i className="bi bi-shield-check text-success me-1" />
                Kiến trúc RESTful API chuẩn hóa phản hồi đồng bộ giữa ExpressJS và Spring Boot.
              </div>
              <div className="font-monospace">
                Cập nhật lúc: {lastChecked || 'Vừa xong'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
