/**
 * Interface del adaptador para el servicio DynamoDb
 * @interface DynamoAdapter
 */
export interface DynamoAdapter {
  /**
	 Funcion que hace la consulta de la información en la tabla de dynamodb
	 * @public
   * @returns {Promise<any>s}
	 */
  get(): Promise<any>;
}
