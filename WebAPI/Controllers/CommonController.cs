using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{

    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly PaymentDetailContext _context;

        public CommonController(PaymentDetailContext context)
        {
            _context = context;
        }

        [Route("api/GetCountries")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> GetCountries()
        {
            return await _context.Countries.ToListAsync();
        }
        [Route("api/GetStates")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<State>>> GetStates()
        {
            return await _context.States.ToListAsync();
        }
        [Route("api/GetCities")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<City>>> GetCities()
        {
            return await _context.Cities.ToListAsync();
        }
    }
}