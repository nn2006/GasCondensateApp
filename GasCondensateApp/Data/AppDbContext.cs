using Microsoft.EntityFrameworkCore;
using GasCondensateApp.Models;

namespace GasCondensateApp.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<GasCondensateField> GasCondensateFields { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}