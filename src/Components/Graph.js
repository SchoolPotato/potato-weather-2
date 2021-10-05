import { useState, useEffect } from 'react';
//import config from '../Utils/config';

// const url = `api.openweathermap.org/data/2.5/weather?q=${config.cityName},${config.stateCode}&appid=${config.apiKey}`;
const url = `https://api.weather.gov/gridpoints/PSR/159,68/forecast`

const Graph = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isError, setIsError ] = useState(false);
    const [ weather, setWeather ] = useState({});

    useEffect(()=>{
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setWeather(result);
                    setIsLoading(false);
                },
                (error) => {
                    setIsLoading(false);
                    setIsError(true);
                    console.log(error);
                }
            )
    }, [])

    const labels = ()=>{
        let string = "";
        for(let i = 1; i < weather.properties.periods.length; i++){
            (i !== 0) ? string = string + "," + weather.properties.periods[i].name : string = string + weather.properties.periods[i].name;
        }
        console.log(string);
        console.log(weather.properties.periods);
        return string;
    }
    const data = ()=>{
        let string = "";
        for(let i = 0; i < weather.properties.periods.length; i++){
            (i !== 0) ? string = string + "," + weather.properties.periods[i].temperature : string = string + weather.properties.periods[i].temperature; 
        }
        console.log(string);
        return string;
    }

    if(isError){
        return(
            <>
                you broke it how could you
            </>
        )
    } else if(isLoading) {
        return( 
            <>
                Loading...
            </>
        )
    } else {
        return (
            <div>
                <img src={`https://quickchart.io/chart?c={type:'line',data:{labels:[${labels()}],datasets:[{label:'Days',data:[${data()}]}]}}`} alt=""></img>
            </div>
        )
    }
}

export default Graph
