document.addEventListener("DOMContentLoaded", function () {
  let ticker = 'XOM';
  fetch(`/api/data/${ticker}`)
  .then(response => response.json())
  .then(data => {
    const [{ ticker, date, open }] = data;
    const tickerNames = Object.keys(data);
    
    const tickerData = {};
    for (const tickerName of tickerNames) {
      tickerData[tickerName] = data[tickerName].map((row) => ({ date: row.date, open: row.open }));
    };
    
    const traces = [];
    for (const tickerName of tickerNames) {
      traces.push({
        x: tickerData[tickerName].map((row) => row.date),
        y: tickerData[tickerName].map((row) => row.open),
        name: tickerName
      });
    };
    
    console.log(traces);
    console.log(tickerData);
    Plotly.newPlot('plotly-graph', traces);
    console.log('Graph created');
  })
  .catch(error => console.error('Error:', error));
});
 