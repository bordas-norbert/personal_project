﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Data;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(BackendDbContext))]
    partial class BackendDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("backend.Controllers.Models.Addresses", b =>
                {
                    b.Property<int>("Address_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Address_id"), 1L, 1);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Client_id")
                        .HasColumnType("int");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<string>("Street")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Address_id");

                    b.HasIndex("Client_id");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("backend.Controllers.Models.Clients", b =>
                {
                    b.Property<int>("Client_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Client_id"), 1L, 1);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Client_id");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("backend.Controllers.Models.Addresses", b =>
                {
                    b.HasOne("backend.Controllers.Models.Clients", "Client")
                        .WithMany("Addresses")
                        .HasForeignKey("Client_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");
                });

            modelBuilder.Entity("backend.Controllers.Models.Clients", b =>
                {
                    b.Navigation("Addresses");
                });
#pragma warning restore 612, 618
        }
    }
}
