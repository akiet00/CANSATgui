/*
GOAL: Responsible for plotting and updating various parameters of our GUI
--
KNOWN ISSUES: Currently, we are using a dummy JSON file to plots. In the real scenario
we should figure out how to plot data using serial data stream.
*/

var myvar = ['alt-time','vel-time','pressure-time','temperature-time'];

Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

for(i=0; i< myvar.length; i++){
Highcharts.chart(myvar[i], {
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
            load: function (){
                /* Instead of generating random variables like below
                /  we can feed the serial values into here and output
                /  the plot here
                */
                // update chart in 1sec interval
                var series = this.series[0];
                setInterval(function () {
                    var x = new Date().getTime(), // get current time
                        y = Math.random();
                    series.addPoint([x, y], true, true);
                }, 1000);
            }
        }
    },
    title: {
        text:null
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: 'Random Value'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
        }
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: 'Random data',
        data: (function () {
            // generate an array of random data
            let data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: Math.random()
                });
            }
            return data;
        }())
    }]
});
}
