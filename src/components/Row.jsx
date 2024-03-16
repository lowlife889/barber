"use client"
import { useState } from "react";
import React from "react";
import "@/app/administrador/admin.css";

function Row({ barbero, nombre, telNum, dia, hora, mes, year, servicio, email }) {
  const [open, setOpen]= useState(false)
  
  //Que se vea el nombre, fecha en detalle, barbero y servicio, que haya un boton para ver el email y el numero de telefono
  return (
    <div className="row">
      <ul className="data-container">
        <li className="data" style={{ width: "20%" }}>
          {barbero}
        </li>
        <li className="data" style={{ width: "40%" }}>
          {hora} - {dia}/{mes}/{year}
        </li>
        <li className="data" style={{ width: "20%" }}>
          {servicio}
        </li>
        <li className="data" style={{ width: "15%", textAlign:"end" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            style={{height: "30px", cursor:"pointer"}}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            onClick={()=>{
              if(open){
                setOpen(false)
              }else{
                setOpen(true)
              }
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </li>
      </ul>
      <ul className="data-container" style={{display:open ? ("flex"):("none"), justifyContent:"space-around", backgroundColor:"#3333"}}>
        <li className="data"  style={{display:"flex", flexDirection:"column", color:"rgb(200,200,200)"}}><strong style={{fontWeight:"500"}}>Nombre</strong><span style={{fontWeight:"300"}}>{nombre}</span></li>
        <li className="data" style={{display:"flex", flexDirection:"column", color:"rgb(200,200,200)"}}><strong style={{fontWeight:"500"}}>Email</strong><span style={{fontWeight:"300",wordBreak:"break-all"}}>{email}</span></li>
        <li className="data" style={{display:"flex", flexDirection:"column", color:"rgb(200,200,200)"}}><strong style={{fontWeight:"500"}}>Numero</strong><span style={{fontWeight:"300"}}>{telNum}</span></li>
      </ul>
    </div>
  );
}

export default Row;
