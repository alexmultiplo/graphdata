var optspin = {
    lines: 11 // The number of lines to draw
    , length: 28 // The length of each line
    , width: 14 // The line thickness
    , radius: 43 // The radius of the inner circle
    , scale: 1.75 // Scales overall size of the spinner
    , corners: 0.9 // Corner roundness (0..1)
    , color: '#000' // #rgb or #rrggbb or array of colors
    , opacity: 0.35 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1.1 // Rounds per second
    , trail: 56 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '52%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'absolute' // Element positioning
}
var querystring //= '?start=2017-01-01&end=2017-04-30';
var host = 'http://localhost:6161/';

var nf = new Intl.NumberFormat(["es-ES"], {
    style: "decimal",
    maximumFractionDigit: 2
});

var _gadatasets = new Object();
var _gacampaigndatasets = new Object();
var tpags = 0; var ipags = 0;
var myLineChart;
var myLineChartPages;
var myLineChartUsers;

var PagesCountry = function () {

    var _data;
    var _gadata;
    var _datasets = new Object();

    var initBars = function () {
        var jsonAPICountry = host + 'api/data/pages/' + querystring;
        jQuery.getJSON(jsonAPICountry).done(function (data) {

            _datasets.labels = [];
            _datasets.pages = [];
            _datasets.bounces = [];

            $.each(data.pagesCountry, function (i, item) {
                _datasets.labels.push(item.Name);
                _datasets.pages.push(item.Count);
            });

            //_data.forEach(function (entry) {
            //    _datasets.labels.push(entry.Name);
            //    _datasets.pages.push(entry.Count);
            //});

            var ctx = document.getElementById("myBarChart");

            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    //labels: ["ES", "FR", "GB", "RU", "AD", "DE", "US"],
                    labels: _datasets.labels,
                    datasets: [{
                        label: '# of Pages',
                        data: _datasets.pages,// [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 171, 33, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 171, 33, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            //_data.forEach(function (entry) {
            //    var st = entry.date.toString();
            //    var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
            //    var dt = new Date(st.replace(pattern, '$3-$2-$1'));
            //    var dt = new Date(st);
            //    _datasets.labels.push(moment(dt).format("dd, DD MM YYYY").toString());
            //    _datasets.sessions.push(entry.metrics.sessions);
            //});


        }
        )
    };

    return {
        init: function () {
            initBars();
        }
    };

}();

var GADay = function () {

    var initGA = function () {
        var jsonGAAPIDays = host + 'api/data/ga-day/' + querystring;
        jQuery.getJSON(jsonGAAPIDays).done(function (data) {
            console.log(jsonGAAPIDays);
            _gadatasets.labels = [];
            _gadatasets.pages = [];
            _gadatasets.users = [];
            _gadatasets.sessions = [];

            $.each(data.rows, function (i, item) {
                _gadatasets.labels.push(item[0]);
                _gadatasets.pages.push(item[6]);
                _gadatasets.users.push(item[2]);
                _gadatasets.sessions.push(item[1]);
            });
        });
    };

    var ResetGA = function () {
        _gadatasets.labels = null;
        _gadatasets.pages = null;
        _gadatasets.users = null;
        _gadatasets.sessions = null;
    };

    return {
        init: function () {
            if (querystring != undefined) {
                initGA();
            }
        },

        reset: function () {
            ResetGA();
        }

    };
}();

var GACampaignDay = function () {

    var initGA = function () {
        var jsonGAAPIDays = host + 'api/data/ga-day/' + querystring + '&iscampaign=true';
        jQuery.getJSON(jsonGAAPIDays).done(function (data) {
            console.log(jsonGAAPIDays);
            _gacampaigndatasets.labels = [];
            _gacampaigndatasets.pages = [];
            _gacampaigndatasets.users = [];
            _gacampaigndatasets.sessions = [];

            $.each(data.rows, function (i, item) {
                _gacampaigndatasets.labels.push(item[0]);
                _gacampaigndatasets.pages.push(item[6]);
                _gacampaigndatasets.users.push(item[2]);
                _gacampaigndatasets.sessions.push(item[1]);
            });
        });
    };

    var ResetGA = function () {
        _gacampaigndatasets.labels = null;
        _gacampaigndatasets.pages = null;
        _gacampaigndatasets.users = null;
        _gacampaigndatasets.sessions = null;
    };

    return {
        init: function () {
            if (querystring != undefined) {
                initGA();
            }
        },

        reset: function () {
            ResetGA();
        }

    };
}();

var VisitsDayFull = function () {

    var initLines = function (iscampaign) {
        var _datasetsfull = new Object();
        var _datasetscamp = new Object();
        var _pags = 0; var _sess = 0; var _sessCamp = 0; var _visits = 0; var _visitscamp = 0;
        var _ipags = 0; var _isess = 0; var _isessCamp = 0; var _ivisits = 0; var _ivisitscamp = 0;
        var _labl = "Visites per dia"
        var _lablga = "Visites per dia GA"
        var _lablcamp = "Visites Campanya per dia";
        var _lablgacamp = "Visites Campanya per dia GA";
        //var sessGA = _gadatasets.sessions;
        //var sessGAcamp = _gacampaigndatasets.sessions;

        var jsonAPIDays = host + 'api/data/dtmvisits-day/' + querystring;
        var jsonAPIDaysCamp = host + 'api/data/dtmcampaignvisits-day/' + querystring;
        var jsonGAAPIDaysCamp = host + 'api/data/ga-day/' + querystring + '&iscampaign=true';
        jQuery.getJSON(jsonGAAPIDaysCamp).done(function (data) {
            console.log(jsonGAAPIDaysCamp);
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

            var jsonGAAPIDays = host + 'api/data/ga-day/' + querystring;
            jQuery.getJSON(jsonGAAPIDays).done(function (data) {
                console.log(jsonGAAPIDays);
                _gadatasets.labels = [];
                _gadatasets.pages = [];
                _gadatasets.users = [];
                _gadatasets.sessions = [];

                ipags = data.totalsForAllResults['ga:pageviews'];
                _pags = "Pàgines segons Google Analytics: " + nf.format(data.totalsForAllResults['ga:pageviews']);
                jQuery('#gapages').text(_pags);
                _isess = data.totalsForAllResults['ga:sessions'];
                _sess = "Sessions segons Google Analytics: " + nf.format(data.totalsForAllResults['ga:sessions']);
                jQuery('#gasessions').text(_sess);

                $.each(data.rows, function (i, item) {
                    _gadatasets.labels.push(item[0]);
                    _gadatasets.pages.push(item[6]);
                    _gadatasets.users.push(item[2]);
                    _gadatasets.sessions.push(item[1]);
                });

                jQuery.getJSON(jsonAPIDays).done(function (data) {
                    console.log(jsonAPIDays);
                    // Items
                    _datasetsfull.labels = [];
                    _datasetsfull.visits = [];
                    _datasetsfull.bounces = [];

                    _ivisits = data.Total;
                    _visits = "Visites segons Datamart ALX actual: " + nf.format(data.Total);
                    jQuery('#alxvisits').text(_visits);

                    if (_isess > 0 && _ivisits > 0) {
                        var concord = (_ivisits / _isess) * 100;
                        jQuery('#sessions_concorde').text(nf.format(concord) + '%');
                    }

                    $.each(data.visitsDay, function (i, item) {
                        _datasetsfull.labels.push(item.Data);
                        _datasetsfull.visits.push(item.Count);
                    });

                    jQuery.getJSON(jsonAPIDaysCamp).done(function (data) {
                        console.log(jsonAPIDaysCamp);
                        // Items
                        _datasetscamp.labels = [];
                        _datasetscamp.visits = [];
                        _datasetscamp.bounces = [];

                        _ivisitscamp = data.Total;
                        _visitscamp = "Visites de campanya segons Datamart ALX actual: " + nf.format(data.Total);
                        jQuery('#alxvisitscamp').text(_visitscamp);

                        if (_isessCamp > 0 && _ivisitscamp > 0) {
                            var concord = (_ivisitscamp / _isessCamp) * 100;
                            jQuery('#sessionscamp_concorde').text(nf.format(concord) + '%');
                        }

                        $.each(data.visitsDay, function (i, item) {
                            _datasetscamp.labels.push(item.Data);
                            _datasetscamp.visits.push(item.Count);
                        });

                        var data1 = {
                            labels: _datasetsfull.labels,  //["January", "February", "March", "April", "May", "June", "July", "August", "September"],
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
                                    data: _datasetsfull.visits,
                                    spanGaps: false,
                                },
                                {
                                    label: _lablcamp,
                                    fill: true,
                                    lineTension: 0.1,
                                    backgroundColor: "rgba(65, 230, 245,0.4)",
                                    borderColor: "rgba(65, 230, 245,1)",
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: "rgba(65, 230, 245,1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(65, 230, 245,1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    pointStyle: "triangle",
                                    data: _datasetscamp.visits,
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
                                    data: _gadatasets.sessions, //[65, 59, 80, 81, 56, 55, 40, 35, 65],
                                    spanGaps: false,
                                },
                                {
                                    label: _lablgacamp,
                                    fill: true,
                                    lineTension: 0.1,
                                    backgroundColor: "rgba(255,101,101,0.4)",
                                    borderColor: "rgba(245,135,65,1)",
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: "rgba(245,135,65,1)",
                                    pointBackgroundColor: "#eee",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(245,135,65,1)",
                                    pointHoverBorderColor: "rgba(245,135,65,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    pointStyle: "triangle",
                                    data: _gacampaigndatasets.sessions, //[65, 59, 80, 81, 56, 55, 40, 35, 65],
                                    spanGaps: false,
                                }
                            ]
                        };

                        var graf = "visitsfull";

                        var ctxl = document.getElementById(graf);
                        myLineChart = new Chart(ctxl, {
                            type: 'line',
                            data: data1
                            //options: options
                        });

                        PagesDay.update();

                        UsersDay.update();

                    });
                });
            });
        });

    };

    var Update = function () {

        var graf = "visitsfull";

        var ctxl = document.getElementById(graf);
        if (myLineChart != undefined) myLineChart.destroy();
        VisitsDayFull.init();


    };

    var ClearLines = function () {

        if (myLineChart != undefined) myLineChart.clear();
    };



    return {
        init: function () {
            initLines();
        },

        clear: function () {
            ClearLines();
        },

        update: function () {
            Update();
        }
    };

}();

var VisitsDay = function () {

    var _datasets = new Object();
    var initLines = function (iscampaign) {
        var jsonAPIDays = host + 'api/data/dtmvisits-day/' + querystring;
        var _labl = "Visites per dia"
        var _lablga = "Visites per dia GA"
        var sessGA = _gadatasets.sessions;
        if (iscampaign == true) {
            jsonAPIDays = host + 'api/data/dtmcampaignvisits-day/' + querystring;
            _labl = "Visites Campanya per dia";
            _lablga = "Visites Campanya per dia GA";
            sessGA = _gacampaigndatasets.sessions;
        }

        jQuery.getJSON(jsonAPIDays).done(function (data) {
            console.log(jsonAPIDays);
            // Items
            _datasets.labels = [];
            _datasets.visits = [];
            _datasets.bounces = [];

            $.each(data.visitsDay, function (i, item) {
                _datasets.labels.push(item.Data);
                _datasets.visits.push(item.Count);
            });

            var data1 = {
                labels: _datasets.labels,  //["January", "February", "March", "April", "May", "June", "July", "August", "September"],
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
                        data: _datasets.visits,
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
                        data: sessGA, //[65, 59, 80, 81, 56, 55, 40, 35, 65],
                        spanGaps: false,
                    }
                ]
            };

            var graf = "visits";
            if (iscampaign == true) { graf = "visitscampaign"; }

            var ctxl = document.getElementById(graf);
            var myLineChart = new Chart(ctxl, {
                type: 'line',
                data: data1
                //options: options
            });


        }
        )
    };

    var Update = function (iscampaign) {

        var graf = "visits";
        if (iscampaign == true) { graf = "visitscampaign"; }

        var ctxl = document.getElementById(graf);
        var myLineChart = new Chart(ctxl, {
            type: 'line',
        });
        myLineChart.destroy();
        VisitsDay.init(iscampaign);

    };

    var ClearLines = function (iscampaign) {
        var graf = "visits";
        if (iscampaign == true) { graf = "visitscampaign"; }

        var ctxl = document.getElementById(graf);
        var myLineChart = new Chart(ctxl, {
            type: 'line',
        });
        myLineChart.clear();
    };



    return {
        init: function (iscampaign) {
            initLines(iscampaign);
        },

        clear: function (iscampaign) {
            ClearLines(iscampaign);
        },

        update: function (iscampaign) {
            Update(iscampaign);
        }
    };

}();

var PagesDay = function () {

    var _datasets = new Object();
    var initLines = function () {
        var jsonAPIDays = host + 'api/data/pages-day/' + querystring;
        jQuery.getJSON(jsonAPIDays).done(function (data) {
            console.log(jsonAPIDays);
            // Items
            _datasets.labels = [];
            _datasets.pages = [];
            _datasets.bounces = [];
             var _ipags = data.Total;
            _tpags = "Pàgines segons Alexandria: " + nf.format(data.Total);
            jQuery('#alxpages').text(_tpags);

            if (ipags > 0 && _ipags > 0) {
                var concord = (_ipags / ipags) * 100;
                jQuery('#pages_concorde').text(nf.format(concord) + '%');
            }

            $.each(data.pagesDay, function (i, item) {
                _datasets.labels.push(item.Data);
                _datasets.pages.push(item.Count);
                //_datasets.bounces.push(item.Count * 0.5);
            });

            var data1 = {
                labels: _datasets.labels,  //["January", "February", "March", "April", "May", "June", "July", "August", "September"],
                datasets: [
                    {
                        label: "Pàgines per dia",
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
                        data: _datasets.pages, //[65, 59, 80, 81, 56, 55, 40, 35, 65],
                        spanGaps: false,
                    },
                    {
                        label: "Pàgines GA per dia",
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
                        data: _gadatasets.pages, //[65, 59, 80, 81, 56, 55, 40, 35, 65],
                        spanGaps: false,
                    }
                ]
            };

            var ctxl = document.getElementById("myLineChart");
            myLineChartPages = new Chart(ctxl, {
                type: 'line',
                data: data1
                //options: options
            });


        }
        )
    };

    var Update = function () {

        if (myLineChartPages != undefined) { myLineChartPages.destroy(); }
        PagesDay.init();
        
    };

    var ClearLines = function () {
        if (myLineChartPages != undefined) { myLineChartPages.clear(); }
    };



    return {
        init: function () {
            initLines();
        },

        clear: function () {
            ClearLines();
        },

        update: function () {
            Update();
        }
    };

}();

var UsersDay = function () {

    var _datasets = new Object();
    var initUsers = function () {

        var jsonAPIDays = host + 'api/data/users-day/' + querystring;
        jQuery.getJSON(jsonAPIDays).done(function (data) {
            console.log(jsonAPIDays);
            // Items
            _datasets.labels = [];
            _datasets.users = [];

            $.each(data.pagesDay, function (i, item) {
                _datasets.labels.push(item.Data);
                _datasets.users.push(item.Count);
            });

            var data1 = {
                labels: _datasets.labels,  //["January", "February", "March", "April", "May", "June", "July", "August", "September"],
                datasets: [
                    {
                        label: "Usuaris per dia",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,250,75,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,250,75,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,250,75,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: _datasets.users, //[65, 59, 80, 81, 56, 55, 40, 35, 65],
                        spanGaps: false,
                    },
                    {
                        label: "Usuaris GA per dia",
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
                        data: _gadatasets.users, //[65, 59, 80, 81, 56, 55, 40, 35, 65],
                        spanGaps: false,
                    }
                ]
            };

            var ctxl = document.getElementById("uniqueUsers");
            myLineChartUsers = new Chart(ctxl, {
                type: 'line',
                data: data1
                //options: options
            });


        }
        )
    };

    var Update = function () {

        if (myLineChartUsers != undefined) myLineChartUsers.destroy();
        UsersDay.init();

    };

    var ClearLines = function () {
        if (myLineChartUsers != undefined) myLineChartUsers.clear();
    };

    return {
        init: function () {

            var target = document.getElementById('usersday')
            var spinner = new Spinner(optspin).spin(target);
            initUsers();
            spinner.stop();
        },

        clear: function () {
            ClearLines();
        },

        update: function () {
            Update();
        }
    };
}();



jQuery(function () {
    // Call API on option button click
    jQuery('#apply-filter').on('click', function () {

        if (jQuery('#startDate').val() != undefined && jQuery('#endDate').val() != undefined) {
            querystring = '?start=' + jQuery('#startDate').val() + '&end=' + jQuery('#endDate').val();
            console.log(querystring);

            VisitsDayFull.clear();
            VisitsDayFull.update();

            //GADay.reset();
            //GADay.init();

            //GACampaignDay.reset();
            //GACampaignDay.init();


            UsersDay.clear();
            //UsersDay.update();

            PagesDay.clear();
            //PagesDay.update();
            //PagesDay.init();

            //VisitsDay.clear(false);
            //VisitsDay.update(false);
            //VisitsDay.init();

            //VisitsDay.clear(true);
            //VisitsDay.update(true);

            //UsersDay.init();
            //PagesCountry.init();
        }

    });
});

// Initialize when page loads
jQuery(function () {

    console.log('ready');

    if (getUrlParameter('start') != '' && getUrlParameter('end') != '') {
        querystring = '?start=' + getUrlParameter('start') + '&end=' + getUrlParameter('end');
    } else {
        querystring = '?start=2018-01-01&end=2018-12-31';
    }

    console.log(querystring);

    GADay.reset();
    //GADay.init();

    GACampaignDay.reset();
    //GACampaignDay.init();
    VisitsDayFull.init();
    //UsersDay.init();

    //PagesCountry.init();
//    PagesDay.init();

    //VisitsDay.init(false);
    //VisitsDay.init(true);

    //PagesCountry.init();


});
