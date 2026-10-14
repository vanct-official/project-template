namespace aspnet_backend.Models;

public class HealthStatusDto
{
    public string Status { get; set; } = "Healthy";
    public string Application { get; set; } = "aspnet-backend";
    public string Environment { get; set; } = string.Empty;
    public string Version { get; set; } = "1.0.0";
    public DateTimeOffset Timestamp { get; set; } = DateTimeOffset.UtcNow;
}
