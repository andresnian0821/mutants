import { injectable } from "inversify";
import { DynamoAdapter } from "./dynamo.adapter";
import { DynamoDB } from "aws-sdk";
import { DYNAMO_CONST } from "../../utils/constants";

/**
 * Class de la implementación del adaptador que sirve para realizar
 * las consultas a la base de datos DynamoDb
 * @class
 * @implements {DynamoAdapter}
 */
@injectable()
export class DynamoImplAdapter implements DynamoAdapter {
  dynamo = new DynamoDB.DocumentClient();

  /**
   * Funcion que hace la consulta de la información en la tabla de dynamodb
   * Esta funcion implementa los parametros FilterExpression el cual es la condición
   * para realizar las busquedas de mutantes, ademas de la función Select = COUNT,
   * la cual hace el conteo de los registros que cumplan la condición dada
   * @public
   * @returns {Promise<any>}
   */
  public get(): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: DYNAMO_CONST.TABLE,
        FilterExpression: "isMutant = :isMutantFilter",
        ExpressionAttributeValues: {
          ":isMutantFilter": true,
        },
        Select: "COUNT",
      };

      this.dynamo
        .scan(params)
        .promise()
        .then((data: any) => {
          console.log("la dataaaaaa repository", data);
          return resolve(data);
        })
        .catch((err: any) => {
          console.log("ell errorrrr repository ---->", err);
          return reject(err);
        });
    });
  }
}
