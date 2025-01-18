import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `/workers/pdf.worker.min.mjs`;

export const convertPdfBlobToImage = async (pdfBlobUrl: string): Promise<File> => {
  try {
    const pdfBlob = await fetch(pdfBlobUrl).then((res) => res.blob());

    const pdfUrl = URL.createObjectURL(pdfBlob);

    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdfDoc = await loadingTask.promise;

    const page = await pdfDoc.getPage(1);

    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('No se pudo obtener el contexto del canvas');

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;

    const imgData = canvas.toDataURL('image/png');

    const byteString = atob(imgData.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: 'image/png' });

    const file = new File([blob], 'screenshot.png', { type: 'image/png' });

    return file;
  } catch (error) {
    console.error('Error al convertir el PDF a imagen:', error);
    throw error;
  }
};
