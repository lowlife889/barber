"use client"
import React, { useEffect, useState } from "react";
import Form from "./Form";
import "@/app/home.css"
import { useRouter } from "next/navigation";

function PedirTurno({ email, tieneTurno2 }) {
  //Almacena un $ si no tiene turno y el turno si de lo contrario tiene uno
  const [tieneTurno, setTieneTurno] = useState("$");
  const router = useRouter()
  //Le asigna el valor tieneTurno2 pasado por param a tieneTurno, este valor traido de page indica si el user tiene turno
  useEffect(() => {
    if (tieneTurno2 == null) {
      setTieneTurno("$");
    } else {
      setTieneTurno(tieneTurno2);
    }
  }, [tieneTurno2]);  

  //Elimina el turno si el usuario quiere cancelarlo
  const deleteTurno = async () => {
    const res = await fetch("/api/turnosHandler", {
      method: "DELETE",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "/aplication/json",
      },
    });
  };

  return (
    <div className="pedirTurno-container" style={{height:((tieneTurno2=="$" && tieneTurno!="$")) ? ("700px"):("1170px")}}>
      {tieneTurno2 == "$" ? (
        <>
          {tieneTurno != "$" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
                marginTop: "100px",
              }}
            >
              <p style={{ marginInline: "10vw", textAlign: "center" }}>
                Tenés un turno agendado para el día{" "}
                {tieneTurno != " " ? tieneTurno : tieneTurno2}
              </p>
              <button
                className="btn1"
                onClick={() => {
                  setTieneTurno(`$`);
                  deleteTurno();
                }}
              >
                CANCELAR TURNO
              </button>
            </div>
          ) : (
            <Form email={email} setTieneTurno={setTieneTurno}/>
          )}
        </>
      ) : (
        <>
          {tieneTurno2 ? (
            <>
              {tieneTurno != "$" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "center",
                    marginTop: "0px",
                  }}
                >
                  <div className="ubi-container">
                    <img src="/images/ubic.PNG" onClick={()=>{
                      router.push("https://www.google.com/maps/dir//-32.9100356,-60.8149866/@-32.9102565,-60.8149974,18z/data=!4m2!4m1!3e0?entry=ttu")
                    }}/>
                  </div>
                  <p style={{ marginInline: "10vw", textAlign: "center" }}>
                    Tenés un turno agendado para el día{" "}
                    {tieneTurno != " " ? tieneTurno : tieneTurno2}
                  </p>
                  <button
                    className="btn1"
                    onClick={() => {
                      setTieneTurno(`$`);
                      deleteTurno();
                    }}
                  >
                    CANCELAR TURNO
                  </button>
                </div>
              ) : (
                <Form email={email} setTieneTurno={setTieneTurno}/>
              )}
            </>
          ) : (
            <span style={{ marginTop: "100px", fontWeight: 200 }}>
              Cargando turnos...
            </span>
          )}
        </>
      )}
    </div>
  );
}

export default PedirTurno;
