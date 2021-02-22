import { DiscoverMutantService } from './discover-mutants.service';
import { DynamoService } from '../adapter/dynamo/dynamo.service'
import { CONSTANTS, ADAPTERS } from '../utils/constants';
import { itemType } from '../models/dynamo-types';
import { injectable, inject } from 'inversify';
import { from } from 'rxjs';

@injectable()
export class DiscoverMutantImplService implements DiscoverMutantService {
	constructor(@inject(ADAPTERS.DynamoAdapter) private dynamoAdapter: DynamoService) {}

	isMutant(adn: string[]): Promise<any> {
		return new Promise((resolve, reject) => {
			console.log("ADN", adn);
			let arrayConcat: any[] = [];
			arrayConcat = arrayConcat.concat(adn);
			let ocurrancies = 0;
			this.createColumnsFromRows(adn)
				.then((adnColumns: any) => {
					console.log("1");
					arrayConcat = arrayConcat.concat(adnColumns);
					return this.createDiagonalsFromRows(adn);
				})
				.then((diagonaladnTop: any) => {
					console.log("2");
					arrayConcat = arrayConcat.concat(diagonaladnTop);
					return this.createDiagonalsFromColumns(adn);
				})
				.then((diagonaladnBottom: any) => {
					console.log("3");
					arrayConcat = arrayConcat.concat(diagonaladnBottom);
					return this.validateadnArray(arrayConcat);
				})
				.then((adnValidation: any) => {
					console.log("4");
					ocurrancies = adnValidation;
					return this.dynamoAdapter.save({
						adn: adn,
						isMutant: ocurrancies > 1 ? true : false
					})
				})
				.then((responseDynamo: itemType) => {
					console.log("=====", responseDynamo)
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
        for (let idxCol = 0; idxCol < arrayadn.length - 3; idxCol++) {
          let str = '';
          let counterIdxCol = idxCol;
          for (let idxRow = 0; idxRow < arrayadn.length; idxRow++) {
            str += arrayadn[idxRow].charAt(counterIdxCol)
            counterIdxCol++;
          }
          arrayDiagonalTop.push(str);
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
        for (let idxRow = 1; idxRow < arrayadn.length - 3; idxRow++) {
          let str = '';
          let counterIdxRow = idxRow;
          for (let idxCol = 0; idxCol < arrayadn.length - idxRow; idxCol++) {
            str += arrayadn[counterIdxRow].charAt(idxCol)
            counterIdxRow++;
          }
          arrayDiagonalBottom.push(str)
        }
        resolve(arrayDiagonalBottom);
			} catch (error) {
				reject(error);
			}
    });
	}
}
