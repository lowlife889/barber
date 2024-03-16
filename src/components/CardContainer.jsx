"use client"
import React from "react";
import Card from "./Card";
import "@/app/home.css";

function CardContainer({ lista }) {
  return (
    <div className="cards-container">
      {lista!=[] ? (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "70px",
              flexWrap: "wrap",
            }}
          >
            <Card
              title={!lista[0] ? (" "):(`${lista[0].nombre}`)}
              price={!lista[0] ? (" "):(`${lista[0].precio}`)}
              desc={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit officiis amet laboriosam corrupti possimus"
              }
              icon={"/images/barba.png"}
            ></Card>

            <Card
              title={!lista[1] ? (" "):(`${lista[1].nombre}`)}
              price={!lista[1] ? (" "):(`${lista[1].precio}`)}              
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit officiis amet laboriosam corrupti possimus"
              
              icon={"/images/forma-de-pelo.png"}
            ></Card>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "70px",
              flexWrap: "wrap",
            }}
          >
            <Card
              title={!lista[2] ? (" "):(`${lista[2].nombre}`)}
              price={!lista[2] ? (" "):(`${lista[2].precio}`)}              
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit officiis amet laboriosam corrupti possimus"
              
              icon={"/images/recorte-de-barba.png"}
            ></Card>

            <Card
              title={!lista[3] ? (" "):(`${lista[3].nombre}`)}
              price={!lista[3] ? (" "):(`${lista[3].precio}`)}              
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit officiis amet laboriosam corrupti possimus"
              
              icon={"/images/recorte-de-barba.png"}
            ></Card>
          </div>
        </>) : (
        <></>
      )}
    </div>
  );
}

export default CardContainer;
