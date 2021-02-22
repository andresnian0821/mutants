import "reflect-metadata";
import { StatusCodes } from 'http-status-codes';
import { Response } from "./models/response.model";
import { DiscoverMutantController } from './controller/discover-mutants-controler';
import { AppContainer } from './inversify.config';
import { CONTROLLERS } from './utils/constants';

export function handler(event: any) {
  return new Promise((resolve) => {
    const controller: DiscoverMutantController = AppContainer.get<DiscoverMutantController>(CONTROLLERS.DiscoverMutantController);
     const request = JSON.parse(event.body);
    controller
      .eventHandler(request)
      .then((response) => {
        if (response) {
          return resolve(new Response(StatusCodes.OK, {}));
        } else {
          return resolve(new Response(StatusCodes.FORBIDDEN, {}));
        }
      })
      .catch((err) => {
        console.log(err.message)
        resolve(err);
      });
  });
}
