using backend.WhereToGo.Api.Data;
using backend.WhereToGo.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace backend.WhereToGo.Api.Services
{
    public interface IPlaceService
    {
        Task<IEnumerable<Place>> GetAllAsync();
        Task<Place?> GetByIdAsync(int id);
        Task<Place> AddAsync(Place place);
        // Add update/delete methods later
    }

    public class PlaceService : IPlaceService
    {
        private readonly WhereToGoDbContext _dbContext;

        public PlaceService(WhereToGoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Place>> GetAllAsync()
        {
            return await _dbContext.Places.AsNoTracking().ToListAsync();
        }

        public async Task<Place?> GetByIdAsync(int id)
        {
            return await _dbContext.Places.AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Place> AddAsync(Place place)
        {
            place.CreatedAt = DateTime.UtcNow;
            place.UpdatedAt = DateTime.UtcNow;

            _dbContext.Places.Add(place);
            await _dbContext.SaveChangesAsync();
            return place;
        }
    }
}
