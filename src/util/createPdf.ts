import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { string } from 'yup';

export const createPdf = async (
  { text }: { text: string },
  { filename }: { filename: string },
) => {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  // const page = pdfDoc.addPage();
  // const page1 = pdfDoc.addPage();
  // const { width, height } = page.getSize();
  const fontSize = 16;

  const textParagraph = text.split('\n');
  const arraystring = calcularAlturaCaracteres(textParagraph);
  // console.log(`Altura da página: ${height}px`);
  // console.log(`Altura dos caracteres: ${arraystring}px`);

  // const arrayForString = arraystring.join('\n').toString();

  // page.drawText(arrayForString, {
  //   x: 50,
  //   y: height - 4 * fontSize,
  //   size: fontSize,
  //   font: timesRomanFont,
  //   color: rgb(0, 0, 0),
  //   maxWidth: 500,
  //   lineHeight: fontSize * 1.2,
  // });

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  link.remove();

  function calcularAlturaCaracteres(texto: string[]): void {
    // Cria um elemento <span> temporário para medir a altura de cada caractere
    const charElement = document.createElement('span');
    charElement.style.visibility = 'hidden'; // Torna o elemento invisível
    charElement.style.position = 'absolute'; // Define a posição como absoluta para não interferir no layout

    let totalAltura = 0;
    let text: string[] = [];
    let alturaMaxima = 500;

    for (let i = 0; i < texto.length; i++) {
      // Define o texto do elemento como o caractere atual
      charElement.textContent = texto[i];

      // Adiciona o elemento ao corpo do documento para obter a altura correta
      document.body.appendChild(charElement);

      // Obtém a altura do elemento em pixels
      const charHeight = charElement.offsetHeight;

      // Soma a altura ao total
      totalAltura += charHeight;
      if (totalAltura <= alturaMaxima) {
        text.push(texto[i]);
        const arrayForString = text.join('\n').toString();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        page.drawText(arrayForString, {
          x: 50,
          y: height - 4 * fontSize,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
          maxWidth: 500,
          lineHeight: fontSize * 1.2,
        });
        
      }

      // Remove o elemento do corpo do documento
      document.body.removeChild(charElement);
    }

    // return totalAltura;
    // return text;
  }
};
