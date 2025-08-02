using backend.WhereToGo.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.WhereToGo.Api.Data
{
    public class WhereToGoDbContext : DbContext
    {
        public WhereToGoDbContext(DbContextOptions<WhereToGoDbContext> options)
            : base(options)
        {
        }

        public DbSet<Place> Places => Set<Place>();
    }
}
