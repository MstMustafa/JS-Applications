function getInfo() {

    const busStop = document.getElementById('stopId').value 
    const buses = document.getElementById('buses')
    const station = document.getElementById('stopName')

    const url = `http://localhost:3030/jsonstore/bus/businfo/${busStop} `

  

    fetch(url)
    .then(res => {

        buses.replaceChildren();

        if (!res.ok) {
            throw new Error('error');
        }

        if(res.status !== 200){
           return;
        }

        return res.json();
        
    })
    .then(
        
        data => Object.entries(data.buses).forEach( b=>{
        const liItem = document.createElement("li")
        station.textContent = data.name
        liItem.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`
        buses.appendChild(liItem)
    }))
    .catch(error => {
        
        station.textContent = "Error"
        
    });

    



}
