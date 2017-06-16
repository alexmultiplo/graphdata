
var mapFunction1 = function () {
    var key = this.Atm_ID;
    var value = {
        url: this.Url,
        refurl: this.RefUrl,
        insertdate: this.Insertdate,
        campaign: this.Atm_Campaign
    };
    emit(key, value);
};

var reduceFunction0 = function (keys, vals) {
    var reducedVal = { atmid: keys, info: vals };
    return reducedVal;
};


var reduceFunction2 = function (keys, vals) {

    var i = 0;
    var aux = undefined;
    var reducedObject = {
        atmid: keys,
        visits: []
    };
    vals.forEach(function (value) {
        if (value.insertdate != null) {
            var visit = {
                url: value.url,
                refurl: value.refurl,
                insertdate: value.insertdate,
                campaign: value.campaign,
                t: 0,
                isvisit: true
            };
            if (vals.length == 1) {
                reducedObject.visits.push(visit);
                return reducedObject;
            } else {
                if (aux != undefined) {
                    var insdate = new Date(value.insertdate);
                    //var auxD = new ISODate(aux);

                    //var t1 = Math.abs((insdate.getTime() - aux.getTime()));
                    //var diffMinutes = Math.ceil(t1 / (1000 * 60));
                    //visit.t1 = diffMinutes;
                    visit.t = Math.round((insdate.getTime() - aux.getTime()) / 60000);
                    print(aux)
                    if (visit.t >= 30) { visit.isvisit = true } else { visit.isvisit = false }
                    // visita a 30 minuts
                }
                reducedObject.visits.push(visit);
                i++;
                aux = new Date(value.insertdate);

            }
        }
    });
    return reducedObject;
};

db.Navigation.mapReduce(
    mapFunction1,
    reduceFunction2,
    {
        out: "map_reduce_visitsTVisits",
        query: { Insertdate: { $gt: ISODate('2015-10-02T00:00:00.000Z'), $lte: ISODate('2015-12-02T00:00:00.000Z') } },
        sort: { Insertdate: 1 },
        verbose: true
    }
)