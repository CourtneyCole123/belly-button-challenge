// Build the metadata panel
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

d3.json(url).then(CreateMetaData)
d3.json(url).then(CreateCharts)
    
function CreateMetaData(data){
  // get the metadata field
  let MetaData = data.metadata;

  // Filter the metadata for the object with the desired sample number
  let filteredData = MetaData.filter(FilteredData)
  console.log(filteredData)

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
    }

    function FilteredData(data){
      return data.id == 940
    }

    function FilteredSample(data){
      return data.id == 940
    }
