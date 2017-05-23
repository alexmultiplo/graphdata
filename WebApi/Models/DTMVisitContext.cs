using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


namespace GraphData.Models
{
    public class DTMVisitContext
    {
        public const string CONNECTION_STRING_NAME = "Navigation";
        public const string DATABASE_NAME = "ALX";
        public const string NAVIGATION_COLLECTION_NAME = "DTMVisit";

        // This is ok... Normally, they would be put into
        // an IoC container.
        private static readonly IMongoClient _client;
        private static readonly IMongoDatabase _database;

        static DTMVisitContext()
        {
            var csb = new SqlConnectionStringBuilder(ConfigurationManager.ConnectionStrings[CONNECTION_STRING_NAME].ConnectionString);
            _client = new MongoClient(csb.DataSource);
            _database = _client.GetDatabase(csb.InitialCatalog);
        }

        public IMongoClient Client
        {
            get { return _client; }
        }

        public IMongoCollection<DTMVisit> dtmVisits
        {
            get { return _database.GetCollection<DTMVisit>(NAVIGATION_COLLECTION_NAME); }
        }
    }
}