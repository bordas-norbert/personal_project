﻿using backend.Controllers.Models;
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController] //it won't be having any views
    [Route("api/[controller]")]
    public class CategoriesController : Controller
    {
        private readonly BackendDbContext _backendDbContext;
        public CategoriesController(BackendDbContext backendDbContext)
        {
            _backendDbContext = backendDbContext;
        }
        [HttpPost]
        public async Task<IActionResult> AddCategory([FromBody] Categories category)
        {
            await _backendDbContext.Categories.AddAsync(category);
            await _backendDbContext.SaveChangesAsync();
            return Ok(category);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _backendDbContext.Categories.ToListAsync();
            return Ok(categories);
        }
    }
}
