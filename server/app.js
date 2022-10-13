import express from 'express';
import cors from 'cors';
import * as fs from 'fs';
import multer from 'multer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const upload = multer({ dest: './server/uploads/' });
const app = express();
const PORT = 3333;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.static(`${__dirname}/uploads`));

app.get('/', (req, res) => {
  const fileTeams = fs.readFileSync('./server/db/teams.db.json');
  const dataParse = JSON.parse(fileTeams);

  res.send({
    data: dataParse,
  });
});

app.get('/team/:id', (req, res) => {
  const teamId = Number(req.params.id);
  const fileTeams = fs.readFileSync('./server/db/teams.db.json');
  const dataParse = JSON.parse(fileTeams);
  const selectTeam = dataParse.find((team) => team.id === teamId);
  res.send({
    data: selectTeam,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
