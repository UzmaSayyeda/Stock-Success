
document.addEventListener("DOMContentLoaded", function () {
  /// to populate dropdown menu 
  var selectElement1 = document.getElementById('ticker-select1');
  var selectElement2 = document.getElementById('ticker-select2');
  var selectChart = document.getElementById('user-input')
  /// fetch from tickers
  selectElement1.addEventListener('change', updateGraph);
  selectElement2.addEventListener('change', updateGraph); 
  // selectChart.addEventListener('change')

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
  
        // plotly line/time series graph
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
        
  //--------------------------------------------------------------------------------//
        // layout for time series / line plot
        var layoutLine = {
  
          title: 'Time Series',
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
        var config = {responsive: true}
        
/**-------------------------------------------------------------------
 --------------------------------------------------------------------- **/

        // fetching data for candlestick graph
        let  traces2 = 
        //var traces2 = 
          [
            {
          x: data1.map(row => row.Date),
          close : data1.map(row => row.Close),
          high : data1.map(row => row.High),
          low : data1.map(row => row.Low),
          open : data1.map(row => row.Open),
          
          // customize colors
          increasing: {line: {color: '#2279b5'}},
          decreasing: {line: {color: '#ff7f0e'}},
          type : 'candlestick',
          xaxis : 'x',
          yaxis : 'y'
        },
        {
          x: data2.map(row => row.Date),
          close : data2.map(row => row.Close),
          high : data2.map(row => row.High),
          low : data2.map(row => row.Low),
          open : data2.map(row => row.Open),
          
          // customize colors
          increasing: {line: {color: '#2279b5'}},
          decreasing: {line: {color: '#ff7f0e'}},
          type : 'candlestick',
          xaxis : 'x',
          yaxis : 'y'
        }
      ]
      // console.log(high)
      
     
      //--------------------------------------------------------------------------------//

        // layout for candle stick graph.
        var layoutView2 = {
         
          margin :{
              r: 10, 
              t: 25, 
              b: 40, 
              l: 60
                },
          title : "Candle stick",
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
       
/**-------------------------------------------------------------------
 --------------------------------------------------------------------- */


      // view -3 plot

      // let data3 = [
      //   {
      //     z : [[data1], [data2]],
      //     type : 'heatmap'
      //   }
      // ]

      let  traces3 = 
      [
        {
        x: data1.map(row => row.Date),
        close : data1.map(row => row.Close),
        high : data1.map(row => row.High),
        low : data1.map(row => row.Low),
        open : data1.map(row => row.Open),
        
        // customize colors
        increasing: {line: {color: '#2279b5'}},
        decreasing: {line: {color: '#ff7f0e'}},
        type : 'ohlc',
        xaxis : 'x',
        yaxis : 'y'
      },
      {
        x: data2.map(row => row.Date),
        close : data2.map(row => row.Close),
        high : data2.map(row => row.High),
        low : data2.map(row => row.Low),
        open : data2.map(row => row.Open),
        
        // customize colors
        increasing: {line: {color: '#2279b5'}},
        decreasing: {line: {color: '#ff7f0e'}},
        type : 'ohlc',
        xaxis : 'x',
        yaxis : 'y'
      }
    ]

    var layoutView3 = {
         
      margin :{
          r: 10, 
          t: 25, 
          b: 40, 
          l: 60
      },
      title : "OHLC",
      xaxis : {
          autorange: true,
          type : "date",
          title : "Date",
       
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
       // display graphs.
   
    Plotly.newPlot('view-1', traces, layoutLine,config);
    Plotly.newPlot('view-2', traces2, layoutView2, config);
    Plotly.newPlot('view-3', traces3, layoutView3,config);

  



      
       
      


        

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
  // selectChart.dispatchEvent(new Event ('change'))


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

//-----------------------------------------------//

// anime.js
let animation = anime({
  targets : '.header',
  translateX: 250,
  delay : anime.stagger(200, {start:1000}),
  background : "#0000FF"
 
})





// typed.js header animation
// var typed = new Typed('#header', {
//   strings:['<h1>Stock Market Dashboard</h1>'],
//   typeSpeed : 60,
//   backSpeed : 20,
//   backDelay : 500,
//   contentType : 'html',
//   loop : true,
//   loopCount: 5,

// })

