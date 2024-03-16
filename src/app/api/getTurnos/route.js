import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

//Busca los turnos del dia y los retorna
export async function POST(req) {
  const res = await req.json();

  const turnos = await prisma.turno.findMany({
    where: {
      mes: res.mes,
      dia: res.numero,
      year: res.year,
      barbero:res.barbero
    },
  });
  if (turnos[0]!=undefined) {
    return NextResponse.json({ turnos: turnos, message: true });
  } else {
    return NextResponse.json({ message: false });
  }
}