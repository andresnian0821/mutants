import { DiscoverMutantService } from './discover-mutants.service';
import { SqsAdapter } from '../adapter/sqs/sqs-save-adn.adapter'
import { CONSTANTS, ADAPTERS } from '../utils/constants';
import { itemType } from '../models/dynamo-types';
import { injectable, inject } from 'inversify';
import { from } from 'rxjs';

@injectable()
export class DiscoverMutantImplService implements DiscoverMutantService {
	constructor(@inject(ADAPTERS.SQSAdapter) private sqsAdapter: SqsAdapter) {}

	isMutant(adn: string[]): Promise<boolean> {
		return new Promise((resolve, reject) => {
			console.log("ADN", adn);
			let arrayConcat: any[] = [];
			arrayConcat = arrayConcat.concat(adn);
			let ocurrancies = 0;
			this.createColumnsFromRows(adn)
				.then((adnColumns: any) => {
					arrayConcat = arrayConcat.concat(adnColumns);
					return this.createDiagonalsFromRows(adn);
				})
				.then((diagonalAdnTop: any) => {
					arrayConcat = arrayConcat.concat(diagonalAdnTop);
					return this.createDiagonalsFromColumns(adn);
				})
				.then((diagonalAdnBottom: any) => {
					arrayConcat = arrayConcat.concat(diagonalAdnBottom);
					console.log(arrayConcat)
					return this.validateadnArray(arrayConcat);
				})
				.then((adnValidation: any) => {
					ocurrancies = adnValidation;
					return this.sqsAdapter.sendMessage({
						adn: adn,
						isMutant: ocurrancies > 1 ? true : false
					})
				})
				.then((responseSqs: itemType) => {
					console.log("=====", responseSqs)
					ocurrancies > 1 ? resolve(true) : resolve(false);
				})
				.catch((err) => reject(err));
		})
	}

	private validateadnArray(arrayadn: string[]): Promise<number> {
		return new Promise((resolve, reject) => {
			let counterSequence = 0;
			try {
				from(arrayadn).subscribe((adn) => {
					if (
						adn.includes(CONSTANTS.AAAA) || adn.includes(CONSTANTS.CCCC) ||
						adn.includes(CONSTANTS.GGGG) || adn.includes(CONSTANTS.TTTT)
					) {
						counterSequence++;
					}
				});
				resolve(counterSequence);
			} catch (error) {
				reject(error);
			}
		});
	}

	private createColumnsFromRows(arrayadn: string[]) {
		return new Promise((resolve, reject) => {
			try {
				let lengthArray = arrayadn.length;
				let arrayFull = arrayadn.join('');
				let arrayColumn = [];
				for (let firstIndex = 0; firstIndex < lengthArray; firstIndex++) {
					let string = '';
					for (
						let secondIndex = firstIndex;
						secondIndex < arrayFull.length;
						secondIndex = secondIndex + lengthArray
					) {
						string += arrayFull.charAt(secondIndex);
					}
					arrayColumn.push(string);
				}
				resolve(arrayColumn);
			} catch (error) {
				reject(error);
			}
		});
	}

	private createDiagonalsFromRows(arrayadn: string[]) {
		return new Promise((resolve, reject) => {
      try {
				let arrayDiagonalTop = []
				let countInverse = arrayadn.length-1;
        for (let idxCol = 0; idxCol < arrayadn.length - 3; idxCol++) {
					let strPrin = '';
					let strSec = '';
					let counterIdxColPrin = idxCol;
					let counterIdxColSec = countInverse;
          for (let idxRow = 0; idxRow < arrayadn.length; idxRow++) {
						strPrin += arrayadn[idxRow].charAt(counterIdxColPrin);
						strSec += arrayadn[idxRow].charAt(counterIdxColSec);
						counterIdxColPrin++;
						counterIdxColSec--;
					}
					countInverse--;
					arrayDiagonalTop.push(strPrin);
					arrayDiagonalTop.push(strSec);
        }
        resolve(arrayDiagonalTop)
			} catch (error) {
				reject(error);
			}
		});
	}

	private createDiagonalsFromColumns(arrayadn: string[]) {
    return new Promise((resolve, reject) => {
      try {
				let arrayDiagonalBottom = []
				let countInverse = arrayadn.length-1;
        for (let idxRow = 1; idxRow < arrayadn.length - 3; idxRow++) {
          let strPrin = '';
					let strSec = '';
					let counterIdxRow = idxRow;
					let counterIdxRowSec = countInverse;
          for (let idxCol = 0; idxCol < arrayadn.length - idxRow; idxCol++) {
						strPrin += arrayadn[counterIdxRow].charAt(idxCol)
						strSec += arrayadn[counterIdxRow].charAt(counterIdxRowSec)
						counterIdxRow++;
						counterIdxRowSec--;
					}
					arrayDiagonalBottom.push(strPrin)
					arrayDiagonalBottom.push(strSec)
        }
        resolve(arrayDiagonalBottom);
			} catch (error) {
				reject(error);
			}
    });
	}
}
