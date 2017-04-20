var PagesCountry = function () {

    //var jsonAPICountry = _basecharts.domain + '/data/GetPagesByCountry';
    var jsonAPICountry = 'http://localhost:6161/api/data/pages';
    //Console.log(jsonAPICountry);
    //Console.log(jsonAPICountry);
    var _data;
    var _gadata;
    var _datasets = new Object();

    var initBars = function () {
        jQuery.getJSON(jsonAPICountry).done(function (data) {

            // Items
            _data = data.pagesCountry;
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
            console.log(jsonAPICountry);
            initBars();
        }
    };
 
}();

var PagesDay = function () {

    //var jsonAPICountry = _basecharts.domain + '/data/GetPagesByCountry';
    var jsonAPIDays = 'http://localhost:6161/api/data/days';
    //Console.log(jsonAPICountry);
    //Console.log(jsonAPICountry);
    var _data;
    var _gadata;
    var _datasets = new Object();
    var _gadatasets = new Object();

    var initLines = function () {
        jQuery.getJSON(jsonAPIDays).done(function (data) {

            // Items
            _data = data.pagesDay;
            _datasets.labels = [];
            _datasets.pages = [];
            _datasets.bounces = [];

            $.each(data.pagesDay, function (i, item) {
                _datasets.labels.push(item.Data);
                _datasets.pages.push(item.Count);
                _datasets.bounces.push(item.Count * 0.5);
            });

            var data1 = {
                labels: _datasets.labels,  //["January", "February", "March", "April", "May", "June", "July", "August", "September"],
                datasets: [
                    {
                        label: "Pages by Day",
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
                        label: "Pages GA by Day",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(97,192,192,0.4)",
                        borderColor: "rgba(97,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(97,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(97,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: _datasets.bounces, //[65, 59, 80, 81, 56, 55, 40, 35, 65],
                        spanGaps: false,
                    }
                ]
            };

            var ctxl = document.getElementById("myLineChart");
            var myLineChart = new Chart(ctxl, {
                type: 'line',
                data: data1
                //options: options
            });


        }
        )
    };

    return {
        init: function () {
            console.log(jsonAPIDays);
            initLines();
        }
    };

}();

// Initialize when page loads
jQuery(function () {
    PagesDay.init();
    PagesCountry.init();
});