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
var querystring //= '?start=2018-01-01&end=2017-04-30';
var host = 'http://localhost:4040/';
//var host = 'http://192.168.1.20:4400/'

var nf = new Intl.NumberFormat(["es-ES"], {
    style: "decimal",
    maximumFractionDigit: 2
});


var VisitsActionDay = function () {

    var _datasets = new Object();
    var initLines = function (iscampaign) {
        var jsonAPIDays = host + 'api/data/aggvisits-day-action/' + querystring;
        var _labl = "Visites per dia"


        jQuery.getJSON(jsonAPIDays).done(function (data) {
            console.log(jsonAPIDays);
            // Items
            _datasets.labels = [];
            _datasets.visits = [];

            $.each(data.visitsDay, function (i, item) {
                _datasets.labels.push(item.day);
                _datasets.visits.push(item.count);
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
                    }
                ]
            };

            var graf = "visitsactionday";

            var ctxl = document.getElementById(graf);
            var myLineChart = new Chart(ctxl, {
                type: 'line',
                data: data1
                //options: options
            });


        }
        )
    };

    var Update = function () {
        var graf = "visitsactionday";

        var ctxl = document.getElementById(graf);
        var myLineChart = new Chart(ctxl, {
            type: 'line',
        });
        myLineChart.destroy();
        VisitsDay.init();

    };

    var ClearLines = function () {
        var graf = "visitsactionday";

        var ctxl = document.getElementById(graf);
        var myLineChart = new Chart(ctxl, {
            type: 'line',
        });
        myLineChart.clear();
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

jQuery(function () {

    console.log('action ready ready');

    if (getUrlParameter('start') != '' && getUrlParameter('end') != '') {
        querystring = '?start=' + getUrlParameter('start') + '&end=' + getUrlParameter('end') + '&campaign_action=' +getUrlParameter('campaign_action');
    } else {
        querystring = '?start=2017-09-31&end=2018-12-31&campaign_action=9ad8fb09-63df-4c6c-8585-15648e5ca5c4';
    }

    console.log(querystring);

    VisitsActionDay.init();

});