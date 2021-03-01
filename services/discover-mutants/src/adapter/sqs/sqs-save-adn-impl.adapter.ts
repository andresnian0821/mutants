import { injectable } from "inversify";
import { rowType } from '../../models/dynamo-types';
import { SQS } from 'aws-sdk';
import { SqsAdapter } from './sqs-save-adn.adapter';

@injectable()
export class SqsAdampterImpl implements SqsAdapter {
	sqs = new SQS();

	sendMessage(request: rowType): Promise<any> {
		const params: SQS.SendMessageRequest = {
			QueueUrl: 'https://sqs.us-east-2.amazonaws.com/489774021742/save-mutants-dynamo-sqs',
			MessageBody: JSON.stringify(request)
		};
		return new Promise((resolve, reject) => {
			this.sqs
				.sendMessage(params)
				.promise()
				.then((response) => {
					resolve(response);
				})
				.catch((err) => reject(err));
		});
	}
}
