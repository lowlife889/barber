"use client";
import React from "react";
import { useState } from "react";
function CambiarPrecios() {
  const [btnSelected, setBtnSelected] = useState(1);
  const [service, setService] = useState("Servicio1");
  const [precio, setPrecio] = useState(null);
  const [ok, setOk] = useState(null);
  const [error, setError] = useState(null);
  const nums = "0123456789";

  const onSubmit = async (e) => {
    e.preventDefault();
    let cond = true;
    if (precio == "" || precio == null) {
      cond = false;
    } else {
      for (const x of precio) {
        if (!nums.includes(x)) {
          cond = false;
        }
      }
    }
    if (cond) {
      const res = await fetch("/api/pricesHandler", {
        method: "POST",
        body: JSON.stringify({
          nombre: service,
          precio: precio,
        }),
      });
      const response = await res.json();
      setError(null)
      setOk(response.message);
      setTimeout(()=>{
        setOk(null)
      },1000)
    } else {
      setError("Precio inválido");
      setTimeout(()=>{
        setError(null)
      },2000)
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80vw",
        maxWidth: "460px",
        minWidth: "250px",
        gap: "20px",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          className="service"
          onClick={() => {
            setBtnSelected(1);
            setService("Servicio1");
          }}
          style={{
            border:
              btnSelected == 1 ? "1px solid #505050" : "1px solid rgb(1,1,1,0)",
          }}
        >
          Servicio1
        </button>
        <button
          type="button"
          className="service"
          onClick={() => {
            setBtnSelected(2);
            setService("Servicio2");
          }}
          style={{
            border:
              btnSelected == 2 ? "1px solid #505050" : "1px solid rgb(1,1,1,0)",
          }}
        >
          Servicio2
        </button>
        <button
          type="button"
          className="service"
          onClick={() => {
            setBtnSelected(3);
            setService("Servicio3");
          }}
          style={{
            border:
              btnSelected == 3 ? "1px solid #505050" : "1px solid rgb(1,1,1,0)",
          }}
        >
          Servicio3
        </button>
        <button
          type="button"
          className="service"
          onClick={() => {
            setBtnSelected(4);
            setService("Servicio4");
          }}
          style={{
            border:
              btnSelected == 4 ? "1px solid #505050" : "1px solid rgb(1,1,1,0)",
          }}
        >
          Servicio4
        </button>
      </div>
      <div className="inp-container" style={{ width: "100%" }}>
        <label htmlFor="precio">Precio</label>
        <input
          type="text"
          id="precio"
          maxLength={5}
          onChange={(e) => {
            setPrecio(e.target.value);
          }}
        />
        {error && <span>{error}</span>}
      </div>
      <div style={{display:"flex", alignItems:"center", width:"100%", justifyContent:"flex-end"}}>
        
        {ok && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            style={{height:"40px", color:"rgb(0,250,0, .7)"}}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>
        )}
        <button
          type="submit"
          className="btn1"
          style={{ alignSelf: "center", marginTop: "0px", marginLeft:"10px" }}
        >
          CAMBIAR
        </button>
      </div>
    </form>
  );
}

export default CambiarPrecios;
