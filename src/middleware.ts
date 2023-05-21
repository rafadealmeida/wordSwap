import { NextResponse } from 'next/server';
import multer from 'multer';
import { storage } from './multerConfig';


// const upload = multer({ storage: storage });

export function middleware(req: Request) {
  console.log('Middleware');
  // const formData = await req.formData();
  // const files = formData.getAll('file') as File[];
  // const fileToExtract = files[0];
  // console.log(fileToExtract);

  // upload.single('file');

  // return NextResponse.next();
}

export const config = {
  matcher: '/api/fileUpload',
};
