import { inject, injectable } from "inversify";
import { Response } from "../models/response.model";
import { SERVICES } from "../utils/constants";
import { GetStadisticsMutantsImplService } from "../services/get-stadistics-mutants-impl.service";

@injectable()
export class GetStadisticsMutantsController {
  constructor(
    @inject(SERVICES.GetStadisticsMutantService)
    private getStadisticsMutantsImplService: GetStadisticsMutantsImplService,
  ) {}

  public eventHandler(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getStadisticsMutantsImplService
        .getStadistics()
        .then((data) => resolve(data))
        .catch((err: Response) => {
          reject(err);
          console.error("ERROR: ", err);
        });
    });
  }
}
