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
        

        /// defining traces for graph as an array of dictionaries
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
        
        
        
        Plotly.newPlot('plotly-graph', traces);
       

        /// just to check if data is being fetched
        // console.log(data.map(row => row.Date));
        // console.log(data.map(row => row.Open));




        


      })
      .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
  };

  /// to update graph when page is loaded
  // var event = new Event('change');
  selectElement1.dispatchEvent(new Event('change'));
  selectElement2.dispatchEvent(new Event('change'));




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
 