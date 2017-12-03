var myvar = ['alt-time','vel-time','pressure-time','temperature-time'];
$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?', function (data) {
for(i=0; i< myvar.length; i++){
    var alt_chart = Highcharts.chart(myvar[i], {
        chart: {
            //zoomType: 'x',
            //borderColor: 'rgba(0,0,0,0)',
            zoomType: 'x'
        },
        title: {
          text:null,
          style:{
            color: "#fff"
          }
        },
        xAxis: {
            type: 'datetime',
            style:{
              color: '#fff'
            }
        },
        yAxis: {
            title: {
                text: 'Exchange rate'
            },
            style:{
              color: '#fff'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'USD to EUR',
            data: data
        }]
    });
  }
});
