using backend.Controllers.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class BackendDbContext : DbContext
    {
        private readonly ILoggerFactory _loggerFactory;
        public BackendDbContext(DbContextOptions options, ILoggerFactory loggerFactory) : base(options)
        {
            _loggerFactory = loggerFactory;
        }

        public DbSet<Clients> Clients { get; set; }
        public DbSet<Addresses> Addresses { get; set; }

        public DbSet<Products> Products { get; set; }

        public DbSet<Categories> Categories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Enable logging to console
            optionsBuilder.UseLoggerFactory(_loggerFactory);

            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Clients>()
                .HasKey(c => c.ClientId);

            modelBuilder.Entity<Addresses>()
                .HasKey(a => a.Address_id);

            modelBuilder.Entity<Products>().
                HasKey(p => p.ProductId);

            modelBuilder.Entity<Addresses>()
                .HasOne<Clients>()
                .WithMany()
                .HasForeignKey(a => a.Client_id);

            base.OnModelCreating(modelBuilder);
        }

    }
}
