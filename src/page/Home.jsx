import { useEffect, useState } from "react"
import axios from 'axios'

const Home=()=>{
    const url=import.meta.env.VITE_MY_URL
    const api=import.meta.env.VITE_MY_API_KEY
    console.log(url)
    console.log(api)
    const[location,setLocation]=useState("Kathmandu")
    const[result,setResult]=useState(null)


    const handlesearch=(e)=>{

        e.preventDefault();
        Getdata(location)


        
    }
    async function Getdata(city) {
        try{
            console.log("hello")
            const api1=await axios.get(`${url}/weather?q=${city}&appid=${api}&units=metric`)
            const data=api1.data
            setResult(data)
        }
        catch(error){
            console.log("error :",error)
        }
            
    }
    useEffect(()=>{
        Getdata(location)
    
    },[])


    return(
        <>
            <nav>
                <div className="heading">
                  <h2>Weather Checker </h2>
                 </div>
                <div className="search">
                    <input 
                    type="text"
                    placeholder="Search location"
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}
                     />
                     <button onClick={(e)=>handlesearch(e)}>Search</button>
                </div>
                </nav>
                

               <div className="result">
                {result ? (
                  <>
                  <img
                  src={`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`}
                alt="weather icon"
                  />
                   <h2>{result.name}</h2>
                   <p>{result.main.temp}°C</p>
                      <p>{result.weather[0].main}</p>
                    </>) 
                    : (
                        <p>Loading weather...</p>
                    )
                    }
            </div>




    
        
        </>
    )
}
export default Home;