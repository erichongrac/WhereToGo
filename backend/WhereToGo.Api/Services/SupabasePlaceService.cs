using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using backend.WhereToGo.Api.Models;

namespace backend.WhereToGo.Api.Services
{
    public class SupabasePlaceService : IPlaceService
    {
        private readonly HttpClient _client;
        private readonly JsonSerializerOptions _jsonOptions = new() { PropertyNameCaseInsensitive = true };

        public SupabasePlaceService(HttpClient client)
        {
            _client = client;
            _client.BaseAddress = new Uri("https://xcmxqyrtbuvlpouuynnl.supabase.co/rest/v1/");
            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjbXhxeXJ0YnV2bHBvdXV5bm5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMTUxNTAsImV4cCI6MjA2OTU5MTE1MH0.tdGzduYF2RPTOzsJuvPKkLiTwZ1-wSEUKywflkAoz_M");
            _client.DefaultRequestHeaders.Add("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjbXhxeXJ0YnV2bHBvdXV5bm5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMTUxNTAsImV4cCI6MjA2OTU5MTE1MH0.tdGzduYF2RPTOzsJuvPKkLiTwZ1-wSEUKywflkAoz_M");
        }

        public async Task<IEnumerable<Place>> GetAllAsync()
        {
            var response = await _client.GetAsync("places?select=*");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<IEnumerable<Place>>(json, _jsonOptions)!;
        }

        public async Task<Place?> GetByIdAsync(int id)
        {
            var response = await _client.GetAsync($"places?id=eq.{id}&select=*");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            var places = JsonSerializer.Deserialize<List<Place>>(json, _jsonOptions);
            return places?.FirstOrDefault();
        }

        public async Task<Place> AddAsync(Place place)
        {
            // Prepare JSON body (exclude Id, CreatedAt, UpdatedAt - Supabase can handle defaults)
            var newPlace = new
            {
                place.Name,
                place.City,
                place.Country,
                place.Address,
                place.Description,
                place.Latitude,
                place.Longitude,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var content = new StringContent(JsonSerializer.Serialize(newPlace), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("places", content);
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            // Supabase returns an array of inserted rows
            var inserted = JsonSerializer.Deserialize<List<Place>>(json, _jsonOptions);
            return inserted!.First();
        }
    }
}
