import { GetStadisticsMutantsService } from "./get-stadistics-mutants.service";
import { injectable, inject } from "inversify";
import { ADAPTERS } from "../utils/constants";
import { DynamoAdapter } from "../adapter/dynamo/dynamo.adapter";

@injectable()
export class GetStadisticsMutantsImplService implements GetStadisticsMutantsService {
  constructor(@inject(ADAPTERS.DynamoAdapter) private dynamoAdapter: DynamoAdapter) {}

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

  private calculateRatio(data: any): number {
    return this.getMutants(data) / this.getHumans(data);
  }

  private getHumans(data: any): number {
    return data.ScannedCount - data.Count;
  }

  private getMutants(data: any): number {
    return data.Count;
  }
}
