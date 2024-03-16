"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import app from "@/libs/firebase";
import Link from "next/link";
import React from "react";
import "@/app/home.css";
import "@/app/administrador/admin.css";
import { Poppins } from "next/font/google";

import TurnosSection from "@/components/TurnosSection";
import ConfigSection from "@/components/ConfigSection";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

function Dashboard() {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [section, setSection] = useState("turnos");

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email == "brunominighinnazaret@gmail.com") {
          setUser(user);
        } else {
          router.push("/404");
        }
      } else {
        router.push("/404");
      }
      return () => unsuscribe();
    });
  }, []);

  return (
    <div>
      {user ? (
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
          <div className="change-section">
            <button
              className={`${inter.className} btn1`}
              onClick={() => {
                setSection("turnos");
              }}
              style={{
                backgroundColor: section == "turnos" ? "#505050" : "#141414",
              }}
            >
              TURNOS
            </button>
            <button
              className={`${inter.className} btn1`}
              onClick={() => {
                setSection("config");
              }}
              style={{
                backgroundColor: section == "config" ? "#505050" : "#141414",
              }}
            >
              CONFIGURACIONES
            </button>
          </div>
          <section className="section-container">
            {section == "turnos" ? (
              <TurnosSection></TurnosSection>
            ) : (
              <ConfigSection></ConfigSection>
            )}
          </section>
        </main>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Dashboard;
