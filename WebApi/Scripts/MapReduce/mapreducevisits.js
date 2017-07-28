
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
    //load("/Users/Usuario/Documents/Visual Studio 2017/Projects/GraphData/WebApi/Scripts/MapReduce/mapreducevisits.js")
    var i = 0;
    var nv = 0;
    var aux = undefined;
    var campaux;
    var reducedObject = {
        atmid: keys,
        natural_visits: 0,
        //google_visits: 1,
        alx_visits:0,
        npages: 0,
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
                isvisit: true,
                iscampaignvisit: false
            };

            //primera iteracio
            if (campaux == undefined) {
                if (value.campaign != undefined && value.campaign != '' && value.campaign != null) {
                    visit.iscampaignvisit = true;
                    reducedObject.alx_visits++;
                }
            }

            //visita de només una plana
            if (vals.length == 1) {
                reducedObject.npages = 1;
                reducedObject.natural_visits++;
                reducedObject.visits.push(visit);
                return reducedObject;
            } else {
                //multiples planes, averigüem quines són visita
                //aux undefinided =  primera plana
                if (aux != undefined) {
                    var insdate = new Date(value.insertdate);
                    //var auxD = new ISODate(aux);
                    //var t1 = Math.abs((insdate.getTime() - aux.getTime()));
                    //var diffMinutes = Math.ceil(t1 / (1000 * 60));
                    //visit.t1 = diffMinutes;
                    visit.t = Math.round((insdate.getTime() - aux.getTime()) / 60000);
                    // visita a 30 minuts
                    if (visit.t >= 30) {
                        visit.isvisit = true;
                        nv++;
                        if (value.campaign != undefined && value.campaign != '' && value.campaign != null) {
                            visit.iscampaignvisit = true;
                            reducedObject.alx_visits++;
                        }
                    } else {
                        //si encara que no haginn passat 30 minuts es produeix un canvi de source (en aquesta cas de ALX) comptem nova visita                                                
                        if (value.campaign != undefined && value.campaign != '' && value.campaign != null) {
                            visit.iscampaignvisit = true;
                        }

                        if (visit.iscampaignvisit == true && (campaux != value.campaign)) {
                            visit.isvisit = true;
                            nv++;
                            reducedObject.alx_visits++;
                        }
                        else {
                            visit.isvisit = false;
                        }
                    }

                } else {
                    nv++;
                }

                reducedObject.visits.push(visit);
                i++;
                aux = new Date(value.insertdate);
                campaux = value.campaign; 

            }
        }
    });
    reducedObject.natural_visits = nv;
    reducedObject.npages = i;
    return reducedObject;
};

db.Navigation.mapReduce(
    mapFunction1,
    reduceFunction2,
    {
        out: "map_reduce_TVisits2015",
        query: { Insertdate: { $gt: ISODate('2015-10-01T00:00:00.000Z'), $lte: ISODate('2016-01-01T00:00:00.000Z') } },
        sort: { Insertdate: 1 },
        verbose: true
    }
)