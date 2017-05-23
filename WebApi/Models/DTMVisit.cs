using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GraphData.Models
{
    public class DTMVisit
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public Int64 OID { get; set; }
        public string VISITA_ID { get; set; }
        public string CAMPAIGN_ACTION_ID { get; set; }
        public string BOUND_ID { get; set; }
        public string ATM_ID { get; set; }
        public DateTime DATA_HORA_INICI { get; set; }
        public int DURACIO_VISITA { get; set; }
        public string TIPUS_VISITA { get; set; }
        public int NUM_PAGINES_VISITA { get; set; }
        public int PROFUNDITAT { get; set; }
        public string PAGINA_SORTIDA { get; set; }
        public string CATEGORIA { get; set; }
        public string DISPOSITIU { get; set; }
        public string NAVEGADOR_AGENT { get; set; }
        public string PAIS_VISITA { get; set; }
        public string NEW_VISITOR { get; set; }
        public string URL_PAGINA { get; set; }
        public string beginning_session { get; set; }
        public Int64 PAGINA_ID { get; set; }
        public string utmb { get; set; }
        public string utma { get; set; }
        public bool isLanding { get; set; }
        public string REGIO_VISITA { get; set; }
        public string SOURCE { get; set; }
        public bool VISITA_CAMPANYA { get; set; }
        public DateTime DATA_ULT_VISITA { get; set; }
        public string RESULTAT { get; set; }
        public string CAMPAIGN_ACTION_ID_SENSE_CLAUS { get; set; }
    }
}