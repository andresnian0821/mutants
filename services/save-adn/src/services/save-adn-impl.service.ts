import { SaveAdnService } from "./save-adn.service";
import { DynamoAdapter } from "../adapter/dynamo/dynamo.adapter";
import { ADAPTERS } from "../utils/constants";
import { Request, Response } from "../models/dynamo-types";
import { injectable, inject } from "inversify";

@injectable()
export class SaveAdnImplService implements SaveAdnService {
  constructor(@inject(ADAPTERS.DynamoAdapter) private dynamoAdapter: DynamoAdapter) {}

  saveAdn(request: Request): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log("Request to service ---", request);
      this.dynamoAdapter
        .save(request)
        .then((responseDynamo: Response) => {
          console.log(responseDynamo);
          resolve(responseDynamo);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
}
