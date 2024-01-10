import {Storage} from '@google-cloud/storage';
import path from 'path';
import {format} from 'util';

const serviceKey = path.join(
  __dirname,
  '../certs/august-oarlock-410522-d7600b4363bc.json',
);

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'august-oarlock-410522',
});
const bucket = storage.bucket('madcamp');

export const uploadImage = async (userId: number, file: Express.Multer.File) =>
  await new Promise<string>((resolve, reject) => {
    const {originalname, buffer} = file;

    const blob = bucket.file(
      `user${userId}_${Date.now()}.${
        originalname.split(`.`)[originalname.split(`.`).length - 1]
      }`,
    );
    // const blob = bucket.file(originalname.replace(/ /g, '_'));
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on('finish', () => {
        const publicUrl = format(
          `https://storage.googleapis.com/madcamp/${blob.name}`,
        );
        resolve(publicUrl);
      })
      .on('error', err => {
        reject(new Error(`Unable to upload image. Error: ${err.toString()}`));
      })
      .end(buffer);
  });
