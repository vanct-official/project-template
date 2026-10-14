using System.ComponentModel.DataAnnotations;

namespace aspnet_backend.Models;

public class CreateSampleRequest
{
    [Required]
    [StringLength(200, MinimumLength = 3)]
    public string Title { get; set; } = string.Empty;

    [StringLength(2000)]
    public string? Description { get; set; }
}
