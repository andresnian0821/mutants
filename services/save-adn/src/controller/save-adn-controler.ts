import { inject, injectable } from "inversify";
import { SERVICES } from "../utils/constants";
import { SaveAdnService } from "../services/save-adn.service";

@injectable()
export class SaveAdnController {
  constructor(@inject(SERVICES.SaveAdnService) private saveAdnService: SaveAdnService) {}

  public eventHandler(body: any): Promise<boolean | Response> {
    console.log("Body in controller ------>", body);
    return new Promise((resolve, reject) => {
      this.saveAdnService
        .saveAdn(body)
        .then((response) => {
          return resolve(response);
        })
        .catch((err: Response) => {
          return reject(err);
        });
    });
  }
}
