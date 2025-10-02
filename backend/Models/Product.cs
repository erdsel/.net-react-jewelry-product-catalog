namespace ProductAPI.Models;

public class Product
{
    public string Name { get; set; } = string.Empty;
    public double PopularityScore { get; set; }
    public double Weight { get; set; }
    public Dictionary<string, string> Images { get; set; } = new();
    public decimal Price { get; set; }
    public double Rating { get; set; }
}

public class ProductData
{
    public string Name { get; set; } = string.Empty;
    public double PopularityScore { get; set; }
    public double Weight { get; set; }
    public Dictionary<string, string> Images { get; set; } = new();
}
