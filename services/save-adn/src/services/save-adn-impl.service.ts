import { SaveAdnService } from "./save-adn.service";
import { DynamoAdapter } from "../adapter/dynamo/dynamo.adapter";
import { ADAPTERS } from "../utils/constants";
import { Request, Response } from "../models/dynamo-types";
import { injectable, inject } from "inversify";

/**
 * Class DiscoverMutantImplService para crear instancia del servicio
 * @class
 */
@injectable()
export class SaveAdnImplService implements SaveAdnService {
  /**
   * @constructs
   * @param DynamoAdapter
   */
  constructor(@inject(ADAPTERS.DynamoAdapter) private dynamoAdapter: DynamoAdapter) {}

  /**
   * Funcion principal del servicio para guardar la información en la base de datos
   * @function saveAdn
   * @public
   * @param {Request} request
   * @returns {Promise<any>} promesa que devuelve el resultado del guardado en la base de datos
   */
  saveAdn(request: Request): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log("Request to service ---", request);
      this.dynamoAdapter
        .save(request)
        .then((responseDynamo: Response) => {
          console.log(responseDynamo);
          resolve(responseDynamo);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
}
