var host = 'http://localhost:6161/';
var myLineChart;
var nf = new Intl.NumberFormat(["es-ES"], {
    style: "decimal",
    maximumFractionDigit: 2
});
var VisitsDayActionCompare = function () {

    var _gacampaigndatasets = new Object();
    var initLines = function (queryALX, queryGA) {
        var jsonAPIALX = host + 'api/data/dtmcampaignvisitsaction-day/' + queryALX;
        var jsonAPIGA = host + 'api/data/ga-day/' + queryGA;
        var _labl = "Visites per dia"
        var _lablga = "Visites per dia GA"
        var _pags = 0; var _sess = 0; var _sessCamp = 0; var _visits = 0; var _visitscamp = 0;
        var _ipags = 0; var _isess = 0; var _isessCamp = 0; var _ivisits = 0; var _ivisitscamp = 0;

        jQuery.getJSON(jsonAPIGA).done(function (data) {
            console.log(jsonAPIGA);
            _gacampaigndatasets.labels = [];
            _gacampaigndatasets.pages = [];
            _gacampaigndatasets.users = [];
            _gacampaigndatasets.sessions = [];


            _isessCamp = data.totalsForAllResults['ga:sessions'];
            _sessCamp = "Sessions de campanya segons Google Analytics: " + nf.format(data.totalsForAllResults['ga:sessions']);
            jQuery('#gasessionscamp').text(_sessCamp);

            $.each(data.rows, function (i, item) {
                _gacampaigndatasets.labels.push(item[0]);
                _gacampaigndatasets.pages.push(item[6]);
                _gacampaigndatasets.users.push(item[2]);
                _gacampaigndatasets.sessions.push(item[1]);
            });


            jQuery.getJSON(jsonAPIALX).done(function (data) {
                var _datasetsAlx = new Object();
                console.log(jsonAPIALX);
                // Items
                _datasetsAlx.labels = [];
                _datasetsAlx.visits = [];
                _datasetsAlx.bounces = [];

                $.each(data.visitsDay, function (i, item) {
                    _datasetsAlx.labels.push(item.Data);
                    _datasetsAlx.visits.push(item.Count);
                });

                _ivisitscamp = data.Total;
                _visitscamp = "Visites de campanya segons Datamart ALX actual: " + nf.format(data.Total);
                jQuery('#alxvisitscamp').text(_visitscamp);

                if (_isessCamp > 0 && _ivisitscamp > 0) {
                    var concord = (_ivisitscamp / _isessCamp) * 100;
                    jQuery('#sessionscamp_concorde').text(nf.format(concord) + '%');
                }

                var data1 = {
                    labels: _datasetsAlx.labels,  //["January", "February", "March", "April", "May", "June", "July", "August", "September"],
                    datasets: [
                        {
                            label: _labl,
                            fill: true,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: _datasetsAlx.visits,
                            spanGaps: false,
                        },
                        {
                            label: _lablga,
                            fill: true,
                            lineTension: 0.1,
                            backgroundColor: "rgba(255,101,101,0.4)",
                            borderColor: "rgba(255,51,51,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(255,51,51,1)",
                            pointBackgroundColor: "#eee",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(255,51,51,1)",
                            pointHoverBorderColor: "rgba(255,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: _gacampaigndatasets.sessions, //[65, 59, 80, 81, 56, 55, 40, 35, 65],
                            spanGaps: false,
                        }
                    ]
                };

                var graf = "visitsaction";

                var ctxl = document.getElementById(graf);
                myLineChart = new Chart(ctxl, {
                    type: 'line',
                    data: data1
                    //options: options
                });
            });

        }
        )
    };

    var Update = function (queryALX, queryGA) {

        if (myLineChart != undefined) { myLineChart.destroy(); }
        VisitsDayActionCompare.init(queryALX, queryGA);

    };

    var ClearLines = function () {

        if (myLineChart != undefined) { myLineChart.clear(); }
    };



    return {
        init: function (queryALX, queryGA) {
            initLines(queryALX, queryGA);
        },

        clear: function () {
            ClearLines();
        },

        update: function (queryALX, queryGA) {
            Update(queryALX, queryGA);
        }
    };

}();

jQuery(function () {

    jQuery('#action-filter').on('click', function () {

        if (jQuery('#startDate').val() != undefined && jQuery('#endDate').val() != undefined) {
            var queryALX = '?start=' + jQuery('#startDate').val() + '&end=' + jQuery('#endDate').val() + '&action=' + jQuery('#actionOid').val();
            var queryGA = '?start=' + jQuery('#startDate').val() + '&end=' + jQuery('#endDate').val() + '&campaign=' + jQuery('#utm_campaign').val() + '&source=' + jQuery('#utm_source').val() + '&medium=' + jQuery('#utm_medium').val();
            console.log(queryALX);
            console.log(queryGA);

            VisitsDayActionCompare.clear();
            VisitsDayActionCompare.update(queryALX, queryGA);

        }

    });

});
