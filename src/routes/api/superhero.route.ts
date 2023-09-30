import { Router } from 'express';

import superheroController from '../../controllers/superhero.controller';

import isExist from '../../middlewares/is.exist';
import tryCatch from '../../middlewares/try.catch';
import { Superhero } from '../../entities/superhero.entity';
import uploadFiles from '../../middlewares/upload.files';

const superheroRouter: Router = Router();

superheroRouter.get(
    '',
    tryCatch(superheroController.getAll.bind(superheroController))
);
superheroRouter.get(
    '/:id',
    isExist(Superhero),
    tryCatch(superheroController.getOne.bind(superheroController))
);
superheroRouter.post(
    '',
    uploadFiles(),
    tryCatch(superheroController.createOne.bind(superheroController))
);
superheroRouter.delete(
    '/:id', 
    isExist(Superhero),
    tryCatch(superheroController.deleteOne.bind(superheroController))
);
superheroRouter.put(
    '/:id',
    isExist(Superhero), 
    tryCatch(superheroController.updateOne.bind(superheroController))
);

export default superheroRouter;
