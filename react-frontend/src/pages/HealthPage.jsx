import ApiHealthCard from '../components/ApiHealthCard';
import { NavLink } from 'react-router-dom';
import { API_ENDPOINTS } from '../api';

const expressBase =
  import.meta.env.VITE_EXPRESS_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:5000';
const springBase = import.meta.env.VITE_SPRING_API_URL || 'http://localhost:8080';

export default function HealthPage() {
  const expressHealthUrl = `${expressBase}${API_ENDPOINTS.health.check}`;
  const springHealthUrl = `${springBase}${API_ENDPOINTS.health.check}`;
  const springRootUrl = `${springBase}${API_ENDPOINTS.system.root}`;
  const expressRootUrl = `${expressBase}${API_ENDPOINTS.system.root}`;

  return (
    <div className="container-fluid px-3 px-lg-4 py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-9">
          {/* Breadcrumb & Navigation */}
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb small mb-0">
              <li className="breadcrumb-item">
                <NavLink to="/" className="text-decoration-none">Trang chủ</NavLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Kiểm tra kết nối API</li>
            </ol>
          </nav>

          <div className="mb-4">
            <h1 className="h4 fw-bold mb-1">Kiểm tra hệ thống Backend (API Health)</h1>
            <p className="text-secondary small mb-0">
              Trang giám sát tình trạng hoạt động và tài nguyên của máy chủ Express Backend tại cổng 5000.
            </p>
          </div>

          {/* Health Card */}
          <ApiHealthCard />

          {/* Information & Endpoints card */}
          <div className="card shadow-sm border border-secondary-subtle">
            <div className="card-header bg-body-tertiary py-2 px-3 fw-semibold small">
              <i className="bi bi-info-circle me-1 text-primary" />
              Thông tin các Endpoint API chính
            </div>
            <div className="card-body p-3">
              <div className="table-responsive">
                <table className="table table-sm table-hover align-middle mb-0 small">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '90px' }}>Method</th>
                      <th>Endpoint URL</th>
                      <th>Mô tả</th>
                      <th style={{ width: '120px' }}>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="badge bg-primary font-monospace">GET</span></td>
                      <td><code>{expressHealthUrl}</code></td>
                      <td><strong>ExpressJS</strong>: Trạng thái hệ thống, Uptime, RAM (RSS/Heap), Node.js</td>
                      <td>
                        <a
                          href={expressHealthUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-xs btn-outline-primary"
                        >
                          Mở tab mới <i className="bi bi-box-arrow-up-right ms-1" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="badge bg-success font-monospace">GET</span></td>
                      <td><code>{springHealthUrl}</code></td>
                      <td><strong>Spring Boot</strong>: Trạng thái hệ thống, Uptime, RAM (JVM), Java 17</td>
                      <td>
                        <a
                          href={springHealthUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-xs btn-outline-success"
                        >
                          Mở tab mới <i className="bi bi-box-arrow-up-right ms-1" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="badge bg-secondary font-monospace">GET</span></td>
                      <td><code>{springRootUrl}</code></td>
                      <td><strong>Spring Boot</strong>: Root Welcome & Metadata API</td>
                      <td>
                        <a
                          href={springRootUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-xs btn-outline-secondary"
                        >
                          Mở tab mới <i className="bi bi-box-arrow-up-right ms-1" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="badge bg-secondary font-monospace">GET</span></td>
                      <td><code>{expressRootUrl}</code></td>
                      <td><strong>ExpressJS</strong>: Root Welcome & Metadata API</td>
                      <td>
                        <a
                          href={expressRootUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-xs btn-outline-secondary"
                        >
                          Mở tab mới <i className="bi bi-box-arrow-up-right ms-1" />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
