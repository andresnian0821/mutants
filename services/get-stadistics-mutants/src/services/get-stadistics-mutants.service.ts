/**
 * Interface del servicio de la función lambda
 * @interface GetStadisticsMutantsService
 */
export interface GetStadisticsMutantsService {
  /**
	 Funcion que hace el envío de mensajes a la cola sqs que conecta con la lambda de guardado de información en dynamo
	 * @function getStadistics
	 * @public
   * @returns {Promise<any>}
	 */
  getStadistics(): Promise<any>;
}
