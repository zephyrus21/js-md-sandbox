import express from 'express';
import path from 'path';
import fs from 'fs/promises';

interface Cell {
  id: string;
  content: string;
  type: 'code' | 'text';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    //! Read the file
    try {
      const result = await fs.readFile(fullPath, 'utf-8');
      //! Read the file and parse cells and send to browser
      res.send(JSON.parse(result));
    } catch (err) {
      //! IF file doesn't exist
      if (err.code === 'ENOENT') {
        //! Create a file and add some default cells
        await fs.writeFile(fullPath, '[]', 'utf-8');
        res.send([]);
      } else {
        throw err;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    //! Take the list of cells from req obj, serialize them
    const { cells }: { cells: Cell[] } = req.body;
    // ! and write cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};
