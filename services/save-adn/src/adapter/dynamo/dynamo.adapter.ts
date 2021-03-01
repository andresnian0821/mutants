import { Request, Response } from "../../models/dynamo-types";
export interface DynamoAdapter {
  save(row: Request): Promise<Response>;
}
