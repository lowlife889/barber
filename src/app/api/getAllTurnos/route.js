import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
export async function POST(req){
  const res= await req.json()
  const fechaActual= new Date()
  const servicios= await prisma.servicios.findMany()

  console.log(res)

  function calculaCantidadDeDias(){
    // Obtener el mes actual (los meses en JavaScript van de 0 a 11)
    const mesActual = fechaActual.getMonth();

    // Obtener el año actual
    const anioActual = fechaActual.getFullYear();

    // Crear un nuevo objeto Date para el primer día del mes siguiente
    const primerDiaMesSiguiente = new Date(anioActual, mesActual + 1, 1);

    // Restar 1 milisegundo al primer día del mes siguiente para obtener el último día del mes actual
    const ultimoDiaMesActual = new Date(primerDiaMesSiguiente.getTime() - 1);

    return ultimoDiaMesActual.getDate();
  }
  const cantidadDiasMesActual= calculaCantidadDeDias()

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
    let response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
        mes: (fechaActual.getMonth()+1).toString(),
        dia: {
          gte: fechaActual.getDate().toString(),
          lte: (fechaActual.getDate()+6).toString()
        },
        barbero:res.filtroBarbero
      }
    })
    if(cantidadDiasMesActual-fechaActual.getDate()<=7){
      let x=0
      while(x<cantidadDiasMesActual-(fechaActual.getDate()+5)){
        let turno= await prisma.turno.findMany({
          where:{
            year:fechaActual.getFullYear().toString(),
            mes: (fechaActual.getMonth()+2).toString(),
            dia:x.toString(),
            barbero:res.filtroBarbero
          }
        })
        response.push(turno)
      }
    }
    return NextResponse.json({
      turnos:response,
      balance:calculaBalance(response)
    })
  }else if(res.filtroFecha=="semana" && res.filtroBarbero=="Barbero2"){
    let response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
        mes: (fechaActual.getMonth()+1).toString(),
        dia: {
          gte: fechaActual.getDate().toString(),
          lte: (fechaActual.getDate()+6).toString()
        },
        barbero:res.filtroBarbero
      }
    })
    if(cantidadDiasMesActual-fechaActual.getDate()<=7){
      let x=0
      while(x<cantidadDiasMesActual-(fechaActual.getDate()+5)){
        let turno= await prisma.turno.findMany({
          where:{
            year:fechaActual.getFullYear().toString(),
            mes: (fechaActual.getMonth()+2).toString(),
            dia:x.toString(),
            barbero:res.filtroBarbero
          }
        })
        response.push(turno)
      }
    }
    return NextResponse.json({
      turnos:response,
      balance:calculaBalance(response)
    })
  }else if(res.filtroFecha=="semana" && res.filtroBarbero==null){
    let response= await prisma.turno.findMany({
      where:{
        year:fechaActual.getFullYear().toString(),
        mes: (fechaActual.getMonth()+1).toString(),
        dia: {
          gte: fechaActual.getDate().toString(),
          lte: (fechaActual.getDate()+6).toString()
        },
      }
    })
    if(cantidadDiasMesActual-fechaActual.getDate()<=7){
      let x=0
      while(x<cantidadDiasMesActual-(fechaActual.getDate()+5)){
        let turno= await prisma.turno.findMany({
          where:{
            year:fechaActual.getFullYear().toString(),
            mes: (fechaActual.getMonth()+2).toString(),
            dia:x.toString(),
          }
        })
        response.push(turno)
      }
    }
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