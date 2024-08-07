﻿using backend.Controllers.Models;
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
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
            
            var isExistingAlready = await _backendDbContext.Categories.FirstOrDefaultAsync(c => c.CategoryName == category.CategoryName);
            if (isExistingAlready != null)
                return Conflict("Category already existing");

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
        [HttpGet]
        [Route("{name}")]
        public async Task<IActionResult> GetCategoryId(string name)
        {
            var category = await _backendDbContext.Categories.FirstOrDefaultAsync(c => c.CategoryName == name);
            return Ok(category.CategoryId);
        }
    }
}
