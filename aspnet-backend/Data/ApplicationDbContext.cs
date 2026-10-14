using aspnet_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnet_backend.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<SampleRecord> SampleRecords => Set<SampleRecord>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SampleRecord>(entity =>
        {
            entity.HasKey(record => record.Id);
            entity.Property(record => record.Title)
                .IsRequired()
                .HasMaxLength(200);
            entity.Property(record => record.Description)
                .HasMaxLength(2000);
            entity.Property(record => record.CreatedAtUtc)
                .HasDefaultValueSql("GETUTCDATE()");
        });

        base.OnModelCreating(modelBuilder);
    }
}
