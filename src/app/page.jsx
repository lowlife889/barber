"use client";
import { React, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

import ImgGallery from "@/components/ImgGallery";
import CardContainer from "@/components/CardContainer";

import { Poppins } from "next/font/google";
const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

import "@/app/home.css";
import "@/app/globals.css";

export default function Home() {
  //Router
  const router = useRouter();
  //Width actual de la pagina
  const [width, setWidth] = useState(null);
  //background del nav activo
  const [on, setOn] = useState("");
  //Animacion del nav
  const [animation, setAnimation] = useState("");
  //Setea el state del nave, si tiene que estar activo o no
  const [nav, setNav] = useState(false);

  //Controlan el state del loader
  const [pageOn, setPageOn] = useState(false);
  const [loaderAnimation, setLoaderAnimation] = useState("");
  const [loaderState, setLoaderState] = useState("");

  //
  const [services, setServices] = useState([]);

  //Elimina los turnos viejos de la db
  const deleteTurnos = async () => {
    const res = await fetch("/api/checkData", {
      method: "GET",
    });
  };

  //Setea el width del cliente
  useEffect(() => {
    const handleResize = () => {
      setWidth(document.documentElement.clientWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  //Contrala el scroll y setea cuando el nav tiene que estar activo
  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(".page-container");

      const position = container.scrollTop;

      if (position >= 100) {
        setNav(true);
      } else {
        setNav(false);
      }
    };

    const container = document.querySelector(".page-container");
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //Maneja la animacion del loader
  const handlerLoaderAnimation = () => {
    setTimeout(() => {
      setLoaderAnimation("loaderAnimation");
      setTimeout(() => {
        setPageOn(true);
      }, 220);
      setTimeout(() => {
        setLoaderState("off");
      }, 420);
    }, 450);
  };

  const getServices = async () => {
    const res = await fetch("/api/pricesHandler", {
      method: "GET",
    });
    const response = await res.json();
    setServices(response.services);
  };

  //Ejecuta deleteTurnose handlerLoaderAnimation
  useEffect(() => {
    getServices();
    deleteTurnos();
    handlerLoaderAnimation();
  }, []);

  //Setea la animacion y el style del nav
  useEffect(() => {
    if (nav) {
      setAnimation("on");
      setTimeout(() => {
        setOn("rgb(0,0,0,0.65)");
      }, 350);
    } else {
      setAnimation("off");
      setTimeout(() => {
        setOn("rgb(0,0,0,0)");
      }, 350);
    }
  }, [nav]);

  return (
    <main
      className="page-container"
      style={{ overflowY: pageOn ? "" : "hidden" }}
    >
      <div className={`loader ${loaderAnimation} ${loaderState}`}>
        <h2>LOGO</h2>
      </div>
      <header>
        <nav
          className="main-nav"
          style={{
            animation: nav ? "on .4s" : "off .4s",
            backgroundColor: on,
            backdropFilter: animation == "off" ? "blur(0px)" : "blur(5px)",
          }}
        >
          <ul className="items-container">
            <li className="item items">
              <Link href="#s4" className="link">
                TRABAJOS
              </Link>
            </li>
            <li className="item">
              <a href="/agenda" className="link">
                AGENDA UN TURNO
              </a>
            </li>
            <li className="item items">
              <Link href="#s1" className="link">
                LOGO
              </Link>
            </li>
            <li className="item items">
              <Link href="#s2" className="link">
                SERVICIOS
              </Link>
            </li>
            <li className="item">
              <Link
                href="#" className="link"
              >
               ¿CUARTA SECCION?
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className="main-container" id="s1">
        <h1>LOREM IPSUM</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus at
          voluptatibus vero iste ullam nisi? Vel voluptatum exercitationem
          dolores fugiat, dolorem explicabo placeat recusandae, ipsa architecto
          quos, hic culpa accusamus!
        </p>
        <Link href="/agenda" className="btn1">
          AGENDA UN TURNO
        </Link>
      </section>

      <section className="service-container" id="s2">
        <h2>NUESTROS SERVICIOS</h2>
        <p className="parrafo">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          officiis amet laboriosam corrupti possimus dolore doloremque animi
          labore, repudiandae porro ad maiores dolor, aliquid totam rerum?
          Sapiente dolore voluptas modi.
        </p>
        <div className="contenido">
          <>{services!=[] ? <CardContainer lista={services} /> : <></>}</>
          <div className="service-img">
            <img
              loading="lazy"
              className="im"
              src="/images/corte1.jpg"
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="galeria-container" id="s4">
        <h2>NUESTRO TRABAJO</h2>
        <ImgGallery width={width} />
      </section>

      <footer
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="redes-container"
          style={{ display: "flex", gap: "20px", marginBottom: "20px" }}
        >
          <FaInstagram
            className="icon"
            onClick={() => {
              router.push("https://www.instagram.com/barber.studios/");
            }}
            style={{
              fontSize: "40px",
              cursor: "pointer",
              padding: "3px",
            }}
          />
          <FaWhatsapp
            className="icon"
            onClick={() => {
              router.push("https://www.instagram.com/barber.studios/");
            }}
            style={{
              fontSize: "40px",
              cursor: "pointer",
              padding: "3px",
            }}
          />
        </div>
        <span
          style={{
            fontSize: "14px",
            fontWeight: "300",
            color: "rgb(100,100,100)",
            padding: "3px",
          }}
        >
          Todos los derechos reservados &copy; LOREM IPSUM{" "}
          {new Date().getFullYear()}
        </span>
      </footer>
    </main>
  );
}
