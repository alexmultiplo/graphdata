﻿
    var querystring //= '?start=2017-01-01&end=2017-04-30';
    var host = 'http://localhost:6161/'
    //var host = 'http://192.168.1.20:4400/'

    var _gadatasets = new Object();

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

                $.each(data.rows, function (i, item) {
                    _gadatasets.labels.push(item[0]);
                    _gadatasets.pages.push(item[6]);
                    _gadatasets.users.push(item[1]);
                });
            });
        };

        var ResetGA = function () {
            _gadatasets.labels = null;
            _gadatasets.pages = null;
            _gadatasets.users = null;
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
                var myLineChart = new Chart(ctxl, {
                    type: 'line',
                    data: data1
                    //options: options
                });


            }
            )
        };

        var Update = function () {
            var ctxl = document.getElementById("myLineChart");
            var myLineChart = new Chart(ctxl, {
                type: 'line',
            });
            myLineChart.destroy();
            //_datasets.labels = null;
            //_datasets.pages = null;
            //_datasets.bounces = null;
            PagesDay.init();

        };

        var ClearLines = function () {
            var ctxl = document.getElementById("myLineChart");
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
                var myLineChart = new Chart(ctxl, {
                    type: 'line',
                    data: data1
                    //options: options
                });


            }
            )
        };

        var Update = function () {
            var ctxl = document.getElementById("uniqueUsers");
            var myLineChart = new Chart(ctxl, {
                type: 'line',
            });
            myLineChart.destroy();
            UsersDay.init();

        };

        var ClearLines = function () {
            var ctxl = document.getElementById("uniqueUsers");
            var myLineChart = new Chart(ctxl, {
                type: 'line',
            });
            myLineChart.clear();
        };

        return {
            init: function () {

                initUsers();
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

            GADay.reset();
            GADay.init();
            PagesDay.clear();
            PagesDay.update();
            PagesDay.init();
            UsersDay.clear();
            UsersDay.update();
            UsersDay.init();
            PagesCountry.init();
        }

    });
});

// Initialize when page loads
jQuery(function () {
    console.log('ready');
    if (getUrlParameter('start') != '' && getUrlParameter('end') != '') {
        querystring = '?start=' + getUrlParameter('start') + '&end=' + getUrlParameter('end');
        console.log(querystring);
        GADay.init();
        PagesDay.init();
        UsersDay.init();
        PagesCountry.init();
    }


});
