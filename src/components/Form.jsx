"use client";
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import { MobileDatePicker, esES } from "@mui/x-date-pickers";
import { Poppins } from "next/font/google";
import es from "dayjs/locale/es";
import "@/app/home.css";

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
const semana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Noviembre",
  "Diciembre",
];
const horarioss = [
  "09:00",
  "09:45",
  "10:30",
  "11:15",
  "15:00",
  "16:30",
  "17:15",
  "18:00",
  "18:45",
  "19:30",
];
const abc = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const nums = "0123456789";
const today = dayjs().add(1, "day");
const tomorrow2 = dayjs().add(3, "month");
const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

function Form({ email, setTieneTurno }) {
  //STATES
  //Nombre de la persona
  const [name, setName] = useState("");

  //Numero de telefono de la persona
  const [numero, setNumero] = useState("");

  //Fecha del turno para enviar al backend
  const [fecha, setFecha] = useState(null);

  //Barbero seleccionado
  const [barbero, setBarbero] = useState("Barbero1");

  //Servicio seleccionado
  const [servicio, setServicio] = useState("Servicio1");

  //Horarios disponibles que se van a mostrar
  const [horarios, setHorarios] = useState([]);

  //Data del turno que agendo la persona para mostrarsela
  const [turno, setTurno] = useState(null);

  //Errores para mostrar al usuario si hay alguno cuando se envia el form
  const [errorNombre, setErrorNombre] = useState(null);
  const [errorNumero, setErrorNumero] = useState(null);

  //FUNCIONES
  //Asigna los dias que no estan disponibles para seleccionar en el calendario
  function disableWeekends(date) {
    return date.$W === 1 || date.$W === 0;
  }

  //Envia los datos del turno al backend para ser almacenados en la base de datos
  const agendaTurno = async (
    numero,
    name,
    year,
    mes,
    dia,
    numeroDeDia,
    turno
  ) => {
    const res = await fetch("/api/turnosHandler", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        nombre: name,
        servicio: servicio,
        barbero: barbero,
        numeroDeTelefono: numero,
        year: year,
        mes: mes,
        dia: dia,
        numero: numeroDeDia,
        hora: turno,
      }),
      headers: {
        "Content-Type": "/aplication/json",
      },
    });
    const data = await res.json();
    if (data.message == "Ok") {
      setTieneTurno(
        `${dia} ${numeroDeDia} de ${mes} del ${year} a las ${turno}`
      );
    }
  };

  //Obtengo los turnos del dia para mostrar cuales estan disponibles
  const getTurnos = async (numero, mes, year, barberoo) => {
    const res = await fetch("/api/getTurnos", {
      method: "POST",
      body: JSON.stringify({
        numero: numero,
        year: year,
        mes: mes,
        barbero: barberoo,
      }),
      headers: {
        "Contente-Type": "/aplication/json",
      },
    });
    if (res) {
      const response = await res.json();
      let turnosDisp = [...horarioss]; // Clonamos el array para evitar modificar el original
      if (response.turnos) {
        response.turnos.forEach((x) => {
          turnosDisp = turnosDisp.filter((item) => item !== x.hora);
        });
      }

      setHorarios(turnosDisp);
    }
  };

  //Chequea que esten los datos requeridos para ejecutar agendaTurnos
  const onSubmit = async (e) => {
    e.preventDefault();
    let condNumero = false;
    let condNombre = false;
    if (name.length == 0) {
      setErrorNombre("Requerido");
      condNombre = true;
    }
    if (numero.length == 0) {
      setErrorNumero("Requerido");
      condNumero = true;
    } else if (numero.length != 10) {
      condNumero = true;
      setErrorNumero("El número es inválido");
    }

    if (!condNumero && !condNombre) {
      for (const i of name) {
        if (!abc.includes(i)) {
          condNombre = true;
          break;
        }
      }
      for (const i of numero) {
        if (!nums.includes(i)) {
          condNumero = true;
          break;
        }
      }
    }
    if (condNumero || condNombre) {
    } else {
      agendaTurno(
        numero,
        name,
        fecha.year,
        fecha.mes,
        fecha.dia,
        fecha.numero,
        turno
      );
      setTurno(null);
      setFecha(null);
    }
  };

  //Setea el barbero seleccionado
  const cambiaBarbero = (x, y) => {
    setBarbero(y);
    if (fecha) {
      getTurnos(
        fecha.numero.toString(),
        (meses.indexOf(fecha.mes) + 1).toString(),
        fecha.year.toString(),
        y
      );
    }
  };

  //Cambia los turnos que se muestran al cambiar la fecha seleccionada (ejecuta getTurnos)
  const cambiaTurnos = (e) => {
    setTurno(null);
    getTurnos(e.$D.toString(), (e.$M + 1).toString(), e.$y.toString(), barbero);
    setFecha({
      numero: e.$D,
      dia: semana[e.$W],
      mes: meses[e.$M],
      year: e.$y.toString(),
    });
  };

  return (
    <form onSubmit={onSubmit} className="turnos-form">
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
      <div className="inp-container inp2">
        <label>Servicio</label>
        <div className="selectors-container">
          <button
            type="button"
            style={{
              backgroundColor: servicio == "Servicio1" ? "#505050" : "#141414",
            }}
            className={inter.className}
            onClick={() => {
              setServicio("Servicio1");
            }}
          >
            Servicio1
          </button>
          <button
            type="button"
            style={{
              backgroundColor: servicio == "Servicio2" ? "#505050" : "#141414",
            }}
            className={inter.className}
            onClick={() => {
              setServicio("Servicio2");
            }}
          >
            Servicio2
          </button>
          <button
            type="button"
            style={{
              backgroundColor: servicio == "Servicio3" ? "#505050" : "#141414",
            }}
            className={inter.className}
            onClick={() => {
              setServicio("Servicio3");
            }}
          >
            Servicio3
          </button>
          <button
            type="button"
            style={{
              backgroundColor: servicio == "Servicio4" ? "#505050" : "#141414",
            }}
            className={inter.className}
            onClick={() => {
              setServicio("Servicio4");
            }}
          >
            Servicio4
          </button>
        </div>
      </div>

      <div className="inputs">
        <div className="inputs-container">
          <div className="calendar-mobile">
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              localeText={
                esES.components.MuiLocalizationProvider.defaultProps.localeText
              }
              adapterLocale={es}
            >
              <ThemeProvider theme={darkTheme}>
                <MobileDatePicker
                  className={inter.className}
                  shouldDisableDate={disableWeekends}
                  sx={{
                    marginBottom: "30px",
                    width: "100%",
                    backgroundColor: "rgb(20, 20, 20)",
                    borderRadius: "3px",
                    ".MuiPickersToolbar-root": {
                      color: "rgb(200, 200, 200)",
                    },
                    ".MuiDateCalendar-root": {
                      color: "rgb(200, 200, 200)",
                    },
                  }}
                  minDate={today}
                  maxDate={tomorrow2}
                  onAccept={(e) => {
                    if (e) {
                      cambiaTurnos(e);
                    }
                  }}
                />
              </ThemeProvider>
            </LocalizationProvider>
          </div>

          <div className="inp-container">
            <label htmlFor="name">Nombre</label>
            <input
              className={inter.className}
              autoComplete="off"
              type="text"
              id="name"
              value={name}
              maxLength={10}
              onChange={(e) => {
                let noContiene = true;
                setName(e.target.value);
                if (e.target.value == "") {
                  setErrorNombre("");
                }
                for (const i of e.target.value) {
                  if (!abc.includes(i)) {
                    noContiene = false;
                    break;
                  } else {
                    noContiene = true;
                  }
                }
                if (noContiene) {
                  setErrorNombre("");
                } else {
                  setErrorNombre("El nombre solo puede contener letras");
                }
              }}
            />
            {errorNombre && <span>{errorNombre}</span>}
          </div>
          <div className="inp-container">
            <label htmlFor="numero">Número de telefono</label>
            <input
              className={inter.className}
              autoComplete="off"
              type="text"
              id="numero"
              value={numero}
              maxLength={10}
              onChange={(e) => {
                let noContiene = true;
                setNumero(e.target.value);
                if (e.target.value == "") {
                  setErrorNumero("");
                }
                for (const i of e.target.value) {
                  if (!nums.includes(i)) {
                    noContiene = false;
                    break;
                  } else {
                    noContiene = true;
                  }
                }
                if (noContiene) {
                  setErrorNumero("");
                } else {
                  setErrorNumero("El número es inválido");
                }
              }}
            />
            {errorNumero && <span>{errorNumero}</span>}
          </div>
          <div className="turnos-container">
            {fecha ? (
              <>
                {horarios != [] ? (
                  <>
                    {horarios.map((x) => {
                      return (
                        <div
                          key={x}
                          onClick={() => {
                            setTurno(x);
                          }}
                          className="turno"
                          style={{
                            backgroundColor: x == turno ? "#505050" : "",
                          }}
                        >
                          {x}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <span
                    style={{
                      width: "100%",
                      textAlign: "center",
                      fontWeight: "200",
                      marginTop: "40px",
                    }}
                  >
                    Ya no hay turnos disponibles para esa fecha
                  </span>
                )}
              </>
            ) : (
              <span
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "200",
                  marginTop: "40px",
                }}
              >
                Elegí una fecha para ver qué turnos hay disponibles
              </span>
            )}
          </div>
        </div>
        <div className="selector-container">
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
                  cambiaTurnos(e);
                }}
              />
            </ThemeProvider>
          </LocalizationProvider>
        </div>
      </div>
      {turno ? (
        <div className="confirm-container">
          <span className="confirm-data">
            {fecha.dia} {fecha.numero} de {fecha.mes} del {fecha.year} a las{" "}
            {turno}
          </span>
          <button className={`${inter.className} btn1`}>CONFIRMAR TURNO</button>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
}

export default Form;
