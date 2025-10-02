using ProductAPI.Models;

namespace ProductAPI.Services;

public interface IProductService
{
    Task<List<Product>> GetProductsAsync(decimal? minPrice = null, decimal? maxPrice = null, double? minPopularity = null, double? maxPopularity = null);
}
