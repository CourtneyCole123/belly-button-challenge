url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

d3.json(url).then(data => {
    data.ForEach(d => {
      console.log(d)
  })
}