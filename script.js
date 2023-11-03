const moviecontainer = document.querySelector('.container')
const seat = document.querySelectorAll('.row .seat:not(occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movie = document.getElementById('movie')

populateUI()

ticketprice = +movie.value //12



// Update price function
updateprice = () => {
    const selectedseats = document.querySelectorAll('.row .seat.selected')
    const noOfSelectedSeats = selectedseats.length
    const totalPrice = noOfSelectedSeats * ticketprice

    ///
    const seatIndex = [...selectedseats].map((index) => [...seat].indexOf(index))
    localStorage.setItem('Movieseat', JSON.stringify(seatIndex))
    ///
    count.innerText = noOfSelectedSeats
    total.innerText = `$${totalPrice}`
}

function selectedmovieName(index,value){
    localStorage.setItem('movieindex', index)
    localStorage.setItem('movieprice',value)
}

//populateUI 

function populateUI() {
    let selectedMovieSeat = JSON.parse(localStorage.getItem('Movieseat'))
    console.log(selectedMovieSeat);
    if (selectedMovieSeat != null && selectedMovieSeat.length > 0){
        seat.forEach((seats,index) => {
            if (selectedMovieSeat.indexOf(index) > -1){
                seats.classList.add('selected')
            }
        })
    }

    selectedmovieIndex = localStorage.getItem('movieindex')
    if (selectedmovieIndex !== null){
        console.log(movie.selectedIndex)
        movie.selectedIndex = selectedmovieIndex
    }

}



// Event Listeners

movie.addEventListener('change', (e) => {
    ticketprice = +e.target.value
    updateprice()
    selectedmovieName(e.target.selectedIndex, e.target.value)
})

moviecontainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && (!e.target.classList.contains('occupied'))){
        e.target.classList.toggle('selected')
        updateprice()
    }

})

updateprice()