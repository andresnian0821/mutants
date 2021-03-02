import { inject, injectable } from "inversify";
import { SERVICES } from "../utils/constants";
import { SaveAdnService } from "../services/save-adn.service";

/**
 * Class SaveAdnController la cual funciona como la fachada de la lambda
 * @class
 */
@injectable()
export class SaveAdnController {
  /**
   * @constructs
   * @param [saveAdnService]
   */
  constructor(@inject(SERVICES.SaveAdnService) private saveAdnService: SaveAdnService) {}

  /**
   * Funcion principal del controller para guardado en la base de datos DynamoDb
   * @function eventHandler
   * @public
   * @param {any} body
   * @returns {Promise<boolean | Response>}
   */
  public eventHandler(body: any): Promise<boolean | Response> {
    console.log("Body in controller ------>", body);
    return new Promise((resolve, reject) => {
      this.saveAdnService
        .saveAdn(body)
        .then((response) => {
          return resolve(response);
        })
        .catch((err: Response) => {
          return reject(err);
        });
    });
  }
}
