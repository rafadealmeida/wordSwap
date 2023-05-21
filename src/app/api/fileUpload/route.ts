// // import { NextApiRequest, NextApiResponse } from 'next';
// import { NextResponse, NextRequest } from 'next/server';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const files = formData.getAll('file') as File[];
//     const fileToExtract = files[0];
//     console.log('arquivo', fileToExtract.name);

//     return NextResponse.json({
//       status: 201,
//       mensagem: 'Arquivo criado com sucesso',
//     });
//   } catch (error) {
//     return NextResponse.json({
//       status: 404,
//       mensagem: 'Não foi possivel enviar o arquivo',
//     });
//   }
// }

// export async function GET() {
//   return NextResponse.json({
//     nome: 'Gallermo',
//   });
// }

// // Thats it, you have your files
// /*
//     returns [
//       {
//         name: 'test.jpg',
//         type: 'image/jpg',
//         size: 1024,
//         ...other file props
//       }
//     ]
//   */

import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('file') as File[];
    const fileToExtract = files[0];
    console.log('arquivo', fileToExtract.name);

    // Verifica se o arquivo é um PDF
    if (fileToExtract.type !== 'application/pdf') {
      return NextResponse.json({
        status: 400,
        mensagem: 'O arquivo deve ser um PDF',
      });
    }

    // Lê os dados do arquivo
    const fileData = await fileToExtract.arrayBuffer();
    const pdfData = Buffer.from(fileData);

    // Define o diretório e nome do arquivo no sistema de arquivos
    const uploadDirectory = 'public/arquivos';
    const fileName = fileToExtract.name;

    // Salva o arquivo PDF no diretório de upload
    fs.writeFile(uploadDirectory + fileName, pdfData, (err) => {
      if (err) {
        console.error(err);
        return NextResponse.json({
          status: 500,
          mensagem: 'Erro ao salvar o arquivo PDF',
        });
      }

      return NextResponse.json({
        status: 201,
        mensagem: 'Arquivo criado com sucesso',
      });
    });
  } catch (error) {
    return NextResponse.json({
      status: 404,
      mensagem: 'Não foi possível enviar o arquivo',
    });
  }
}

export async function GET() {
  return NextResponse.json({
    nome: 'Gallermo',
  });
}
