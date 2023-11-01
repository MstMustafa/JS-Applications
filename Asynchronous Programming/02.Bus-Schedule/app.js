function solve() {

    let busID = 'depot'
    let stationName = document.querySelector('span.info')

    const bttnDepart = document.getElementById('depart')
    const arriveDepart = document.getElementById('arrive')

    function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${busID}`
          
        fetch(url).then(response => response.json())
        .then(data => {
            stationName.textContent = `Next stop ${data.name}`;
            busID = data.next;
          })
         .catch( stationName.textContent = `Error`) 

        

        bttnDepart.setAttribute('disabled' , true)
        arriveDepart.removeAttribute('disabled')


    }

    
    function arrive() {

        stationName.textContent = "Arriving at" + stationName.textContent.substring(9);
        bttnDepart.removeAttribute('disabled')
        arriveDepart.setAttribute('disabled' , true)
        

    }

    return {
        depart,
        arrive
    };
}

let result = solve();
