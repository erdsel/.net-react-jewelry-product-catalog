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
        // Try multiple gold price sources
        decimal? price = null;

        // Try GoldAPI.io first (if configured)
        price = await TryGoldApiIo();
        if (price.HasValue) return price.Value;

        // Try metals-api.com as alternative
        price = await TryMetalsApi();
        if (price.HasValue) return price.Value;

        // Try free public API
        price = await TryGoldPriceOrg();
        if (price.HasValue) return price.Value;

        // Fallback to reasonable default price
        _logger.LogInformation("All gold price APIs unavailable, using fallback price");
        return 75m; // Updated fallback price (approx current gold price per gram)
    }

    private async Task<decimal?> TryGoldApiIo()
    {
        try
        {
            var apiKey = _configuration["GoldAPI:ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
            {
                _logger.LogInformation("GoldAPI key not configured, skipping");
                return null;
            }

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("x-access-token", apiKey);

            var response = await _httpClient.GetAsync("https://www.goldapi.io/api/XAU/USD");

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogWarning($"GoldAPI returned {response.StatusCode}");
                return null;
            }

            var content = await response.Content.ReadAsStringAsync();
            var goldPrice = JsonSerializer.Deserialize<GoldPriceResponse>(content, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (goldPrice != null && goldPrice.Price_Gram_24k > 0)
            {
                _logger.LogInformation($"Gold price from GoldAPI: ${goldPrice.Price_Gram_24k}/gram");
                return goldPrice.Price_Gram_24k;
            }

            return null;
        }
        catch (Exception ex)
        {
            _logger.LogDebug(ex, "GoldAPI failed");
            return null;
        }
    }

    private async Task<decimal?> TryMetalsApi()
    {
        try
        {
            // Free tier of metals-api.com - simple endpoint
            var response = await _httpClient.GetAsync("https://api.metalpriceapi.com/v1/latest?api_key=demo&base=USD&currencies=XAU");

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogDebug($"MetalsAPI returned {response.StatusCode}");
                return null;
            }

            var content = await response.Content.ReadAsStringAsync();
            var json = JsonDocument.Parse(content);

            if (json.RootElement.TryGetProperty("rates", out var rates) &&
                rates.TryGetProperty("XAU", out var xauRate))
            {
                // XAU is in troy ounces, convert to grams (1 troy oz = 31.1035 grams)
                var pricePerOunce = 1m / xauRate.GetDecimal();
                var pricePerGram = pricePerOunce / 31.1035m;

                _logger.LogInformation($"Gold price from MetalsAPI: ${pricePerGram:F2}/gram");
                return pricePerGram;
            }

            return null;
        }
        catch (Exception ex)
        {
            _logger.LogDebug(ex, "MetalsAPI failed");
            return null;
        }
    }

    private async Task<decimal?> TryGoldPriceOrg()
    {
        try
        {
            // goldprice.org free API
            _httpClient.DefaultRequestHeaders.Clear();
            var response = await _httpClient.GetAsync("https://data-asg.goldprice.org/dbXRates/USD");

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogDebug($"GoldPrice.org returned {response.StatusCode}");
                return null;
            }

            var content = await response.Content.ReadAsStringAsync();
            var json = JsonDocument.Parse(content);

            if (json.RootElement.TryGetProperty("items", out var items) &&
                items.GetArrayLength() > 0)
            {
                var firstItem = items[0];
                if (firstItem.TryGetProperty("xauPrice", out var xauPrice))
                {
                    var pricePerOunce = xauPrice.GetDecimal();
                    var pricePerGram = pricePerOunce / 31.1035m;

                    _logger.LogInformation($"Gold price from GoldPrice.org: ${pricePerGram:F2}/gram");
                    return pricePerGram;
                }
            }

            return null;
        }
        catch (Exception ex)
        {
            _logger.LogDebug(ex, "GoldPrice.org failed");
            return null;
        }
    }
}
