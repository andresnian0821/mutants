import { inject, injectable } from "inversify";
import { SERVICES, UTILS } from "../utils/constants";
import { RequestValidator } from "../utils/request-validator";
import * as schema from "../resources/schema-request.json";
import { DiscoverMutantService } from "../services/discover-mutants.service";
import { from } from "rxjs";
import { Messages } from '../utils/messages';

@injectable()
export class DiscoverMutantController {
  constructor(
    @inject(UTILS.RequestValidator) private requestValidator: RequestValidator,
    @inject(SERVICES.DiscoverMutantService) private discoverMutanService: DiscoverMutantService,
  ) {}

  public eventHandler(body: any): Promise<boolean> {
    console.log("Body in controller ------>", body);
    return new Promise((resolve, reject) => {
      this.requestValidator
        .validate(body, schema)
        .then((adn) => {
          return this.validateMatrixLength(adn);
        }).then((adn) => {
          return this.discoverMutanService.isMutant(adn);
        }).then(response => {
          return resolve(response);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  private validateMatrixLength(array: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      let lengthRows = array.length;
      let counterlengthColumns = 0;
      from(array).subscribe(response => {
        counterlengthColumns += response.length;
      });
      if (counterlengthColumns/lengthRows == lengthRows) {
        return resolve(array);
      } else {
        return reject(new Error(Messages.MATRIX_LENGHT_FAIL));
      }
    });
  }
}
