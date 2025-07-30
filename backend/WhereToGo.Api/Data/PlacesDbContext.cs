using Microsoft.EntityFrameworkCore;
using backend.WhereToGo.Api.Models;

namespace backend.WhereToGo.Api.Data
{
    public class PlacesDbContext : DbContext
    {
        public PlacesDbContext(DbContextOptions<PlacesDbContext> options) 
            : base(options) { }

        public DbSet<Place> Places => Set<Place>();
    }
}
