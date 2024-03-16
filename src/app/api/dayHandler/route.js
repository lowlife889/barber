import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
export async function DELETE(req){
  const res= await req.json()
  const horarioss = [
    "09:00",
    "09:45",
    "10:30",
    "11:15",
    "15:00",
    "16:30",
    "17:15",
    "18:00",
    "18:45",
    "19:30",
  ];
  
  const turnosDelDia1= await prisma.turno.findMany({
    where:{
      year:res.year.toString(),
      dia:res.dia.toString(),
      mes:res.mes.toString()
    }
    
  })

  if(turnosDelDia1.length===0){
    for (const iterator of horarioss) {
      await prisma.turno.create({
        data:{
          mes:(res.mes).toString(),
          dia:(res.dia).toString(),
          hora:iterator,
          servicio:"",
          barbero:res.barbero,
          email:"$",
          name:"",
          year:(res.year).toString(),
          numero:"",
        }
      })
    }
    return NextResponse.json({error:"Se deshabilito el día correctamente"})
  }else{
    if(turnosDelDia1[0].email=="$"){
      return NextResponse.json({error:"El día ya está deshabilitado"})
    }else{
      return NextResponse.json({error:"Ya hay turnos agendados para ese día"})
    }
    
  }

  
}

export async function POST(req){
  const res= await req.json()

  const turnosDelDia= await prisma.turno.findMany({
    where:{
      dia:res.dia.toString(),
      mes:res.mes.toString(),
      year:res.year.toString()
    }
  })

  if(turnosDelDia.length!=0){
    if(turnosDelDia[0].email=="$"){
      await prisma.turno.deleteMany({
        where:{
          dia:res.dia.toString(),
          mes:res.mes.toString(),
          year:res.year.toString()
        }
      })
      return NextResponse.json({error:"Se habilito el día correctamente"})
    }else{
      return NextResponse.json({error:"El día ya está habilitado"})
    }
    
  }else{
    return NextResponse.json({error:"El día ya está habilitado"})
  }

  
}