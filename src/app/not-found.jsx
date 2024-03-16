"use client"
import { useRouter } from "next/navigation";
import "@/app/home.css"


export default function Custom() {
  const router= useRouter()
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h2
        style={{
          textAlign: "center",
          paddingInline: "10px",
        }}
      >
        404 - Página no encontrada
      </h2>
      <h3
        style={{
          fontWeight: 200,
          fontSize: "16px",
          textAlign: "center",
          paddingInline: "10px",
          textShadow:"none"
        }}
      >
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </h3>
        <button
        onClick={()=>{
          router.push("/")
        }}
          className="btn1"
          style={{
            alignSelf: "center",
            width: "200px",
            marginTop: "20px",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          Volver
        </button>

    </div>
  );
}
