import { GetStadisticsMutantsService } from "./get-stadistics-mutants.service";
import { injectable, inject } from "inversify";
import { ADAPTERS } from "../utils/constants";
import { DynamoAdapter } from "../adapter/dynamo/dynamo.adapter";

@injectable()
export class GetStadisticsMutantsImplService implements GetStadisticsMutantsService {
  constructor(@inject(ADAPTERS.DynamoAdapter) private dynamoAdapter: DynamoAdapter) {}

  /**
   * función que ejecuta el llamado del adaptador haciendo la consulta a la base de datos dynamoDB
   * @function getStadistics
   * @public
   * @returns {Promise<any>}
   */
  public getStadistics(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dynamoAdapter
        .get()
        .then((data) => {
          console.log(data);
          const response = {
            count_mutant_dna: this.getMutants(data),
            count_human_dna: this.getHumans(data),
            ratio: this.calculateRatio(data),
          };
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  }

  /**
   * Función que calcula el ratio de los datos almacenados en la Bd
   * @function calculateRatio
   * @private
   * @returns {number}
   */
  private calculateRatio(data: any): number {
    return this.getMutants(data) / this.getHumans(data);
  }

  /**
   * Función que devuelve el resultado de el numero de humanos guardados en la base de datos
   * este calculo lo hace teniendo en cuenta que l abase de datos devuelve el total de elementos
   * Y se hace una resta con el numero de mutantes para obtener el resultado
   * @function getHumans
   * @private
   * @returns {number>}
   */
  private getHumans(data: any): number {
    return data.ScannedCount - data.Count;
  }

  /**
   * Funcion que devuelve el numero de registros de mutantes como resultado de la consulta a la bd
   * @function getMutants
   * @private
   * @returns {number}
   */
  private getMutants(data: any): number {
    return data.Count;
  }
}
