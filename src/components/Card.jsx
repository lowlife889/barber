import React from "react";
import Image from "next/image";
import "@/app/home.css"
function Card({icon, title, desc, price}) {
  return (
    <div className="card">
      <Image loading="lazy" alt="desc" className="image" src={icon} width={50} height={50}></Image>
      <h3 style={{fontSize:"16px"}}>{title}</h3>
      <p>
        {desc}
      </p>
      <span>${price}</span>
    </div>
  );
}

export default Card;
