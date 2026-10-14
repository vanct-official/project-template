using aspnet_backend.Models;
using aspnet_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace aspnet_backend.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class HealthController : ControllerBase
{
    private readonly IHealthService _healthService;

    public HealthController(IHealthService healthService)
    {
        _healthService = healthService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<HealthStatusDto>), StatusCodes.Status200OK)]
    public ActionResult<ApiResponse<HealthStatusDto>> Get()
    {
        var result = _healthService.GetSystemHealth();

        var payload = new HealthStatusDto
        {
            Status = result.Status,
            Application = "aspnet-backend",
            Environment = result.Environment,
            Version = result.Version,
            Timestamp = result.Timestamp
        };

        return Ok(ApiResponse<HealthStatusDto>.CreateSuccess("System is healthy and operational", payload));
    }
}
