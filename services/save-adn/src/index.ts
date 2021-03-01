/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { SaveAdnController } from "./controller/save-adn-controler";
import { AppContainer } from "./inversify.config";
import { CONTROLLERS } from "./utils/constants";
import { Response } from "./models/response.model";

export function handler(event: any) {
  return new Promise((resolve, reject) => {
    const controller: SaveAdnController = AppContainer.get<SaveAdnController>(CONTROLLERS.SaveAdnController);
    console.log("event =>", event);
    event.Records.forEach((record: any) => {
      console.log("Record =>", record);
      const request = JSON.parse(record.body);
      controller
        .eventHandler(request)
        .then((response) => {
          console.log(response);
          resolve(new Response(StatusCodes.OK, {}));
        })
        .catch((err) => {
          console.log(err);
          reject(new Response(StatusCodes.FORBIDDEN, {}));
        });
    });
  });
}
