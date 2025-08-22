#nullable enable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.WhereToGo.Api.Models
{
    public class Place
    {
        [Column("id")] // Tell EF to map to lowercase "id"
        public int Id { get; set; }

        [Column("name")]
        public required string Name { get; set; }

        [Column("city")]
        public required string City { get; set; }

        [Column("country")]
        public required string Country { get; set; }

        [Column("address")]

        public required string Address { get; set; }
        [Column("description")]

        public string? Description { get; set; }

        [Column("latitude")]
        public double? Latitude { get; set; }

        [Column("longitude")]
        public double? Longitude { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Optional: to associate places with users (future feature)
        // public int? CreatedByUserId { get; set; }

        // Optional: a list of tags, if you want to categorize places
        // public List<Tag>? Tags { get; set; }

        // Optional: comments left by users
        // public List<Comment>? Comments { get; set; }
    }
}
