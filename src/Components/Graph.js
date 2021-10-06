import { useState, useEffect } from 'react';
import Loading from './Loading';
import Error from './Error';
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

    const currentLabels = ()=>{
        let string = "";
        for(let i = 0; i < weather.properties.periods.length; i+=2){
            (i !== 0) ? string = string + ",'" + weather.properties.periods[i].name + "'" : string = string + "'" + weather.properties.periods[i].name + "'";
        }
        console.log(string);
        return string;
    }

    const currentData = ()=>{
        let string = "";
        for(let i = 0; i < weather.properties.periods.length; i+=2){
            (i !== 0) ? string = string + "," + weather.properties.periods[i].temperature : string = string + weather.properties.periods[i].temperature; 
        }
        console.log(string);
        return string;
    }

    const followingData = ()=>{
        let string = "";
        for(let i = 1; i < weather.properties.periods.length; i+=2){
            (i !== 1) ? string = string + "," + weather.properties.periods[i].temperature : string = string + weather.properties.periods[i].temperature; 
        }
        console.log(string);
        return string;
    }

    const currentWeather = ()=>{
        let string = "";
        for(let i = 1; i < weather.properties.periods.length; i+=2){
            (i !== 1) ? string = string + "," + weather.properties.periods[i].temperature : string = string + weather.properties.periods[i].temperature; 
        }
        console.log(weather.properties.periods);
        return string;
    }

    if(isError){
        return(
            <Error />
        )
    } else if(isLoading) {
        return( 
            <Loading />
        )
    } else {
        return (
            <div>
                <h1 id="header">This Week's Temperatures:</h1>
                {/*Days*/}
                <img id="graph" src={`https://quickchart.io/chart?c={type:'line',data:{labels:[${currentLabels()}],datasets:[{label:'Nights',data:[${followingData()}]},{label: 'Days',data:[${currentData()}]}]}}`} alt=""></img>

                <br />
                <h1 id="header">Weather:</h1>
                <img id="graph" src={`https://quickchart.io/chart?c={type:'pie',data:{labels:[${currentLabels()}], datasets:[{data:[${currentWeather()}], borderWidth:0, backgroundColor:['rgba(9, 53, 121, 1)','rgba(0, 86, 154, 1)','rgba(1, 116, 179, 1)','rgba(0, 147, 205, 1)','rgba(0, 165, 220, 1)','rgba(0, 212, 255, 1)','rgba(100, 231, 255, 1)']}]}}`} alt=""></img><br />


                {/*Nights
                <img id="temperature" src={`https://quickchart.io/chart?c={type:'line',data:{labels:[${nightLabels()}],datasets:[{label:'Nights',data:[${nightData()}]}]}}`} alt=""></img>*/}
            </div>
        )
    }
}

export default Graph
