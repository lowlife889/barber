import { exec } from 'child_process';
import { NextResponse } from 'next/server';

export async function POST() {
  let data="hola";
  // Creamos una promesa para ejecutar el script Python
  const executeScript = () => {
    return new Promise((resolve, reject) => {
      exec('python'+ __dirname + 'src/app/scripts/py.py', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar el script: ${error}`);
          reject(error);
        } else {
          console.log(`Resultado del script: ${stdout}`);
          resolve(stdout.trim()); 
        }
      });
    });
  };
  data = await executeScript();
  return NextResponse.json({ message: data });
}