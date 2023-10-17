
document.addEventListener("DOMContentLoaded", function () {


  /// to populate dropdown menu 
  var selectElement1 = document.getElementById('ticker-select1');
  var selectElement2 = document.getElementById('ticker-select2');


  /// fetch from tickers
  selectElement1.addEventListener('change', updateGraph);
  selectElement2.addEventListener('change', updateGraph); 


  /// function to update graph
  function updateGraph() {

    let ticker1 = selectElement1.value;
    let ticker2 = selectElement2.value; 

    /// fetch from first ticker
    fetch(`/api/data/${ticker1}`)
    .then(response => response.json())
    .then(data1 => {

      /// then fetch from second ticker
      fetch(`/api/data/${ticker2}`)
      .then(response => response.json())
      .then(data2 => {
      
       // defining traces for graph as an array of dictionaries
        const traces = [
          {
          x: data1.map(row => row.Date),
          y: data1.map(row => row.Open),
          name: ticker1
        },
        {
          x: data2.map(row => row.Date),
          y: data2.map(row => row.Open),
          name: ticker2
        }];

        var layoutLine = {
          title: 'Custom Range',
          xaxis: {
            range: ["2018-10-01", "2022-12-31"],
            rangeselector: {buttons: [
              {
                count: 1,
                label: '1m',
                step: 'month',
                stepmode: 'backward'
              },
              {
                count: 6,
                label: '6m',
                step: 'month',
                stepmode: 'backward'
              },
              {step: 'all'}
            ]},
            type: 'Date'
          },
          yaxis: {
            autorange: true,
           
            type: 'linear'
          }
        };

        let  traces2 = 
          [
            {
          x: [data1.map(row => row.Date)],
          close : [data1.map(row => row.Close)],
          high : [data1.map(row => row.High)],
          low : [data1.map(row => row.Low)],
          open : [data1.map(row => row.Open)],
          
          // cutomise colors
          increasing: {line: {color: 'black'}},
          decreasing: {line: {color: 'red'}},
          type : 'candlestick',
          xaxis : 'x',
          yaxis : 'y'
        },
        {
          x: [data2.map(row => row.Date)],
          close : [data2.map(row => row.Close)],
          high : [data2.map(row => row.High)],
          low : [data2.map(row => row.Low)],
          open : [data2.map(row => row.Open)],
          
          // cutomise colors
          increasing: {line: {color: 'black'}},
          decreasing: {line: {color: 'red'}},
          type : 'candlestick',
          xaxis : 'x',
          yaxis : 'y'
        }
      ]
      var trace2 = [traces2] 
       
        
        var layout = {
          margin :{
            r: 10, 
            t: 25, 
            b: 40, 
            l: 60
          },
          xaxis : {
            autorange: true,
            type : "date",
            title : "Date",
            range : ["2018-10-01", "2022-12-31"],
            rangeselector: {buttons: [
              {
                count: 1,
                label: '1m',
                step: 'month',
                stepmode: 'backward'
              },
              {
                count: 6,
                label: '6m',
                step: 'month',
                stepmode: 'backward'
              },
              {step: 'all'}
            ]},
          },
          yaxis : {
            autorange: true
          }
        }
        Plotly.newPlot('plotly-graph', traces, layoutLine);
        Plotly.newPlot('view-2', trace2, layout);

        // just to check if data is being fetched
        // console.log(data.map(row => row.Date));
        // console.log(data.map(row => row.Open));
        
          })
    .catch(error => console.error('Error:', error));
  })
  };
  /// to update graph when page is loaded
  // var event = new Event('change');
  selectElement1.dispatchEvent(new Event('change'));
  selectElement2.dispatchEvent(new Event('change'))

});



//     const [{ ticker, date, open }] = data;
//     const tickerNames = Object.keys(data);
    
//     const tickerData = {};
//     for (const tickerName of tickerNames) {
//       tickerData[tickerName] = data[tickerName].map((row) => ({ date: row.date, open: row.open }));
//     };
    
//     const traces = [];
//     for (const tickerName of tickerNames) {
//       traces.push({
//         x: tickerData[tickerName].map((row) => row.date),
//         y: tickerData[tickerName].map((row) => row.open),
//         name: tickerName
//       });
//     };
    
//     console.log(traces);
//     console.log(tickerData);
//     Plotly.newPlot('plotly-graph', traces);
//     console.log('Graph created');
//   })
//   .catch(error => console.error('Error:', error));
// });



// switch between modes

var toggle = document.getElementById('toggle');

toggle.onclick = function(){
  document.body.classList.toggle("dark-theme");
}