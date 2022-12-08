import express from 'express';
import fileUpload from 'express-fileupload';
import userRouter from '../routes/users.routes.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './upload',
  })
);

app.use(userRouter);
app.use(express.static(join(__dirname, '../../client/build')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../../client/build/index.html'));
});

export default app;
