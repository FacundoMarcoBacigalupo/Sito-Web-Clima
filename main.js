window.addEventListener('load', ()=> {
    let lon
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')  
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
    
    let pais = document.getElementById("pais")
    let ubicacion = document.getElementById('ubicacion')  
    let iconoAnimado = document.getElementById('icono-animado') 

    let vientoVelocidad = document.getElementById('viento-velocidad') 



    function kelvinToCentius(tempK) {
        return Math.round(tempK - 273.15)
    }



if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( posicion => {

        lon = posicion.coords.longitude
        lat = posicion.coords.latitude


        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6bffa96718465883b031a6c75c10e366`


        fetch(url)
            .then( response => response.json())
            .then( data => {


                let temp = kelvinToCentius(data.main.temp)
                temperaturaValor.textContent = `${temp} ° C`


                let desc = data.weather[0].main
                temperaturaDescripcion.textContent = desc.toUpperCase()

                pais.textContent = data.sys.country
                ubicacion.textContent = data.name

                vientoVelocidad.textContent = `${data.wind.speed} m/s`


                console.log(data.sys.country)
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                        iconoAnimado.src='./IconsAnimated/thunder.svg'
                        console.log('TORMENTA')
                    break;

                    case 'Drizzle':
                        iconoAnimado.src='./IconsAnimated/rainy-2.svg'
                        console.log('LLOVIZNA')
                    break;

                    case 'Rain':
                        iconoAnimado.src='./IconsAnimated/rainy-7.svg'
                        console.log('LLUVIA')
                    break;

                    case 'Snow':
                        iconoAnimado.src='./IconsAnimated/snowy-6.svg'
                        console.log('NIEVE')
                    break;    

                    case 'Clear':
                        iconoAnimado.src='./IconsAnimated/day.svg'
                        console.log('LIMPIO')
                    break;

                    case 'Atmosphere':
                        iconoAnimado.src='./IconsAnimated/weather.svg'
                        console.log('ATMOSFERA')
                    break; 

                    case 'Clouds':
                        iconoAnimado.src='./IconsAnimated/cloudy-day-1.svg'
                        console.log('NUBES')
                    break;
                }

            })

            .catch( error => {
                console.error(error)
            })
    })
}
})