namespace aspnet_backend.Services;

public class HealthService : IHealthService
{
    private readonly IWebHostEnvironment _environment;

    public HealthService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public HealthCheckResult GetSystemHealth()
    {
        return new HealthCheckResult
        {
            Success = true,
            Status = "Healthy",
            Message = "System is healthy and operational",
            Timestamp = DateTimeOffset.UtcNow,
            Environment = _environment.EnvironmentName,
            Version = "1.0.0"
        };
    }
}
