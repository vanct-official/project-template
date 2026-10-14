namespace aspnet_backend.Services;

public interface IHealthService
{
    HealthCheckResult GetSystemHealth();
}

public sealed class HealthCheckResult
{
    public bool Success { get; init; }
    public string Status { get; init; } = string.Empty;
    public string Message { get; init; } = string.Empty;
    public DateTimeOffset Timestamp { get; init; }
    public string Environment { get; init; } = string.Empty;
    public string Version { get; init; } = string.Empty;
}
