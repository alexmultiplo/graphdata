using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GraphData.Models
{
    public class Navigation
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public Int64 OID { get; set; }
        public string NowTs { get; set; }
        public string Atm_VisitId { get; set; }
        public bool IsVisit { get; set; }
        public string Atm_Campaign_Country { get; set; }
        public string Atm_Event { get; set; }
        public string Atm_Source { get; set; }
        public string Atm_Region { get; set; }
        public string Atm_City { get; set; }
        public string Atm_PostalCode { get; set; }
        public string Atm_Country { get; set; }
        public string Atm_Array { get; set; }
        public bool IsLanding { get; set; }
        public string Atm_UserEmail { get; set; }
        public string S { get; set; }
        public string M { get; set; }
        public string H { get; set; }
        public string Idsite { get; set; }
        public string Action_Name { get; set; }
        public string Viewts { get; set; }
        public string Idts { get; set; }
        public string Atm_Category { get; set; }
        public string UtmCTR { get; set; }
        public string UtmCMD { get; set; }
        public string UtmCCN { get; set; }
        public string UtmCSR { get; set; }
        public string Utm_Medium { get; set; }
        public string Utm_Content { get; set; }
        public string Utm_Source { get; set; }
        public string Utm_Campaign { get; set; }
        public string Utmv { get; set; }
        public string Atm_Language { get; set; }
        public string Culture { get; set; }
        public string Utm_Term { get; set; }
        public string Utmz { get; set; }
        public string Utmc { get; set; }
        public string Utmb { get; set; }
        public string Utma { get; set; }
        public string Atm_Campaign { get; set; }
        public string Atm_ID { get; set; }
        public string Agent { get; set; }
        public string IP { get; set; }
        public DateTime Insertdate { get; set; }
        public string RefUrl { get; set; }
        public string Url { get; set; }
    }
}