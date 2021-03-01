import "reflect-metadata";
import { StatusCodes } from 'http-status-codes';
import { Response } from "./models/response.model";
import { DiscoverMutantController } from './controller/discover-mutants-controler';
import { AppContainer } from './inversify.config';
import { CONTROLLERS } from './utils/constants';
import { Messages } from './utils/messages';

export function handler(event: any) {
  return new Promise((resolve) => {
    const controller: DiscoverMutantController = AppContainer.get<DiscoverMutantController>(CONTROLLERS.DiscoverMutantController);
     const request = JSON.parse(event.body);
    controller
      .eventHandler(request)
      .then((response) => {
        if (response) {
          return resolve(new Response(StatusCodes.OK, {
            message: Messages.ADN_MUTANT
          }));
        } else {
          return resolve(new Response(StatusCodes.FORBIDDEN, {
            message: Messages.ADN_HUMAN
          }));
        }
      })
      .catch((err) => {
        return resolve(new Response(StatusCodes.FORBIDDEN, {message: err.message}));
      });
  });
}
