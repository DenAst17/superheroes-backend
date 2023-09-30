/* eslint-disable no-console */

import { Response, Request } from 'express';
import SuperheroService from '../services/superhero.service';
import { Superhero } from '../entities/superhero.entity';

export class SuperheroController {
  constructor(private superheroService: SuperheroService) {}

  async getAll(_: Request, res: Response) {
    const result = await this.superheroService.getAll();
    if (result != null) {
      res.send(result);
    } else {
      res.status(404).json({ message: 'Superheros not found' });
    }
  }

  async getOne(req: Request, res: Response) {
    const superheroId = req.params.id;
    const result = await this.superheroService.getOne(parseInt(superheroId, 10));
    if (result != null) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'Superhero not found' });
    }
  }

  async createOne(req: Request, res: Response) {
    const superhero = new Superhero();
    superhero.nickname = req.body.nickname;
    superhero.real_name = req.body.real_name;
    superhero.origin_description = req.body.origin_description;
    superhero.superpowers = req.body.superpowers;
    superhero.catch_phrase = req.body.catch_phrase;
    superhero.images = (req.files as Express.Multer.File[]).map((file) => {
      return file.filename;
    })
    console.log(superhero);
    const result = await this.superheroService.create(superhero);
    console.log(result);
    if (result != null) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'Create error' });
    }
  }

  async deleteOne(req: Request, res: Response) {
    const superheroID = req.params.id;
    const result = await this.superheroService.delete(parseInt(superheroID, 10));
    if (result) {
      res.json({ id: superheroID });
      return;
    }
    res.status(404).json({ message: 'Superhero to delete not found' });
  }

  async updateOne(req: Request, res: Response) {
    const SuperheroID = req.params.id;
    const superhero = new Superhero();
    superhero.nickname = req.body.nickname;
    superhero.real_name = req.body.real_name;
    superhero.origin_description = req.body.origin_description;
    superhero.superpowers = req.body.superpowers;
    superhero.catch_phrase = req.body.catch_phrase;
    superhero.images = [];
    const result = await this.superheroService.update(parseInt(SuperheroID, 10), superhero);
    if (result) {
      res.json({ message: `Updated superhero id = ${result}` });
      return;
    }
    res.status(404).json({ message: 'Superhero to update not found' });
  }
}

const superheroController = new SuperheroController(new SuperheroService());
export default superheroController;
