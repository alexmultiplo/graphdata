using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GraphData.Models
{
    public class IndexModel
    {
        public long totalObjects { get; set; }

        public List<ProjectionKeyValue> VisistByCountry { get; set; }
    }
}