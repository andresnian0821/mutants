import { rowType } from '../../models/dynamo-types';

/**
 * Interface del adaptador para el servicio SQS
 * @interface SqsAdapter
 */
export interface SqsAdapter{

   /**
	 Funcion que hace el envío de mensajes a la cola sqs que conecta con la lambda de guardado de información en dynamo
	 * @function sendMessage
	 * @public
	 * @param {rowType} request 
	 */
  sendMessage(request: rowType): void;
}