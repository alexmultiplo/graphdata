using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GraphData.Models
{

    public class ProjectionKeyValue
    {
        [BsonElement("_id")]
        public string Name { get; set; }

        public int Count { get; set; }
    }

    public class ProjectionKeyDateValue
    {
        [BsonElement("_id")]
        public DateTime Data { get; set; }

        public int Count { get; set; }
    }

    public class PagesCountry
    {
        public IEnumerable<ProjectionKeyValue> pagesCountry { get; set; }
    }

    public class PagesDay
    {
        public IEnumerable<ProjectionKeyDateValue> pagesDay { get; set; }
    }

    public class DailyStat
    {
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public int Total { get; set; }
    }


    public class DailyUserStat
    {
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public string User { get; set; }
    }

}