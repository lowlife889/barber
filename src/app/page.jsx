"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  const ejecutarScript = async () => {
    try {
      const response = await fetch("/api/exec", {
        method: "POST", // o 'GET' si lo prefieres
      });
      if (!response.ok) {
        throw new Error("Error al ejecutar el script");
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={ejecutarScript}>Ejecutar script</button>
      <p>{message}</p>
    </div>
  );
}
