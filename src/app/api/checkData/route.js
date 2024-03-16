import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

//Si existe el usuario lo retorna y si no existe, lo guarda en la db y lo retorna
export async function POST(req){
  const res= await req.json()
  let response;
  
  const user= await prisma.user.findUnique({
    where:{
      email:res.emaill
    }
  })

  if(user!=null){
    return NextResponse.json(user)
  }else{
    const user2= await prisma.user.create({
      data:{
        email:res.emaill,
        turno:"$"
      }
    })
    return NextResponse.json(user2)
  }
  
}

//Elimina los turnos que ya pasaron de la db
export async function GET(){
  const fechaActual= new Date();
  const year= fechaActual.getFullYear()
  const mes= fechaActual.getMonth()+1
  const dia = fechaActual.getDate()
  const hora= fechaActual.getHours()

  const eliminaTurno= async(id,email)=>{
    await prisma.turno.delete({
      where:{
        id:id
      }
    })
    await prisma.user.update({
      where:{
        email:email
      },
      data:{
        turno:"$"
      }
    })
  }

  const turnos= await prisma.turno.findMany()
  for (const turno of turnos) {
    let horaTurno=Math.floor(`${turno.hora[0]}${turno.hora[1]}`)
    let diaTurno=Math.floor(turno.dia)
    let mesTurno=Math.floor(turno.mes)
    let yearTurno=Math.floor(turno.year)
    if(year>yearTurno){
      eliminaTurno(turno.id, turno.email)
    }else if(year==yearTurno){
      if(mes>mesTurno){
        eliminaTurno(turno.id, turno.email)
      }else if(mes==mesTurno){
        if(dia>diaTurno){
          eliminaTurno(turno.id, turno.email)
        }else if(dia==diaTurno){
          if(hora>horaTurno){
            eliminaTurno(turno.id, turno.email)
          }
        }
      }
    }
  }


  return NextResponse.json({date:fechaActual})
}

