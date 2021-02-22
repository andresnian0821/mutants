import { rowType, itemType } from '../../models/dynamo-types';
export interface DynamoService {
  save(row: rowType): Promise<itemType>;
}
