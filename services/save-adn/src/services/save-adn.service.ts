import { Request } from "../models/dynamo-types";

export interface SaveAdnService {
  saveAdn(request: Request): Promise<any>;
}
