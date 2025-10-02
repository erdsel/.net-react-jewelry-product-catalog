using ProductAPI.Models;
using System.Text.Json;

namespace ProductAPI.Services;

public class ProductService : IProductService
{
    private readonly IGoldPriceService _goldPriceService;
    private readonly ILogger<ProductService> _logger;
    private readonly string _dataFilePath;

    public ProductService(IGoldPriceService goldPriceService, ILogger<ProductService> logger, IWebHostEnvironment env)
    {
        _goldPriceService = goldPriceService;
        _logger = logger;
        _dataFilePath = Path.Combine(env.ContentRootPath, "Data", "products.json");
    }

    public async Task<List<Product>> GetProductsAsync(decimal? minPrice = null, decimal? maxPrice = null, double? minPopularity = null, double? maxPopularity = null)
    {
        var goldPrice = await _goldPriceService.GetGoldPricePerGramAsync();

        var jsonData = await File.ReadAllTextAsync(_dataFilePath);
        var productDataList = JsonSerializer.Deserialize<List<ProductData>>(jsonData, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        }) ?? new List<ProductData>();

        var products = productDataList.Select(pd => new Product
        {
            Name = pd.Name,
            PopularityScore = pd.PopularityScore,
            Weight = pd.Weight,
            Images = pd.Images,
            Price = CalculatePrice(pd.PopularityScore, pd.Weight, goldPrice),
            Rating = ConvertPopularityToRating(pd.PopularityScore)
        }).ToList();

        // Apply filters
        if (minPrice.HasValue)
            products = products.Where(p => p.Price >= minPrice.Value).ToList();

        if (maxPrice.HasValue)
            products = products.Where(p => p.Price <= maxPrice.Value).ToList();

        if (minPopularity.HasValue)
            products = products.Where(p => p.PopularityScore >= minPopularity.Value).ToList();

        if (maxPopularity.HasValue)
            products = products.Where(p => p.PopularityScore <= maxPopularity.Value).ToList();

        _logger.LogInformation($"Returning {products.Count} products");
        return products;
    }

    private decimal CalculatePrice(double popularityScore, double weight, decimal goldPrice)
    {
        // Price = (popularityScore + 1) * weight * goldPrice
        var price = (decimal)(popularityScore + 1) * (decimal)weight * goldPrice;
        return Math.Round(price, 2);
    }

    private double ConvertPopularityToRating(double popularityScore)
    {
        // Convert 0-1 popularity score to 0-5 rating with 1 decimal place
        var rating = popularityScore * 5;
        return Math.Round(rating, 1);
    }
}
