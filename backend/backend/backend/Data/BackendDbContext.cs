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
        public DbSet<Orders> Orders { get; set; }
        public DbSet<OrderProducts> OrderProducts { get; set; }

        public DbSet<Coupons> Coupons { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
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

            modelBuilder.Entity<Orders>().
                HasKey(o => o.OrderId);

            modelBuilder.Entity<Addresses>()
                .HasOne<Clients>()
                .WithMany()
                .HasForeignKey(a => a.Client_id);

            modelBuilder.Entity<OrderProducts>()
            .HasKey(op => new { op.OrderId, op.ProductId });

            modelBuilder.Entity<OrderProducts>()
            .HasKey(op => new { op.OrderId, op.ProductId });

            modelBuilder.Entity<Coupons>().HasKey(c => c.CouponId);
            modelBuilder.Entity<Coupons>().
                HasOne<Clients>()
                .WithMany()
                .HasForeignKey(a => a.ClientId);
        }

    }
}
