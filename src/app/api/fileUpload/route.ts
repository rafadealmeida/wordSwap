import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import WordExtractor from 'word-extractor';

const extractor = new WordExtractor();

const keys = /(?<={{)[^{}]+(?=}})/g;

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

    // Verifica se o arquivo é um PDF
    // if (fileToExtract.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileToExtract.type !== 'application/msword') {
    //   return NextResponse.json({
    //     status: 400,
    //     mensagem: 'O arquivo deve ser um doc ou docx',
    //   });
    // }

    // Lê os dados do arquivo
    const fileData = await fileToExtract.arrayBuffer();
    const textData = Buffer.from(fileData);

    // Define o diretório e nome do arquivo no sistema de arquivos
    const uploadDirectory = 'public/arquivos/';
    const fileName = `${Date.now()}_${fileToExtract.name}`;

    // Salva o arquivo PDF no diretório de upload, porem o coloca em uma Promise para
    // garantir que o código aguarde a conclusão dessa operação antes de prosseguir para a próxima etapa.
    await new Promise<void>((resolve, reject) => {
      fs.writeFile(uploadDirectory + fileName, textData, (err) => {
        if (err) {
          console.error(err);
          reject(err);
          return NextResponse.json({
            status: 500,
            mensagem: 'Não foi possível salvar o arquivo',
          });
        } else {
          resolve();
        }
      });
    });

    const extracted = extractor.extract(uploadDirectory + fileName);
    const content = (await extracted).getBody();

    const keysForText = content.match(keys)

    return NextResponse.json({
      status: 201,
      mensagem: 'Arquivo criado com sucesso',
      conteudo: content,
      keys:keysForText,
      path:uploadDirectory + fileName
    });
  } catch (error) {
    return NextResponse.json({
      status: 404,
      mensagem: 'Não foi possível enviar o arquivo',
    });
  }
}

