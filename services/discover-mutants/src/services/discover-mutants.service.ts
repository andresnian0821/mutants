/**
 * Interface del servicio
 * @interface DiscoverMutantService
 */
export interface DiscoverMutantService {

  /**
	 * Funcion principal del servicio para determinar si la cadena es de un mutante o no
	 * @function isMutant
	 * @public
	 * @param {string[]} adn 
	 * @returns {Promise<boolean>} true si es mutante false en caso contrario
	 */
  isMutant(adn: string[]): Promise<boolean>;
}
