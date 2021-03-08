const API_ADDRESS = "http://IP:8000/getsensordata";

function get_data(){
  console.log('Loading data...')
  $.getJSON( API_ADDRESS, function( data ) {
    console.log('Data ready');
    var items = [];
    var values = [];

    $.each( data, function( key, val ) {
      items.push(`<p>${key}: ${val}</p>`);
      values.push(val);
    });

    var time = new Date();
		Plotly.extendTraces('chart', {
      x: [[time]],
      y: [[values[0]]]
    }, [0]);

		Plotly.extendTraces('chart', {
      x: [[time]],
      y: [[values[1]]]
    }, [1]);
    var date = new Date();
    items.push('<p>'+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() +'</p>');
      
    $("#data").html(items.join(""));
  });
}

var time = new Date();

var trace1 = {
  x: [time],
  y: [],
  name: 'Temperature',
  fill: 'tonexty',
  type: 'scatter'
};

var trace2 = {
  x: [time],
  y: [],
  xaxis: 'x2',
  yaxis: 'y2',
  name: 'Humidity',
  fill: 'tonexty',
  type: 'scatter'
};

var toPlot = [trace1, trace2];

var layout = {
  grid: {rows: 2, columns: 1, pattern: 'independent'},
};

Plotly.newPlot('chart', toPlot, layout);

setTimeout(function run(){
  get_data();
  setTimeout(run, 1000);
},1000);