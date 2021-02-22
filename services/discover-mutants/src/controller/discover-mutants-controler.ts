import { inject, injectable } from "inversify";
import { Response } from "../models/response.model";
import { SERVICES, UTILS } from "../utils/constants";
import { RequestValidator } from "../utils/request-validator";
import * as schema from "../resources/schema-request.json";
import { DiscoverMutantService } from "../services/discover-mutants.service";
import { from } from "rxjs";

@injectable()
export class DiscoverMutantController {
  constructor(
    @inject(UTILS.RequestValidator) private requestValidator: RequestValidator,
    @inject(SERVICES.DiscoverMutantService) private discoverMutanService: DiscoverMutantService,
  ) {}

  public eventHandler(body: any): Promise<boolean | Response> {
    console.log("Body in controller ------>", body);
    return new Promise((resolve, reject) => {
      this.requestValidator
        .validate(body, schema)
        .then((adn) => {
          console.log("Request Validated")
          return this.validateMatrixLength(adn);
        }).then(() => {
          console.log("Matrix validated")
          return this.discoverMutanService.isMutant(body.dna);
        }).then(response => {
          return resolve(response);
        })
        .catch((err: Response) => {
          return reject(err);
        });
    });
  }

  private validateMatrixLength(array: string[]): Promise<boolean> {
    return new Promise((resolve) => {
      let lengthRows = array.length;
      let counterlengthColumns = 0;
      from(array).subscribe(response => {
        counterlengthColumns += response.length;
      });
      if (counterlengthColumns/lengthRows == lengthRows) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  }
}
