﻿using Newtonsoft.Json;
using System;

namespace DRS_AppUI.Models
{
    public class ShrunkUrl : DatabaseObject
    {
        [JsonProperty("target")]
        public string Target { get; set; }

        [JsonProperty("shrunkPath")]
        public string ShrunkPath { get; set; }

        [JsonProperty("createdTimestamp")]
        public DateTime CreatedTimestamp { get; set; }
    }
}