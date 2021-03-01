import { rowType } from '../../models/dynamo-types';

export interface SqsAdapter{
  sendMessage(request: rowType): Promise<any>;
}