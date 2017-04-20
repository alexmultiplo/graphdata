using GraphData.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApi.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/data")]
    public class ValuesController : ApiController
    {
        [HttpGet]
        [Route("pages")]
        public async Task<PagesCountry> GetPagesByCountry()
        {
            var NavContext = new NavigationContext();

            var visitsbyCountry = await NavContext.Pages.Aggregate()
                .Match(x => x.Insertdate >= Convert.ToDateTime("2015-10-01T00:00:00.000Z") && x.Insertdate <= Convert.ToDateTime("2015-10-30T00:00:00.000Z"))
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
        public async Task<PagesDay> GetPagesByDay()
        {
            var NavContext = new NavigationContext();

            //https://www.mongodb.com/presentations/results?page=1&search=Back%20to%20basics%20webinar

            //.Match("'Insertdate' : { $gte: ISODate('2015-10-01T00:00:00.000Z'), $lt: ISODate('2015-10-15T00:00:00.000Z')}"  )

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

            DateTime t0 = DateTime.Now.AddMonths(-18);
            DateTime t1 = DateTime.Now.AddMonths(-17);

            var visitsbyCountry = await NavContext.Pages.Aggregate()
            .Match(x => x.Insertdate >= Convert.ToDateTime("2015-10-01T00:00:00.000Z") && x.Insertdate <= Convert.ToDateTime("2015-10-30T00:00:00.000Z"))
            .Match("{ \"Atm_Country\" : \"ES\" }")
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
            .SortBy(x => x.Year).SortBy(x => x.Month).SortBy(x => x.Day)
            .ToListAsync();

            List<ProjectionKeyDateValue> pagesDate = new List<ProjectionKeyDateValue>();

            foreach (var item in visitsbyCountry)
            {
                DateTime dt = new DateTime(item.Year, item.Month, item.Day);
                ProjectionKeyDateValue pkdv = new ProjectionKeyDateValue()
                {
                    Data = new DateTime(item.Year, item.Month, item.Day),
                    Count = item.Total
                };
                pagesDate.Add(pkdv);
            }

            PagesDay pd = new PagesDay()
            {
                pagesDay = pagesDate
            };

            return pd;
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
