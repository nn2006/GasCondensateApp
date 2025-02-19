using Microsoft.AspNetCore.Mvc;
using GasCondensateApp.Data;
using GasCondensateApp.Models;
using Microsoft.EntityFrameworkCore;

namespace GasCondensateApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GasCondensateFieldsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GasCondensateFieldsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/GasCondensateFields
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GasCondensateField>>> GetGasCondensateFields()
        {
            return await _context.GasCondensateFields.ToListAsync();
        }

        // GET: api/GasCondensateFields/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GasCondensateField>> GetGasCondensateField(int id)
        {
            var field = await _context.GasCondensateFields.FindAsync(id);
            if (field == null) return NotFound();
            return field;
        }

        // POST: api/GasCondensateFields
        [HttpPost]
        public async Task<ActionResult<GasCondensateField>> PostGasCondensateField(GasCondensateField field)
        {
            _context.GasCondensateFields.Add(field);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetGasCondensateField), new { id = field.Id }, field);
        }

        // PUT: api/GasCondensateFields/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGasCondensateField(int id, GasCondensateField field)
        {
            if (id != field.Id) return BadRequest();
            _context.Entry(field).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/GasCondensateFields/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGasCondensateField(int id)
        {
            var field = await _context.GasCondensateFields.FindAsync(id);
            if (field == null) return NotFound();
            _context.GasCondensateFields.Remove(field);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}