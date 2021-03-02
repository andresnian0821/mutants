import { Request, Response } from "../../models/dynamo-types";
/**
 * Interface del adaptador para el servicio DynamoDb
 * @interface DynamoAdapter
 */
export interface DynamoAdapter {
  /**
	 Funcion que hace el guardado de la información a la base de datos
	 * @function save
	 * @public
	 * @param {Request} row 
	 */
  save(row: Request): Promise<Response>;
}
