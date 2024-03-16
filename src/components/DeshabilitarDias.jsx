"use client";
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { esES } from "@mui/x-date-pickers";
import es from "dayjs/locale/es";
const today = dayjs().add(1, "day");
const tomorrow2 = dayjs().add(3, "month");
import { Poppins } from "next/font/google";
const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const darkTheme = createTheme(
  {
    palette: {
      mode: "dark",
      primary: {
        main: "rgb(120, 120, 120)",
      },
    },
  },
  esES
);
function DeshabilitarDias() {
  const [dia, setDia] = useState(null);
  const [mes, setMes] = useState(null);
  const [year, setYear] = useState(null);
  const [barbero, setBarbero]= useState("Barbero1")
  const [error, setError]= useState(null)
  //Asigna los dias que no estan disponibles para seleccionar en el calendario
  function disableWeekends(date) {
    return date.$W === 1 || date.$W === 0;
  }
  const eliminaDia= async()=>{
    if(!error){
      const res= await fetch("/api/dayHandler", {
        method:"DELETE",
        body:JSON.stringify({
          year:year,
          mes:mes,
          dia:dia,
          barbero:barbero,
        }),
        headers:{
          "Content-Type":"/aplication/json"
        }
        
      })
      const data= await res.json()
      setError(data.error)
      setTimeout(()=>{
        setError(null)
      },1500)
    }
  }
  const habilitaDia= async()=>{
    if(!error){
      const res= await fetch("/api/dayHandler", {
        method:"POST",
        body:JSON.stringify({
          year:year,
          mes:mes,
          dia:dia,
          barbero:barbero,
        }),
        headers:{
          "Content-Type":"/aplication/json"
        }
      })
      const data= await res.json()
      setError(data.error)
      setTimeout(()=>{
        setError(null)
      },1500)
    }
  }
  const cambiaBarbero = (x, y) => {
    setBarbero(y);
  };
  return (
    <div style={{marginTop:"20px", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <div className="inp-container">
        <label>Barbero</label>
        <div className="selectors-container">
          <button
            type="button"
            style={{
              backgroundColor: barbero == "Barbero1" ? "#505050" : "#141414",
            }}
            onClick={() => {
              cambiaBarbero(1, "Barbero1");
            }}
            className={inter.className}
          >
            Barbero1
          </button>
          <button
            type="button"
            style={{
              backgroundColor: barbero == "Barbero2" ? "#505050" : "#141414",
            }}
            className={inter.className}
            onClick={() => {
              cambiaBarbero(2, "Barbero2");
            }}
          >
            Barbero2
          </button>
        </div>
      </div>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={
          esES.components.MuiLocalizationProvider.defaultProps.localeText
        }
        adapterLocale={es}
      >
        <ThemeProvider theme={darkTheme}>
          <StaticDatePicker
            className={`${inter.className}`}
            shouldDisableDate={disableWeekends}
            sx={{
              width: "300px",
              paddingBottom: "10px",
              boxShadow: "1px 1px 15px rgba(0, 0, 0, 0.801)",
              backgroundColor: "rgb(20, 20, 20)",
              borderRadius: "3px",
              ".MuiPickersToolbar-root": {
                color: "rgb(200, 200, 200)",
              },
              ".MuiDateCalendar-root": {
                color: "rgb(200, 200, 200)",
              },
              ".css-1mna49t-MuiButtonBase-root-MuiButton-root": {
                display: "none",
              },
            }}
            minDate={today}
            maxDate={tomorrow2}
            onChange={(e) => {
              setMes(e.$M + 1);
              setDia(e.$D);
              setYear(e.$y);
              setError(null)
            }}
          />
        </ThemeProvider>
      </LocalizationProvider>
      <button
        onClick={() => {
          eliminaDia();
        }}
        style={{cursor:error && "default", pointerEvents: error ? "none" : "auto"}}
        
        className={`${inter.className} btn1`}
      >Eliminar día</button>
      <button
        onClick={() => {
          habilitaDia();
        }}
        style={{cursor:error && "default", pointerEvents: error ? "none" : "auto"}}
        className={`${inter.className} btn1`}
      >Habilitar día</button>
      <div style={{height:"50px", width:"100%", textAlign:"center", marginTop:"20px"}}>{error && <span style={{fontSize:"14px"}}>{error}</span>}</div>
    </div>
  );
}

export default DeshabilitarDias;
