import { inject, injectable } from "inversify";
import { SERVICES, UTILS } from "../utils/constants";
import { RequestValidator } from "../utils/request-validator";
import * as schema from "../resources/schema-request.json";
import { DiscoverMutantService } from "../services/discover-mutants.service";
import { from } from "rxjs";
import { Messages } from '../utils/messages';

/**
 * Class DiscoverMutantController la cual funciona como la fachada de la lambda
 * @class
 */
@injectable()
export class DiscoverMutantController {
  /**
	 * @constructs
	 * @param [RequestValidator, DiscoverMutantService]
	 */
  constructor(
    @inject(UTILS.RequestValidator) private requestValidator: RequestValidator,
    @inject(SERVICES.DiscoverMutantService) private discoverMutanService: DiscoverMutantService,
  ) {}

  /**
	 * Funcion principal del controller para determinar si la cadena es de un mutante o no
	 * @function eventHandler
	 * @public
	 * @param {any} body 
	 * @returns {Promise<boolean>} true si es mutante false en caso contrario
	 */
  public eventHandler(body: any): Promise<boolean> {
    console.log("Body in controller ------>", body);
    return new Promise((resolve, reject) => {
      this.requestValidator
        .validate(body, schema)
        .then((adn) => {
          return this.validateMatrixLength(adn);
        }).then((adn) => {
          return this.discoverMutanService.isMutant(adn);
        }).then(response => {
          return resolve(response);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  /**
	 * Funcion que valida la longitud de la matriz 
	 * @function validateMatrixLength
	 * @private
	 * @param {string[]} adn 
	 * @returns {Promise<string[]>} numero de ocurrencias de los string de mutante
	 */
  private validateMatrixLength(array: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      let lengthRows = array.length;
      let counterlengthColumns = 0;
      from(array).subscribe(response => {
        counterlengthColumns += response.length;
      });
      if (counterlengthColumns/lengthRows == lengthRows) {
        return resolve(array);
      } else {
        return reject(new Error(Messages.MATRIX_LENGHT_FAIL));
      }
    });
  }
}
