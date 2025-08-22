using backend.WhereToGo.Api.Models;
using backend.WhereToGo.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.WhereToGo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlacesController : ControllerBase
    {
        private readonly IPlaceService _placeService;

        public PlacesController(IPlaceService placeService)
        {
            _placeService = placeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Place>>> GetAll()
        {
            var places = await _placeService.GetAllAsync();
            return Ok(places);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Place>> GetById(int id)
        {
            var place = await _placeService.GetByIdAsync(id);
            if (place == null)
            {
                return NotFound();
            }
            return Ok(place);
        }

        [HttpPost]
        public async Task<ActionResult<Place>> Create([FromBody] Place place)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var created = await _placeService.AddAsync(place);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var deleted = await _placeService.DeleteAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Place>> Update(int id, [FromBody] Place place)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updated = await _placeService.UpdateAsync(id, place);
            if (updated == null)
            {
                return NotFound();
            }
            return Ok(updated);
        }
    }
}
