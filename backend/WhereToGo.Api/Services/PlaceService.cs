using backend.WhereToGo.Api.Models;

namespace backend.WhereToGo.Api.Services
{
    public interface IPlaceService
    {
        Task<IEnumerable<Place>> GetAllAsync();
        Task<Place?> GetByIdAsync(int id);
        Task<Place> AddAsync(Place place);
        // add update/ delete method later
    }

    public class PlaceService : IPlaceService
    {
        private readonly List<Place> _places = new()
        {
            new Place
            {
                Id = 1,
                Name = "Central Perk Cafe",
                City = "New York",
                Country = "USA",
                Address = "90 Bedford St, New York, NY",
                Description = "Cozy cafe famous from Friends TV show",
                Latitude = 40.732013,
                Longitude = -74.005122,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Place
            {
                Id = 2,
                Name = "Le Petit Bistro",
                City = "Paris",
                Country = "France",
                Address = "15 Rue Cler, 75007 Paris",
                Description = "Authentic French bistro with a great wine selection",
                Latitude = 48.8556,
                Longitude = 2.3045,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        public Task<IEnumerable<Place>> GetAllAsync()
        {
            return Task.FromResult(_places.AsEnumerable());
        }

        public Task<Place?> GetByIdAsync(int id)
        {
            var place = _places.First(p => p.Id == id);
            return Task.FromResult(place);
        }

        public Task<Place> AddAsync(Place place)
        {
            var nextId = _places.Any() ? _places.Max(p => p.Id) + 1 : 1;
            place.Id = nextId;
            place.CreatedAt = DateTime.UtcNow;
            place.UpdatedAt = DateTime.UtcNow;
            _places.Add(place);
            return Task.FromResult(place);
        }

    }
}
