using Newtonsoft.Json;

namespace DRS_AppUI.Models
{
    public class ShrinkResponse
    {
        [JsonProperty("shrunkUrl")]
        public ShrunkUrl ShrunkUrl { get; set; }
    }
}