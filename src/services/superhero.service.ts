/* eslint-disable no-console */

import { Superhero } from '../entities/superhero.entity';
import { AppDataSource } from '../config/database';
import fs from 'fs';
import path from 'path';

export default class SuperheroService {
  repository = AppDataSource.getRepository(Superhero);

  async getAll() {
    console.log(1);
    try {
      const allSuperheros = await this.repository.find();
      console.log(allSuperheros)
      return allSuperheros;
    } catch (err) {
      console.error(err);
    }
    return null;
  }

  async getOne(superheroID: number) {
    const foundSuperhero = await this.repository.findOneBy({
      id: superheroID
    });
    return foundSuperhero;
  }

  async create(superhero: Superhero) {
    return AppDataSource.manager.save(superhero);
  }

  async delete(superheroID: number) {
    const foundSuperhero = await this.repository.findOneBy({
      id: superheroID
    });
    if (!foundSuperhero) {
      return null;
    }
    try {
      foundSuperhero.images.forEach(image => {
        console.log(path.resolve(__dirname, "../../images") + '/' + image);
        fs.unlink(path.resolve(__dirname, "../../images") + '/' + image, (err) => {});
      })
    }
    finally {

    }
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(Superhero)
      .where('id = :id', { id: superheroID })
      .execute();
    return superheroID;
  }

  updateInfo(superheroToUpdate: Superhero, superhero: Superhero) {
    superheroToUpdate.nickname = superhero.nickname;
    superheroToUpdate.real_name = superhero.real_name;
    superheroToUpdate.origin_description = superhero.origin_description;
    superheroToUpdate.superpowers = superhero.superpowers;
    superheroToUpdate.catch_phrase = superhero.catch_phrase;
    superheroToUpdate.images.push(...superhero.images);
  }

  async update(superheroID: number, superhero: Superhero) {
    const superheroToUpdate = await this.getOne(superheroID);
    if (superheroToUpdate) {
      this.updateInfo(superheroToUpdate, superhero);
      await this.repository.save(superheroToUpdate);
      return superheroToUpdate.id;
    }
    return null;
  }
}
