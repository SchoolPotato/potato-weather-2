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
                    // console.log(error);
                }
            )
    }, [])

    const currentLabels = ()=>{
        let string = "";
        for(let i = 0; i < weather.properties.periods.length; i+=2){
            (i !== 0) ? string = string + ",'" + weather.properties.periods[i].name + "'" : string = string + "'" + weather.properties.periods[i].name + "'";
        }
        // console.log(string);
        return string;
    }

    const currentData = ()=>{
        let string = "";
        for(let i = 0; i < weather.properties.periods.length; i+=2){
            (i !== 0) ? string = string + "," + weather.properties.periods[i].temperature : string = string + weather.properties.periods[i].temperature; 
        }
        // console.log(string);
        return string;
    }

    const followingData = ()=>{
        let string = "";
        for(let i = 1; i < weather.properties.periods.length; i+=2){
            (i !== 1) ? string = string + "," + weather.properties.periods[i].temperature : string = string + weather.properties.periods[i].temperature; 
        }
        // console.log(string);
        return string;
    }

    const currentWeather = ()=>{
        let weatherTypesObject = {};
        let weatherTypesCount = "";
        let weatherTypes = "";

        for(let i = 0; i<weather.properties.periods.length; i++){
            let tempString = weather.properties.periods[i].shortForecast;
            if (!weatherTypesObject[tempString]){
                weatherTypesObject[tempString] = 0;
            }
            weatherTypesObject[tempString]++
        }
        
         for (let type in weatherTypesObject) {
            weatherTypesCount = weatherTypesCount + weatherTypesObject[type] + ",";
            weatherTypes = weatherTypes + "'" + type + "',";
        }

        weatherTypesCount = weatherTypesCount.substring(0, weatherTypesCount.length-1);
        weatherTypes = weatherTypes.substring(0, weatherTypes.length-1);
        return [weatherTypes, weatherTypesCount, weatherTypesObject];
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
            <div className="graphs">
                <h1 id="header">This Week's Temperatures</h1>
                {/*Days*/}
                <img id="graph" src={`https://quickchart.io/chart?c={type:'line',data:{labels:[${currentLabels()}],datasets:[{label:'Nights',data:[${followingData()}]},{label: 'Days',data:[${currentData()}]}]}}`} alt=""></img>

                {/*<hr />*/}
                <h1 id="header" className="header2">Weather</h1>
                <div id="info">
                    <div id="forecasts">
                        {weather.properties.periods.map((item)=>{
                            let forecast = "forecast"
                            if(item.number % 2 !== 0){
                                forecast += " zebra";
                            }
                            return <h3 key={item.number} id={item.number} className={forecast} >{item.name}: {item.shortForecast}</h3>
                        })}
                    </div>
                    <img id="graph2" src={`https://quickchart.io/chart?c={type:'pie',data:{labels:[${currentWeather()[0]}], datasets:[{data:[${currentWeather()[1]}], borderWidth:0}]}}`} alt=""></img>
                </div>

                {/*Nights
                <img id="temperature" src={`https://quickchart.io/chart?c={type:'line',data:{labels:[${nightLabels()}],datasets:[{label:'Nights',data:[${nightData()}]}]}}`} alt=""></img>*/}
            </div>
        )
    }
}

export default Graph
