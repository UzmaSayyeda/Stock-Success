
document.addEventListener("DOMContentLoaded", function () 
{
  /// to populate dropdown menu 
  var selectElement1 = document.getElementById('ticker-select1');
  var selectElement2 = document.getElementById('ticker-select2');
  var selectChart = document.getElementById('user-input')
  /// fetch from tickers
  selectElement1.addEventListener('change', updateGraph);
  selectElement2.addEventListener('change', updateGraph);
  selectChart.addEventListener('change', updateGraph);

  /// function to update graph
  function updateGraph() {

    let ticker1 = selectElement1.value;
    let ticker2 = selectElement2.value;
    let chartType = selectChart.value;



    /// fetch from first ticker
    fetch(`/api/data/${ticker1}`).then(response => response.json()).then(data1 => {
      
      /// then fetch from second ticker
      fetch(`/api/data/${ticker2}`).then(response => response.json()).then(data2 =>{

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
          }
        ];
        
        /**----------------------------------------------------------------------------------- **/
        
        // layout for time series / line plot
        var layoutLine = {
          title: 'Time Series',

          xaxis: {

            range: ["2018-10-01", "2022-12-31"],
            rangeselector: {

              buttons: [
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
                { step: 'all',
                label: '5 Years'}
              ]
            },

            type: 'Date'
          },
          
          yaxis: {
            autorange: true,
            type: 'linear'
          }
        };
          
          
        /**----------------------------------------------------------------------------------------------- **/
          
        var config = { responsive: true }
          
        // fetching data for candlestick graph
          
        let traces2 =[
          
          {
            x: data1.map(row => row.Date),
            close: data1.map(row => row.Close),
            high: data1.map(row => row.High),
            low: data1.map(row => row.Low),
            open: data1.map(row => row.Open),
            name: ticker1,
              
            // customize colors
            increasing: { line: { color: '#2279b5' } },
            decreasing: { line: { color: '#ff7f0e' } },
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y'
          },
          {
            x: data2.map(row => row.Date),
            close: data2.map(row => row.Close),
            high: data2.map(row => row.High),
            low: data2.map(row => row.Low),
            open: data2.map(row => row.Open),
            name: ticker2,
              
            // customize colors
              
            increasing: { line: { color: '#2279b5' } },
            decreasing: { line: { color: '#ff7f0e' } },
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y'
          }
        ]
          
        // console.log(high)
        
        /**------------------------------------------------------------------------------------------------**/
        
        // layout for candle stick graph.
          
        var layoutView2 = {
          
          margin: 
          {
            r: 10,
            t: 25,
            b: 40,
            l: 60
          },
          
          title: "Candle stick",
          xaxis:
          {
            autorange: true,
            type: "date",
            title: "Date",
            range: ["2018-10-01", "2022-12-31"],
            rangeselector:
            {
              buttons: [
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
                { step: 'all',
                label: '5 Years'}
              ]
            },
          },
          yaxis: {
            autorange: true
          }
        }
          
        /**------------------------------------------------------------------------ */
        // view -3 plot
        // let data3 = [
        //   {
        //     z : [[data1], [data2]],
        //     type : 'heatmap'
        //   }
        // ]
          
        let traces3 =
        [
          {
            x: data1.map(row => row.Date),
            close: data1.map(row => row.Close),
            high: data1.map(row => row.High),
            low: data1.map(row => row.Low),
            open: data1.map(row => row.Open),
            name: ticker1,
            
            // customize colors
            increasing: { line: { color: '#2279b5' } },
            decreasing: { line: { color: '#ff7f0e' } },
            type: 'ohlc',
            xaxis: 'x',
            yaxis: 'y'
          },
          {
            x: data2.map(row => row.Date),
            close: data2.map(row => row.Close),
            high: data2.map(row => row.High),
            low: data2.map(row => row.Low),
            open: data2.map(row => row.Open),
            name: ticker2,
            
            // customize colors
            increasing: { line: { color: '#2279b5' } },
            decreasing: { line: { color: '#ff7f0e' } },
            type: 'ohlc',
            xaxis: 'x',
            yaxis: 'y'
          }
        ]
          
        // layout for view 3
          
        var layoutView3 = {
          margin: {
            r: 10,
            t: 25,
            b: 40,
            l: 60
          },
          title: "OHLC",
          xaxis: {
            autorange: true,
            type: "date",
            title: "Date",
            rangeselector: {
              buttons: [
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
                { step: 'all',
                label: '5 Years'}
              ]
            },
          },



          yaxis: {
            autorange: true
          }
        };







        // display graphs.

        switch(chartType)
        {
          case 'view-1':
            Plotly.newPlot('plotly-chart', traces, layoutLine, config);
            break;
          case 'view-2':
            Plotly.newPlot('plotly-chart', traces2, layoutView2, config);
            break;
          case 'view-3':
            Plotly.newPlot('plotly-chart', traces3, layoutView3, config);
            break;
          default:
            console.error("Unknown chart type: " + chartType);
        };
        
          
        
      }).catch(error => console.error('Error:', error));
    })
  };
  
  

  /// to update graph when page is loaded
    
  selectElement1.dispatchEvent(new Event('change'));
  selectElement2.dispatchEvent(new Event('change'));
    
  
  
});


/**------------------------------------------------*/
// switch between modes

const checkbox = document.getElementById('checkbox')
checkbox.addEventListener('change', () => {
  document.body.classList.toggle('dark-theme')
})

/**------------------------------------------------*/

// animated header
let animation = anime({
  targets : '.header',
  translateX : [-500, 0],
  scale : [0,1],
  delay : anime.stagger(200),
  duration : 4000,
  easing : 'easeInOutCirc',
  autoplay : true
})



// Updating database, button 
document.querySelector('#updateButton').addEventListener('click', function() {  // When the button is clicked the function is called


const loadingText = document.getElementById('loading'); // Get the loading block from the HTML
loadingText.style.display = 'block'; // Show the loading block


  fetch('/update_db')
      .then(response => response.text()) // Get the data as a text
      .then(data => {
        alert(data); // Shows the popup with the result from Flask
        loadingText.style.display = 'none';}) // Hide the loading block
        .catch(error => console.error('error',error));




});


