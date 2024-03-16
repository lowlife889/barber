"use client";

import React from "react";
import { useState, useEffect } from "react";
import PedirTurno from "@/components/PedirTurno";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import app from "@/libs/firebase";
import { Poppins } from "next/font/google";
const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});
import "@/app/globals.css";
import "@/app/home.css";


function agenda() {
  //Auth settings
  const auth = getAuth(app);
  //Turno del usuario
  const [turno, setTurno] = useState(null);
  //Datos del usuario
  const [user, setUser] = useState(null);

  const [cond, setCond] = useState(true);
  const router = useRouter();

  //Chequea si el user tiene turno, almacena el res en turno
  const getData = async (email) => {
    const res = await fetch("/api/checkData", {
      method: "POST",
      body: JSON.stringify({
        emaill: email,
      }),
      headers: {
        "Content-Type": "/aplication/json",
      },
    });
    const response = await res.json();
    setTurno(response.turno);
  };

  //Chequea si el usuario esta logueado
  useEffect(() => {
    const auth = getAuth(app);
    const unsuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setCond(null);
      }
      return () => unsuscribe();
    });
  }, [auth, router]);

  //Si esta logueado el usuario busca la data del turno
  useEffect(() => {
    if (user) {
      getData(user.email);
    }
  }, [user]);

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error("Error signing in with Google", e.message);
    }
  };

  return (
    <main className="page-container">
      <div className="back">
        <Link href="/" className="back-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Link>
      </div>
      <section className="pedir-container">
        <h2>AGENDA TU TURNO</h2>
        {user ? (
          <PedirTurno email={user.email} tieneTurno2={turno}></PedirTurno>
        ) : (
          <>
            {cond ? (
              <span style={{ marginTop: "150px", fontWeight: 200 }}>
                Cargando turnos...
              </span>
            ) : (
              <>
                <p
                  style={{
                    width: "60ch",
                    textAlign: "center",
                    marginTop: "120px",
                  }}
                >
                  Podés agendar turno en un instante con tres simples pasos,
                  inicia sesión con tu cuenta de Google para comenzar.
                </p>
                <button onClick={signInWithGoogle} className={`${inter.className} btn1`} >
                  INICIAR SESIÓN
                </button>
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default agenda;
