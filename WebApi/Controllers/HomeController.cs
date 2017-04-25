using GraphData.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace WebApi.Controllers
{
    public class HomeController : Controller
    {
        public async Task<ActionResult> Index()
        {
            var NavContext = new NavigationContext();
            ViewBag.Title = "Home Page";

            long t = NavContext.Pages.Count(new BsonDocument());
            //var visitsbyCountry = await NavContext.Pages.Aggregate()
            //    .Match("{ \"Atm_Country\" : { $in: [\"ES\", \"FR\", \"GB\", \"RU\", \"AD\", \"DE\", \"US\"] } }")
            //    .Group<ProjectionVisitCountry>("{ _id: '$Atm_Country', Count: { $sum: 1 } }")
            //    .ToListAsync();

            var model = new IndexModel
            {
                TotalObjects = t
                //VisistByCountry = visitsbyCountry
            };

            return View(model);
        }


    }
}
