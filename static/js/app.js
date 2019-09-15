function buildMetadata(sample) {
  // Use `d3.json` to fetch the metadata for a sample
    d3.json(`/metadata/${sample}`).then((metaData) => {
    // Use d3 to select the panel with id of `#sample-metadata`
    metaDataPanel = d3.select("#samples-metadata");
    // Use `.html("") to clear any existing metadata
    metaDataPanel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
      Object.entries(metaData).forEach(([key, value]) => {
        metaDataPanel
          .append("div")
          .text(`${key}: ${value}`)
      });
    });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
};

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`samples/${sample}`).then((sampleData) => {
    // @TODO: Build a Bubble Chart using the sample data
    var xValues = sampleData.otu_ids;
    var yValues = sampleData.sample_values;
    var markerSize = sampleData.sample_values;
    var markerColor =  sampleData.otu_ids;
    var textValues = sampleData.otu_labels;

    var data = [{
      x: xValues,
      y: yValues,
      type: "scatter",
      mode: "markers",
      marker: {
        size: markerSize,
        color: markerColor
      },
      text: textValues
    }];

    Plotly.newPlot("bubble", data, {});
  });
};

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var sample_values = sampleData.sample_values.slice(0, 10);
    var otu_ids = sampleData.otu_ids.slice(0, 10);
    var otu_labels = sampleData.otu_labels.slice(0, 10);

    var data = [{
      values: sample_values,
      labels: otu_ids,
      type: "pie",
      hoverinfo: otu_labels
    }];
    Plotly.newPlot("pie", data, {})
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
