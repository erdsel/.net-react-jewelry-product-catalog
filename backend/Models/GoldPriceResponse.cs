namespace ProductAPI.Models;

public class GoldPriceResponse
{
    public string Metal { get; set; } = string.Empty;
    public string Currency { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal Price_Gram_24k { get; set; }
}
