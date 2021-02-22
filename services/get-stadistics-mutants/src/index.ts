import { StatusCodes } from "http-status-codes";
import "reflect-metadata";
import { GetStadisticsMutantsController } from "./controller/get-stadistics-mutants.controller";
import { AppContainer } from "./inversify.config";
import { Response } from "./models/response.model";
import { CONTROLLERS } from "./utils/constants";

export function handler(event: any) {
  return new Promise((resolve, reject) => {
    const controller: GetStadisticsMutantsController = AppContainer.get<GetStadisticsMutantsController>(
      CONTROLLERS.GetStadisticsMutantController,
    );
    controller
      .eventHandler()
      .then((data) => {
        resolve(new Response(StatusCodes.OK, { data: data }));
      })
      .catch((err) => {
        reject(err);
      });
  });
}
