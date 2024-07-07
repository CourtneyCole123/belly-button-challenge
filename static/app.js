// Build the metadata panel
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

d3.json(url).then(CreateMetaDataAndPanel)
d3.json(url).then(CreateCharts)
d3.json(url).then(CreateDropdown)
    
function CreateMetaDataAndPanel(data){
  // get the metadata field
  let MetaData = data.metadata;

  // Filter the metadata for the object with the desired sample number
  let filteredData = MetaData.filter(FilteredData)

    // Use d3 to select the panel with id of `#sample-metadata`
  let panel = d3.selectAll('#sample-metadata')

    // Fill in the panel
  filteredData.forEach(data =>{
      let labels = Object.keys(data)
      let items = Object.values(data)
      panel.append('p').text(`${labels.slice(0,1)}: ${items.slice(0,1)}`)
      panel.append('p').text(`${labels.slice(1,2)}: ${items.slice(1,2)}`)
      panel.append('p').text(`${labels.slice(2,3)}: ${items.slice(2,3)}`)
      panel.append('p').text(`${labels.slice(3,4)}: ${items.slice(3,4)}`)
      panel.append('p').text(`${labels.slice(4,5)}: ${items.slice(4,5)}`)
      panel.append('p').text(`${labels.slice(5,6)}: ${items.slice(5,6)}`)  
    })
}
    
function CreateCharts(data){
// Create Arrays
  let SampleIDs = []
  let SampleValues = []

// Get the Sample Data
  let SampleData = data.samples

// Filter Sample Data to Selected Filter Value
  let samplelabels = SampleData.filter(FilteredSample)

// Get the Label Data
  let labels = samplelabels[0].otu_ids

// Get the Sample Values from the Label Data
  let samplevalues = samplelabels[0].sample_values

// Get the Values from the Sample Values
  let samplevalues1 = Object.values(samplevalues)

// Push Sample Values to SampleValues Array
    SampleValues.push(`${samplevalues1}`)

// Loop through each label and push the label name to SampleIDs Array
    labels.forEach(label =>{
      SampleIDs.push(`OTU ${label} `)
  })

// Slice and Sort the Data in each Array   
  let slicedsamplesvalue = samplevalues1.slice(0,10).reverse()
  let slicedsampleids = SampleIDs.slice(0,10).reverse()

// Create Bar Chart
  let chartdata = [{
  type: 'bar',
  x: slicedsamplesvalue,
  y: slicedsampleids,
  orientation: 'h'
}];

// Create Bar Chart Layout   
  let chartlayout = {
    title: 'Top 10 Bacteria Cultures Found',
    xaxis: {
      title: "Number of Bacteria"
    }
  }

// Plot Bar Chart
    Plotly.newPlot('bar', chartdata, chartlayout);

// Create Bubble Chart
  let trace1 = {
    x: labels,
    y: samplevalues,
    mode: 'markers',
    marker: {
      size: samplevalues,
      color: labels
    },
  };
  
  let bubbledata = [trace1];

// Create Bubble Chart Layout
  let bubblelayout = {
    title: 'Bacteria Cultures Per Sample',
    showlegend: false,
    yaxis:{
      title: "Number of Bacteria"
    },
    xaxis:{
      title: "OTU ID"
    }
  };

// Plot Bubble Chart
  Plotly.newPlot('bubble', bubbledata, bubblelayout);
}

//Create Dropdown Menu
function CreateDropdown(data){
  
  // Grab the list of ID names
  let names = data.names;

  // Select the dropdown with id of "#selDataset"
  let dropdown = d3.select("#selDataSet");

  // List sample ids to populate the select options
  Object.values(names).forEach(item => {
  dropdown.append('option').text(item)
  });
}

// Create Filter Functions
function FilteredData(data){
  return data.id == 940
}

function FilteredSample(data){
  return data.id == 940
  }