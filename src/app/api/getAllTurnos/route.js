import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
export async function POST(req){
  const res= await req.json()
  const fechaActual= new Date()
  const fechaSiguiente = new Date();
  const servicios= await prisma.servicios.findMany()
  fechaSiguiente.setDate(fechaSiguiente.getDate() + 7);

  const calculaBalance=(turnos)=>{
    let resultado=0
    for (const turno of turnos) {
      for (const servicio of servicios) {
        if(servicio.nombre==turno.servicio){
          resultado+=servicio.precio
          break
        }
      }
    }
    return resultado
  }

  if(res.filtroFecha=="dia" && res.filtroBarbero=="Barbero1"){
    const response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
        mes: (fechaActual.getMonth()+1).toString(),
        dia:fechaActual.getDate().toString(),
        barbero:res.filtroBarbero
      }
    })
    
    return NextResponse.json({
      turnos:response,
      balance:calculaBalance(response),
    })
  }else if(res.filtroFecha=="dia" && res.filtroBarbero=="Barbero2"){
    const response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
        mes: (fechaActual.getMonth()+1).toString(),
        dia:fechaActual.getDate().toString(),
        barbero:res.filtroBarbero
      }
    })
    return NextResponse.json({
      turnos:response,
      balance:calculaBalance(response)
    })
  }else if(res.filtroFecha=="dia" && res.filtroBarbero==null){
    const response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
        mes: (fechaActual.getMonth()+1).toString(),
        dia:fechaActual.getDate().toString(),
      }
    })
    return NextResponse.json({
      turnos:response,
      balance:calculaBalance(response)
    })
  }

  if(res.filtroFecha=="semana" && res.filtroBarbero=="Barbero1"){
    const response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
        mes: (fechaActual.getMonth()+1).toString(),
        dia: {
          gte: fechaActual.getDate().toString(),
          lte: fechaSiguiente.getDate().toString()
        },
        barbero:res.filtroBarbero
      }
    })
    return NextResponse.json({
      turnos:response,
      balance:calculaBalance(response)
    })
  }else if(res.filtroFecha=="semana" && res.filtroBarbero=="Barbero2"){
    const response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
        mes: (fechaActual.getMonth()+1).toString(),
        dia: {
          gte: fechaActual.getDate().toString(),
          lte: fechaSiguiente.getDate().toString()
        },
        barbero:res.filtroBarbero
      }
    })
    return NextResponse.json({
      turnos:response,
      balance:calculaBalance(response)
    })
  }else if(res.filtroFecha=="semana" && res.filtroBarbero==null){
    const response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
        mes: (fechaActual.getMonth()+1).toString(),
        dia: {
          gte: fechaActual.getDate().toString(),
          lte: fechaSiguiente.getDate().toString()
        },
      }
    })
    return NextResponse.json({
      turnos:response,
      balance:calculaBalance(response)
    })
  }

  if(res.filtroFecha=="mes" && res.filtroBarbero=="Barbero1"){
    const response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
        mes: (fechaActual.getMonth()+1).toString(),
        barbero:res.filtroBarbero
      }
    })
    return NextResponse.json({
      turnos:response,
      balance:calculaBalance(response)
    })
  }else if(res.filtroFecha=="mes" && res.filtroBarbero=="Barbero2"){
    const response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
        mes: (fechaActual.getMonth()+1).toString(),
        barbero:res.filtroBarbero
      }
    })
    return NextResponse.json({
      turnos:response,
      balance:calculaBalance(response)
    })
  }else if(res.filtroFecha=="mes" && res.filtroBarbero==null){
    const response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
        mes: (fechaActual.getMonth()+1).toString(),
      }
    })
    return NextResponse.json({
      turnos:response,
      balance:calculaBalance(response)
    })
  }
  
  if(res.filtroFecha=="year" && res.filtroBarbero=="Barbero1"){
    const response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
        barbero:res.filtroBarbero
      }
    })
    return NextResponse.json({
      turnos:response,
      balance:calculaBalance(response)
    })
  }else if(res.filtroFecha=="year" && res.filtroBarbero=="Barbero2"){
    const response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
        barbero:res.filtroBarbero
      }
    })
    return NextResponse.json({
      turnos:response,
      balance:calculaBalance(response)
    })
  }else if(res.filtroFecha=="year" && res.filtroBarbero==null){
    const response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
      }
    })
    return NextResponse.json({
      turnos:response,
      balance:calculaBalance(response)
    })
  }

  return NextResponse.json({message:"ok"})
}