import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
export async function POST(req){
  const res= await req.json()

  const servicios= await prisma.servicios.findMany()
  const service= await prisma.servicios.findMany({
    where:{
      nombre:res.nombre
    }
  })
  
  if(servicios.length<4){
    await prisma.servicios.create({
      data:{
        nombre:res.nombre,
        precio:parseInt(res.precio)
      }
    })
  }else{
    const id= service[0].id
    await prisma.servicios.update({
      where:{
        id:id,
        nombre:res.nombre,
      },
      data:{
        precio:parseInt(res.precio)
      }
    })
  }

  return NextResponse.json({message:"ok"})
}

export async function GET(){

  const services= await prisma.servicios.findMany()

  return NextResponse.json({services:services})
}