#nullable enable
using System;
using System.Collections.Generic;

namespace backend.WhereToGo.Api.Models
{
    public class Place
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public required string City { get; set; }

        public required string Country { get; set; }

        public required string Address { get; set; }

        public string? Description { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Optional: to associate places with users (future feature)
        // public int? CreatedByUserId { get; set; }

        // Optional: a list of tags, if you want to categorize places
        // public List<Tag>? Tags { get; set; }

        // Optional: comments left by users
        // public List<Comment>? Comments { get; set; }
    }
}
