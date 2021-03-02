import { injectable } from 'inversify';
import { rowType } from '../../models/dynamo-types';
import { SQS } from 'aws-sdk';
import { SqsAdapter } from './sqs-save-adn.adapter';
import { URL_SQS } from '../../utils/constants';

/**
 * Class de la implementación del adaptador que sirve de conexión al servicio SQS
 * @class
 */
@injectable()
export class SqsAdampterImpl implements SqsAdapter {
	sqs = new SQS();

	/**
	 * Funcion que hace el envío de mensajes a la cola sqs que conecta con la lambda de guardado de información en dynamo
	 * @function sendMessage
	 * @public
	 * @param {rowType} request 
	 */
	sendMessage(request: rowType): void {
		const params: SQS.SendMessageRequest = {
			QueueUrl: URL_SQS,
			MessageBody: JSON.stringify(request)
		};
		this.sqs.sendMessage(params).promise().then(console.log).catch(console.error);
	}
}
