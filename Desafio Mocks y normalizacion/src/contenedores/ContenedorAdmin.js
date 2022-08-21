fetch("./index.html")
.then(response => response.json())
.then(data => {
  console.log('Success:', data)
  body: JSON.stringify(jsonData)
})
  