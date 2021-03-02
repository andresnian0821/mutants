import { Request } from "../models/dynamo-types";

/**
 * Interface del servicio
 * @interface SaveAdnService
 */
export interface SaveAdnService {
  /**
   * Funcion principal del servicio para guardar la cadena de adn y saber si la cadena es mutante o No
   * @function saveAdn
   * @public
   * @param {Request} request
   * @returns {Promise<anyq>} Retorno de servicio de guardado
   */
  saveAdn(request: Request): Promise<any>;
}
