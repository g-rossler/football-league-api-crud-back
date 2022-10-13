import express from 'express';
import cors from 'cors';
import * as fs from 'fs';
import multer from 'multer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const upload = multer({ dest: './server/uploads/' });
const app = express();
const port = 3333;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.static(`${__dirname}/uploads`));

app.get('/', (req, res) => {
  const equipos = fs.readFileSync('./server/db/teams.db.json');
  const dataParse = JSON.parse(equipos);

  res.send({
    res: dataParse,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
