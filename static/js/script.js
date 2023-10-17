document.addEventListener("DOMContentLoaded", function () {



  var selectElemnt = document.getElementById('ticker-select');
  selectElemnt.addEventListener('change', function () {

    
    let ticker = this.value;
    fetch(`/api/data/${ticker}`)
    .then(response => response.json())
    .then(data => {


      const traces = [{
        x: data.map(row => row.Date),
        y: data.map(row => row.Open),
        name: ticker
      }];


      console.log(data.map(row => row.Date));
      console.log(data.map(row => row.Open));

      Plotly.newPlot('plotly-graph', traces);
      console.log('Graph created');


    })
    .catch(error => console.error('Error:', error));




  });

  var event = new Event('change');
  selectElemnt.dispatchEvent(event);



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
 