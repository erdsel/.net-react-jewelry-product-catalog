using ProductAPI.Models;
using System.Text.Json;

namespace ProductAPI.Services;

public class GoldPriceService : IGoldPriceService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly ILogger<GoldPriceService> _logger;

    public GoldPriceService(HttpClient httpClient, IConfiguration configuration, ILogger<GoldPriceService> logger)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<decimal> GetGoldPricePerGramAsync()
    {
        try
        {
            var apiKey = _configuration["GoldAPI:ApiKey"];
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("x-access-token", apiKey);

            var response = await _httpClient.GetAsync("https://www.goldapi.io/api/XAU/USD");
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var goldPrice = JsonSerializer.Deserialize<GoldPriceResponse>(content, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (goldPrice != null && goldPrice.Price_Gram_24k > 0)
            {
                _logger.LogInformation($"Gold price fetched: ${goldPrice.Price_Gram_24k}/gram");
                return goldPrice.Price_Gram_24k;
            }

            _logger.LogWarning("Invalid gold price response, using default");
            return 60m; // Fallback price
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching gold price");
            return 60m; // Fallback price
        }
    }
}
