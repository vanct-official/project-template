# ASP.NET Backend

This directory contains a production-oriented ASP.NET Core Web API that follows the repository’s layered architecture and response conventions.

## Features

- Controller-based API routing with versioning (`/api/v1/...`)
- Centralized exception handling and consistent `ProblemDetails` responses
- SQL Server + EF Core configuration with sample data models
- JWT authentication support with environment-based configuration
- Swagger/OpenAPI documentation in development
- Health endpoint aligned with the Express and Spring backends
- Restricted CORS configuration for the React development server

## Project structure

- `Controllers/` – HTTP endpoints
- `Data/` – EF Core `DbContext` and persistence configuration
- `Models/` – DTOs and API envelopes
- `Services/` – business services and abstractions
- `Extensions/` – configuration registrations
- `Middleware/` – global exception handling

## Local development

1. Restore packages:
   ```bash
   dotnet restore
   ```
2. Configure local secrets or environment variables:
   ```bash
   dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=(localdb)\\MSSQLLocalDB;Database=AspNetBackendDb;Trusted_Connection=True;TrustServerCertificate=True;"
   dotnet user-secrets set "Jwt:Key" "replace-with-a-long-random-secret-key"
   dotnet user-secrets set "Jwt:Issuer" "aspnet-backend"
   dotnet user-secrets set "Jwt:Audience" "aspnet-backend-clients"
   ```
3. Run the app:
   ```bash
   dotnet run --project aspnet-backend.csproj
   ```
   The default HTTP URL is `http://localhost:5037`; React connects to it through `VITE_ASPNET_API_URL`.
4. Open the OpenAPI document at `http://localhost:5037/openapi/v1.json`.

## React integration

The React frontend checks ASP.NET Core at `GET /api/v1/Health`. Set
`VITE_ASPNET_API_URL` in `react-frontend/.env` when the backend uses a different URL.
For local development, ASP.NET Core allows the React origins `http://localhost:3000`
and `http://localhost:5173`. In other environments, set `Cors:AllowedOrigins` to
the exact trusted frontend origins (for environment variables, use
`Cors__AllowedOrigins__0`, `Cors__AllowedOrigins__1`, and so on).
React also provides `aspnetSamplesApi` for the sample-record endpoints; configure a
SQL Server connection before using those endpoints.

## Database setup

The app is configured to use SQL Server via `ApplicationDbContext` and the `DefaultConnection` connection string. For local development, prefer user secrets or environment variables instead of hard-coded credentials.

Typical migration workflow:

```bash
dotnet ef database update --project aspnet-backend.csproj
```

If you need to create migrations:

```bash
dotnet ef migrations add InitialCreate --project aspnet-backend.csproj
```

## API behavior

### Health

`GET /api/v1/Health`

Returns a standard API envelope:

```json
{
  "success": true,
  "message": "System is healthy and operational",
  "data": {
    "status": "Healthy",
    "application": "aspnet-backend",
    "environment": "Development",
    "version": "1.0.0",
    "timestamp": "2025-01-01T00:00:00Z"
  },
  "timestamp": "2025-01-01T00:00:00Z"
}
```

### Sample records

- `GET /api/v1/Sample`
- `GET /api/v1/Sample/{id}`
- `POST /api/v1/Sample`

## Security notes

- Do not commit secrets to source control.
- Prefer `dotnet user-secrets` or environment variables for `ConnectionStrings:*` and `Jwt:*` values.
- JWT signing keys should be long, unique, and protected in secure secret stores in production.
- Use HTTPS in all non-local deployments.
