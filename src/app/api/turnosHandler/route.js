import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";


//Sube el turno creado a la db y hace un update en el modelo del user para actualizar su turno actual
export async function POST(req) {
  const res = await req.json();
  const meses = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Noviembre","Diciembre",
  ];

  const newTurno= await prisma.turno.create({
    data:{
      mes:(meses.indexOf(res.mes)+1).toString(),
      dia:(res.numero).toString(),
      servicio:res.servicio,
      barbero:res.barbero,
      year:res.year,
      email:res.email,
      name:res.nombre,
      hora:res.hora,
      numero:res.numeroDeTelefono
    }
  })
  if(res.email!="brunominighinnazaret@gmail.com"){
    const userUpdate= await prisma.user.update({
      where:{
        email:res.email
      },
      data:{
        turno:`${res.dia} ${res.numero} de ${res.mes} del ${res.year} a las ${res.hora}`
      }
    })
  }

  return NextResponse.json({ message: "Ok" });
}

//Elimina el turno cuando el usuario lo cancela
export async function DELETE(req){
  const data= await req.json()
  let id;
  const turno = await prisma.turno.findMany({
    where:{
      email:data.email
    }
  })

  id=turno[0].id
  const user=await prisma.user.update({
    where:{
      email:data.email
    },
    data:{
      turno:"$"
    }
  })

  await prisma.turno.delete({
    where:{
      id:id,
      email:data.email
    }
  })


  return NextResponse.json({
    message:"ok",
    userData:user
  })
}

