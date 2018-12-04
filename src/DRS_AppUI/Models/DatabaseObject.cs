using LiteDB;
using Newtonsoft.Json;

namespace DRS_AppUI.Models
{
    public class DatabaseObject
    {
        [JsonIgnore]
        [BsonId]
        public ObjectId DatabaseId { get; set; }
    }
}