using aspnet_backend.Data;
using aspnet_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace aspnet_backend.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class SampleController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public SampleController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<List<SampleItemResponse>>), StatusCodes.Status200OK)]
    public async Task<ActionResult<ApiResponse<List<SampleItemResponse>>>> GetAllAsync()
    {
        var records = await _dbContext.SampleRecords
            .OrderBy(record => record.CreatedAtUtc)
            .Select(record => new SampleItemResponse
            {
                Id = record.Id.ToString(),
                Title = record.Title,
                Description = record.Description,
                CreatedAtUtc = record.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(ApiResponse<List<SampleItemResponse>>.CreateSuccess("Sample records retrieved successfully", records));
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ApiResponse<SampleItemResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ApiResponse<SampleItemResponse>>> GetByIdAsync(Guid id)
    {
        var record = await _dbContext.SampleRecords
            .Where(item => item.Id == id)
            .Select(item => new SampleItemResponse
            {
                Id = item.Id.ToString(),
                Title = item.Title,
                Description = item.Description,
                CreatedAtUtc = item.CreatedAtUtc
            })
            .FirstOrDefaultAsync();

        if (record is null)
        {
            return NotFound(ApiResponse<SampleItemResponse>.CreateFailure("Sample record was not found."));
        }

        return Ok(ApiResponse<SampleItemResponse>.CreateSuccess("Sample record retrieved successfully", record));
    }

    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<SampleItemResponse>), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ApiResponse<SampleItemResponse>>> CreateAsync([FromBody] CreateSampleRequest request)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var entity = new SampleRecord
        {
            Id = Guid.NewGuid(),
            Title = request.Title.Trim(),
            Description = request.Description?.Trim(),
            CreatedAtUtc = DateTimeOffset.UtcNow
        };

        _dbContext.SampleRecords.Add(entity);
        await _dbContext.SaveChangesAsync();

        var response = new SampleItemResponse
        {
            Id = entity.Id.ToString(),
            Title = entity.Title,
            Description = entity.Description,
            CreatedAtUtc = entity.CreatedAtUtc
        };

        return CreatedAtAction(nameof(GetByIdAsync), new { id = entity.Id, version = "1.0" }, ApiResponse<SampleItemResponse>.CreateSuccess("Sample record created successfully", response));
    }
}
