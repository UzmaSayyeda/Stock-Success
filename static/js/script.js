document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            // Extracting data for Plotly
            var Dates = [...new Set(data.map(d => d[0]))]; // Get unique 

            var Volume = dates.map(c => {
                // Get the last value of pm10 for a city
                var datesData = data.filter(d => d[0] === d);
                return datesData.length ? datesData[0][1] : null;
            });

            // Creating Plotly chart
          
            var trace1 = {
                type: 'bar',
                x: Dates,
                y: Volume,
                name: 'test'
            };
            var layout = {
                title: 'High test price',
                barmode: 'group'
            };
            Plotly.newPlot('plotly-graph', [trace1], layout);
        })
        .catch(error => console.error('Error:', error));
});
