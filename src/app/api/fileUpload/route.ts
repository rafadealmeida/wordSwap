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
    if (
      fileToExtract.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileToExtract.type === 'application/msword'
    ) {
      // Lê os dados do arquivo
      const fileData = await fileToExtract.arrayBuffer();
      const textData = Buffer.from(fileData);

      const extracted = extractor.extract(textData);
      const content = (await extracted).getBody();

      const keysForText = content.match(keys);

      return NextResponse.json({
        status: 201,
        mensagem: 'Texto extraido do arquivo com sucesso',
        conteudo: content,
        keys: keysForText,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 404,
      mensagem: 'Não foi possível enviar o arquivo',
    });
  }
}
