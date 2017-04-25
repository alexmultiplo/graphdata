using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GraphData.Models
{
    public class IndexModel
    {
        [DisplayFormat(DataFormatString = "{0:N0}")]
        public long TotalObjects { get; set; }

        public List<ProjectionKeyValue> VisistByCountry { get; set; }
    }
}