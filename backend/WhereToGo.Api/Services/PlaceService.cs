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
        Task<bool> DeleteAsync(int id);
        Task<Place?> UpdateAsync(int id, Place place);
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

            await _dbContext.Places.AddAsync(place);
            await _dbContext.SaveChangesAsync();
            return place;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var place = await _dbContext.Places.FindAsync(id);
            if (place == null) return false;

            _dbContext.Places.Remove(place);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<Place?> UpdateAsync(int id, Place place)
        {
            var existing = await _dbContext.Places.FindAsync(id);
            if (existing == null) return null;

            existing.Name = place.Name;
            existing.City = place.City;
            existing.Country = place.Country;
            existing.Address = place.Address;
            existing.Description = place.Description;
            existing.Latitude = place.Latitude;
            existing.Longitude = place.Longitude;
            existing.UpdatedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();
            return existing;
        }
    }
}
