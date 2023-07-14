// Initial page load
function init () {

    d3.json('samples.json').then((data) => {
    
    console.log(data);
    
    // Creating dropdown id menu
    let allIds = data.names;
    allIds.forEach((idNumber) => {d3.select('#selDataset').append('option').text(idNumber)});

    // Sending info to charts function to create inital charts
    charts(allIds[0])
    
    // End of block
    })

};


// Creating charts
function charts(queryID) {

    d3.json('samples.json').then((data) => {

    // Making queries
    var queryData = data.samples.filter(person => person.id == queryID)[0];
    var queryMetadata = data.metadata.filter(person => person.id == queryID)[0];

    // Printing metadata to page
    let metadataBox = d3.select('#sample-metadata').html("");
    for (key in queryMetadata) {
        metadataBox.append('h5').text(`${key}: ${queryMetadata[key]}`)
    };
    
    // Arrays of data values for charts
    var sampleValues = queryData.sample_values;
    var otuIds = queryData.otu_ids;
    var otuLabels = queryData.otu_labels;

    // Top 10 data values
    var top10SampleValues = sampleValues.slice(0, 10).reverse();
    var top10OtuIds = otuIds.slice(0, 10).reverse();
    var top10OtuLabes = otuLabels.slice(0, 10).reverse();

    // Creating Bar Chart
    let barChart = [{
        x: top10SampleValues,
        y: top10OtuIds.map(x => `OTU  ${x}`),
        text: top10OtuLabes,
        type: 'bar',
        orientation: 'h'
    }];
    Plotly.newPlot('bar', barChart);

    // Creating Bubble Chart
    let bubbleChart = [{
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
            size: sampleValues,
            color: otuIds,
            colorscale: 'Bluered'
        }
    }];

    let layout = {
        height: 600,
        width: 1000,
        xaxis: {
            title: 'OTU ID'
        }
    };
    Plotly.newPlot('bubble', bubbleChart, layout)

    // End of block
    })

};


// Updating plot
function optionChanged(id) {
    charts(id)
};


init();