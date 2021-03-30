
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const pLocation = document.querySelector('#location')
const pForecast = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    pLocation.textContent = 'Loading...'
    pForecast.textContent = ''

    fetch(`/weather?address=${location}`)
        .then((response) => {
            response.json()
            .then((data) => {
                if(data.error){
                    pLocation.textContent = data.error
                }else{
                    pLocation.textContent = data.location
                    pForecast.textContent = data.forecast
                }
            })
        })
})
