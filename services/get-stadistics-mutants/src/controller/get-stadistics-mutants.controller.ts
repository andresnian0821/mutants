import { inject, injectable } from "inversify";
import { Response } from "../models/response.model";
import { SERVICES } from "../utils/constants";
import { GetStadisticsMutantsImplService } from "../services/get-stadistics-mutants-impl.service";

/**
 * Class GetStadisticsMutantsController la cual funciona como la fachada de la lambda
 * @class
 */
@injectable()
export class GetStadisticsMutantsController {
  /**
   * @constructs
   * @param [GetStadisticsMutantsImplService]
   */
  constructor(
    @inject(SERVICES.GetStadisticsMutantService)
    private getStadisticsMutantsImplService: GetStadisticsMutantsImplService,
  ) {}

  /**
   * Funcion principal del controller que devuleve las estadisticas del las peticiones hechas
   * @function eventHandler
   * @public
   * @returns {Promise<any>} retorna las estadisticas guardadas en la base de datos DynamoDb
   */
  public eventHandler(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getStadisticsMutantsImplService
        .getStadistics()
        .then((data) => resolve(data))
        .catch((err: Response) => {
          reject(err);
          console.error("ERROR: ", err);
        });
    });
  }
}
