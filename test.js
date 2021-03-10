const API_ADDRESS = "http://213.146.32.128:8000/getsensordata";

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

    values.forEach( (item, key) => {
      Plotly.extendTraces('chart', {
        x: [[time]],
        y: [[item]]
      }, [key]);
    });

    items.push('<p>'+ time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() +'</p>');
      
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

var trace3 = {
  x: [time],
  y: [],
  xaxis: 'x3',
  yaxis: 'y3',
  name: 'Distance',
  fill: 'tonexty',
  type: 'scatter'
};

var toPlot = [trace1, trace2, trace3];

var layout = {
  grid: {rows: 3, columns: 1, pattern: 'independent'},
};

Plotly.newPlot('chart', toPlot, layout);

setTimeout(function run(){
  get_data();
  setTimeout(run, 100);
},100);