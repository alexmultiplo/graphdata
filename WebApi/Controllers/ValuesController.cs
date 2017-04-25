using Google.Apis.Analytics.v3;
using Google.Apis.Analytics.v3.Data;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using GraphData.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApi.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/data")]
    public class ValuesController : ApiController
    {

        DateTime startDate = Convert.ToDateTime("2015-10-01T00:00:00.000Z");
        DateTime endDate = Convert.ToDateTime("2015-10-01T00:00:00.000Z");

        [HttpGet]
        [Route("pages")]
        public async Task<PagesCountry> GetPagesByCountry(DateTime? start, DateTime? end)
        {
            var NavContext = new NavigationContext();

            if (start == null) start = startDate;
            if (end == null) end = endDate;

            //.Match(x => x.Insertdate >= Convert.ToDateTime("2015-10-01T00:00:00.000Z") && x.Insertdate <= Convert.ToDateTime("2015-11-30T00:00:00.000Z"))

            var visitsbyCountry = await NavContext.Pages.Aggregate()
                .Match(x => x.Insertdate >= start && x.Insertdate <= end)
                .Match("{ \"Atm_Country\" : { $in: [\"ES\", \"FR\", \"GB\", \"RU\", \"AD\", \"DE\", \"US\"] } }")
                .Group<ProjectionKeyValue>("{ _id: '$Atm_Country', Count: { $sum: 1 } }")
                .SortBy(x => x.Name)
                .ToListAsync();

            PagesCountry pg = new PagesCountry()
            {
                pagesCountry = visitsbyCountry
            };

            return pg;
        }

        [HttpGet]
        [Route("days")]
        public async Task<PagesDay> GetPagesByDay(DateTime? start, DateTime? end)
        {
            var NavContext = new NavigationContext();

            //https://www.mongodb.com/presentations/results?page=1&search=Back%20to%20basics%20webinar

            //.Match("'Insertdate' : { $gte: ISODate('2015-10-01T00:00:00.000Z'), $lt: ISODate('2015-10-15T00:00:00.000Z')}"  )
            // .Match(x => x.Insertdate >= Convert.ToDateTime("2015-10-01T00:00:00.000Z") && x.Insertdate <= Convert.ToDateTime("2015-11-30T00:00:00.000Z"))

            //@"{
            //        url: '$Url',
            //        yearMonthDay: { $dateToString: { format: '%Y-%m-%d', date: '$Insertdate' } },
            //        time: { $dateToString: { format: '%H:%M:%S:%L', date: '$Insertdate' } }}")

            // .Match(x => x.Insertdate <= new DateTime(2015, 10, 1, 00,00,00, 00) && x.Insertdate >= new DateTime(2015, 10, 15, 00, 00, 00, 00))

            //var visitsbyCountry = await NavContext.Pages.Aggregate()
            //    .Match(x => x.Insertdate <= Convert.ToDateTime("2015-10-01T00:00:00.000Z") && x.Insertdate >= Convert.ToDateTime("2015 - 10 - 15T00: 00:00.000Z"))
            //    .Project(x => new { _id = x.Url, yearMonthDay = x.Insertdate.Date })
            //    .Group<ProjectionKeyValue>("{ _id: '$Atm_Country', Count: { $sum: 1 } }")
            //    .ToListAsync();

            if (start == null) start = startDate;
            if (end == null) end = endDate;

            var visitsbyCountry = await NavContext.Pages.Aggregate()
            .Match(x => x.Insertdate > start && x.Insertdate <= end)
            //.Match("{ \"Atm_Country\" : \"ES\" }")
            .Group(r => new { groupedYear = r.Insertdate.Year, groupedMonth = r.Insertdate.Month, groupedDay = r.Insertdate.Day }, g =>
               new
               {
                   Key = g.Key,
                   total = g.Count()
               })
            .Project(r => new DailyStat()
            {
                Day = r.Key.groupedDay,
                Month = r.Key.groupedMonth,
                Year = r.Key.groupedYear,
                //Data = new DateTime( r.Key.groupedYear, r.Key.groupedMonth, r.Key.groupedDay) ,
                Total = r.total
            })
            .SortBy(x => x.Day).SortBy(x => x.Month).SortBy(x => x.Year)
            .ToListAsync();

            List<ProjectionKeyDateValue> pagesDate = new List<ProjectionKeyDateValue>();

            DateTime aux = new DateTime(visitsbyCountry[0].Year, visitsbyCountry[0].Month, visitsbyCountry[0].Day); 
            foreach (var item in visitsbyCountry)
            {
                DateTime dt = new DateTime(item.Year, item.Month, item.Day);
                if (dt == aux.AddDays(1))
                {
                    ProjectionKeyDateValue pkdv = new ProjectionKeyDateValue()
                    {
                        Data = dt,
                        Count = item.Total
                    };
                    pagesDate.Add(pkdv);
                    aux = dt;
                }
                else
                {
                    int sparedays = dt.Subtract(aux).Days;
                    for (int i = 0; i < sparedays; i++)
                    {
                        DateTime newday = aux.AddDays(1);
                        aux = newday;
                        if (newday == dt)
                        {
                            ProjectionKeyDateValue pkdv = new ProjectionKeyDateValue()
                            {
                                Data = dt,
                                Count = item.Total
                            };
                            pagesDate.Add(pkdv);
                        }
                        else
                        {                           
                            ProjectionKeyDateValue pkdv = new ProjectionKeyDateValue()
                            {
                                Data = newday,
                                Count = 0
                            };
                            pagesDate.Add(pkdv);
                        }
                    }
                }
                
                
            }

            PagesDay pd = new PagesDay()
            {
                pagesDay = pagesDate.OrderBy(x => x.Data)
            };

            return pd;
        }

        [HttpGet]
        [Route("ga-days")]
        public GaData RunGAAPI(DateTime start, DateTime end)
        {
            //var _logger = EngineContext.Current.Resolve<ILogger>();
            string[] scopes =
                    new string[] {
             AnalyticsService.Scope.Analytics,                 // view and manage your Google Analytics data
             AnalyticsService.Scope.AnalyticsManageUsersReadonly};     // View Google Analytics data

            //string keyFilePath = System.IO.Path.Combine(System.Web.HttpContext.Current.ApplicationInstance.Server.MapPath("~/App_Data"), "Get Andorra Analytics Values-73dc38419daa.p12");
            string path = ConfigurationManager.AppSettings["p12key"];
            string keyFilePath;
            if (path == "localhost") keyFilePath = System.IO.Path.Combine(System.Web.HttpContext.Current.ApplicationInstance.Server.MapPath("~/App_Data"), "Get Andorra Analytics Values-73dc38419daa.p12");
            else keyFilePath = System.IO.Path.Combine(path, "Get Andorra Analytics Values-73dc38419daa.p12");
            
            //string keyFilePath = Path.Combine(_webHelper.GetApp_DataPath(), EngineContext.Current.Resolve<FC_Settings_GoogleAPI>().GA_ApiFilename);

            string serviceAccountEmail = "388321649537-h5stds7lmne7qhl5e3uct3jvfomcc058@developer.gserviceaccount.com";  // found in developer console

            //loading the Key file
            var certificate = new X509Certificate2(keyFilePath, "notasecret", X509KeyStorageFlags.Exportable);
            ServiceAccountCredential credential = new ServiceAccountCredential(new ServiceAccountCredential.Initializer(serviceAccountEmail)
            {
                Scopes = scopes
            }.FromCertificate(certificate));

            AnalyticsService service = new AnalyticsService(new BaseClientService.Initializer
            {
                HttpClientInitializer = credential,
                ApplicationName = "Get Andorra Analytics Values"// EngineContext.Current.Resolve<Nop.Core.Domain.FC.Settings.FC_Settings_GoogleAPI>().GA_ApiKey
            });

            DataResource.GaResource.GetRequest result = service.Data.Ga.Get("ga:70910396", start.ToString("yyyy-MM-dd"), end.ToString("yyyy-MM-dd"), "ga:sessions,ga:users,ga:newUsers,ga:bounces,ga:avgSessionDuration,ga:pageviews");

            //result.Dimensions = "ga:date,ga:countryIsoCode,ga:deviceCategory,ga:source,ga:medium,ga:campaign";
            result.Sort = "ga:date";
            result.Dimensions = "ga:date";
            //result.Filters = "ga:campaign==" + utm_name + ";ga:source==" + utm_source + ";ga:medium==" + utm_medium;
            result.MaxResults = 10000;
            //_logger.Information("FC_GA EXECUTE" + DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss"), null, null);
            return result.Execute();
        }


        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
