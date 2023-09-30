import { Request, Response, NextFunction } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import { AppDataSource } from '../config/database';
import tryCatch from './try.catch';

const isExist = (entity: EntityTarget<ObjectLiteral>) =>
    tryCatch(async (req: Request, _res: Response, next: NextFunction) => {
        const { id } = req.params;
        const entityRepository = AppDataSource.getRepository(entity);
        const result = await entityRepository.findOneBy({ id });

        if (!result) {
            throw new Error("Entity" + entityRepository.metadata.name + " with this id not found");
        }

        next();
    });

export default isExist;