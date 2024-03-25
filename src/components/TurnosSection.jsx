"use client";

import React, { useEffect, useState } from "react";
import "@/app/administrador/admin.css";
import Row from "./Row";

function TurnosSection() {
  const [filtro, setFiltro] = useState("semana");
  const [filtro2, setFiltro2] = useState(null);
  const [listaDeTurnos, setListaDeTurnos] = useState(null);
  const [balance, setBalance] = useState(0);
  const getTurnos = async () => {
    const res = await fetch("/api/getAllTurnos", {
      method: "POST",
      body: JSON.stringify({
        filtroFecha: filtro,
        filtroBarbero: filtro2,
      }),
      headers: {
        "Content-Type": "/aplication/json",
      },
    });
    const data = await res.json();
    setBalance(data.balance);
    setListaDeTurnos(data.turnos);
  };

  useEffect(() => {
    getTurnos();
  }, [filtro, filtro2]);

  return (
    <main className="turnos-section">
      <div className="filtros-container">
        <div
          className="inp-container inp-container1"
          style={{ width: "100%", paddingInline: "10px" }}
        >
          <label>Barbero</label>
          <div className="selectors-container">
            <button
              className="btn1"
              style={{
                backgroundColor: filtro2 == "Barbero1" ? "#505050" : "#141414",
                marginTop: "5px",
              }}
              onClick={() => {
                if (filtro2 != "Barbero1") {
                  setFiltro2("Barbero1");
                } else {
                  setFiltro2(null);
                }
              }}
            >
              Barbero1
            </button>
            <button
              className="btn1"
              style={{
                backgroundColor: filtro2 == "Barbero2" ? "#505050" : "#141414",
                marginTop: "5px",
              }}
              onClick={() => {
                if (filtro2 != "Barbero2") {
                  setFiltro2("Barbero2");
                } else {
                  setFiltro2(null);
                }
              }}
            >
              Barbero2
            </button>
            <button
              className="btn1"
              style={{
                backgroundColor: filtro2 == null ? "#505050" : "#141414",
                marginTop: "5px",
              }}
              onClick={() => {
                if (filtro2 != null) {
                  setFiltro2(null);
                }
              }}
            >
              Ambos
            </button>
          </div>
        </div>
        <div
          className="inp-container"
          style={{ width: "100%", paddingInline: "10px", height: "190px" }}
        >
          <label>Fecha</label>
          <div className="selectors-container">
            <button
              className="btn1"
              style={{
                backgroundColor: filtro == "dia" ? "#505050" : "#141414",
                marginTop: "5px",
              }}
              onClick={() => {
                if (filtro != "dia") {
                  setFiltro("dia");
                }
              }}
            >
              Día
            </button>
            <button
              className="btn1"
              style={{
                backgroundColor: filtro == "semana" ? "#505050" : "#141414",
                marginTop: "5px",
              }}
              onClick={() => {
                if (filtro != "semana") {
                  setFiltro("semana");
                }
              }}
            >
              Semana
            </button>
            <button
              className="btn1"
              style={{
                backgroundColor: filtro == "mes" ? "#505050" : "#141414",
                marginTop: "5px",
              }}
              onClick={() => {
                if (filtro != "mes") {
                  setFiltro("mes");
                }
              }}
            >
              Mes
            </button>
            <button
              className="btn1"
              style={{
                backgroundColor: filtro == "year" ? "#505050" : "#141414",
                marginTop: "5px",
              }}
              onClick={() => {
                if (filtro != "year") {
                  setFiltro("year");
                }
              }}
            >
              Año
            </button>
          </div>
        </div>
      </div>
      <div className="analitics">
        <div className="total-container">
          <strong style={{ fontWeight: 200 }}>Turnos:</strong> {listaDeTurnos != [] && listaDeTurnos != null ? (<>{listaDeTurnos.length}</>):(<>0</>)}
        </div>
        <div className="balance-container">
          <strong style={{ fontWeight: 200 }}>Balance:</strong> ${balance}
        </div>
      </div>
      <div className="turnos-table-container">
        <div className="turnos-table">
          <div className="row">
            <ul
              className="data-container"
              style={{
                background: "linear-gradient(to top right, #4444, #030303)",
              }}
            >
              <li
                className="data"
                style={{
                  width: "20%",
                  fontWeight: "500",
                  color: "rgb(200,200,200)",
                }}
              >
                Barbero
              </li>
              <li
                className="data"
                style={{
                  width: "40%",
                  fontWeight: "500",
                  color: "rgb(200,200,200)",
                }}
              >
                Fecha
              </li>
              <li
                className="data"
                style={{
                  width: "20%",
                  fontWeight: "500",
                  color: "rgb(200,200,200)",
                }}
              >
                Servicio
              </li>
              <li className="data" style={{ width: "15%", textAlign: "end" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  style={{ height: "30px", color: "rgb(200,200,200)" }}
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </li>
            </ul>
          </div>
          <div className="lista">
            {listaDeTurnos ? (
              <div style={{ borderRadius: "3px"}}>
                {listaDeTurnos.map((x) => {
                  return (
                    <Row
                      key={x.id}
                      nombre={x.name}
                      barbero={x.barbero}
                      telNum={x.numero}
                      dia={x.dia}
                      hora={x.hora}
                      mes={x.mes}
                      year={x.year}
                      servicio={x.servicio}
                      email={x.email}
                    />
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default TurnosSection;
