import { injectable } from "inversify";
import { DynamoAdapter } from "./dynamo.adapter";
import * as uuid from "uuid";
import { DynamoDB } from "aws-sdk";
import { DYNAMO_CONST } from "../../utils/constants";
import { Request, Response } from "../../models/dynamo-types";

/**
 * Class de la implementación del adaptador que sirve de conexión al servicio DynamoDb
 * @class
 */
@injectable()
export class DynamoImplAdapter implements DynamoAdapter {
  dynamo = new DynamoDB.DocumentClient();

  /**
	 Funcion que hace el guardado de la información a la base de datos
	 * @function save
	 * @public
	 * @param {Request}
   * @returns {Promise<Response>}
	 */
  public save(row: Request): Promise<Response> {
    const params = {
      TableName: DYNAMO_CONST.TABLE,
      Item: {
        id: uuid.v1(),
        adn: row.adn.toString(),
        isMutant: row.isMutant,
      },
    };
    return new Promise((resolve, reject) => {
      this.dynamo
        .put(params)
        .promise()
        .then((response) => {
          console.log(response);
          return resolve(params.Item);
        })
        .catch((err) => {
          console.log(err);
          return reject(err);
        });
    });
  }
}
