import { DiscoverMutantService } from './discover-mutants.service';
import { SqsAdapter } from '../adapter/sqs/sqs-save-adn.adapter';
import { CONSTANTS, ADAPTERS } from '../utils/constants';
import { injectable, inject } from 'inversify';
import { from, Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Class DiscoverMutantImplService para crear instancia del servicio
 * @class
 */
@injectable()
export class DiscoverMutantImplService implements DiscoverMutantService {
	/**
	 * @constructs
	 * @param sqsAdapter 
	 */
	constructor(@inject(ADAPTERS.SQSAdapter) private sqsAdapter: SqsAdapter) {}

	/**
	 * Funcion principal del servicio para determinar si la cadena es de un mutante o no
	 * @function isMutant
	 * @public
	 * @param {string[]} adn 
	 * @returns {Promise<boolean>} true si es mutante false en caso contrario
	 */
	isMutant(adn: string[]): Promise<boolean> {
		return new Promise((resolve, reject) => {
			console.log('ADN', adn);
			zip(
				this.createDiagonalsFromColumns(adn),
				this.createDiagonalsFromRows(adn),
				this.createColumnsFromRows(adn)
			)
				.pipe(map((val: any) => [].concat.apply(adn, val)))
				.subscribe((value) => {
					console.log(value);
					const ocurrancies = this.validateadnArray(value)
					this.sqsAdapter.sendMessage({
						adn: adn,
						isMutant: ocurrancies > 1 ? true : false
					});
					resolve(ocurrancies > 1 ? true : false)
				}, (err) => {
					reject(false);
				});
		});
	}

	/**
	 * Funcion que valida un array de strings y determina si en las cadenas está 
	 * alguno de los arrays validos para determinar si es mutante
	 * @function validateadnArray
	 * @private
	 * @param {string[]} adn 
	 * @returns {number} numero de ocurrencias de los string de mutante
	 */
	private validateadnArray(arrayadn: string[]): number {
		let counterSequence = 0;
		try {
			from(arrayadn).subscribe((adn) => {
				if (
					adn.includes(CONSTANTS.AAAA) ||
					adn.includes(CONSTANTS.CCCC) ||
					adn.includes(CONSTANTS.GGGG) ||
					adn.includes(CONSTANTS.TTTT)
				) {
					counterSequence++;
				}
			});
			return counterSequence;
		} catch (error) {
			return error;
		}
	}

	/**
	 * Funcion que transforma un array de filas en un array de columnas
	 * @function createColumnsFromRows
	 * @private
	 * @param {string[]} adn 
	 * @returns {Observable<string[]>} array de string correspondiente a columnas
	 */
	private createColumnsFromRows(arrayadn: string[]) {
		return new Observable<string[]>((subscriber) => {
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
				subscriber.next(arrayColumn);
			} catch (error) {
				subscriber.error(error);
			} finally {
				subscriber.complete();
			}
		});
	}

	/**
	 * Funcion que de un array de string que representan las filas obtiene un 
	 * array de string correspondiente a las diagonales ascendentes
	 * @function createDiagonalsFromRows
	 * @private
	 * @param {string[]} adn 
	 * @returns {Observable<string[]>} array de string correspondiente a diagonales ascendente
	 */
	private createDiagonalsFromRows(arrayadn: string[]) {
		return new Observable((subscriber) => {
			try {
				let arrayDiagonalTop = [];
				let countInverse = arrayadn.length - 1;
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
				subscriber.next(arrayDiagonalTop);
			} catch (error) {
				subscriber.error(error);
			} finally {
				subscriber.complete();
			}
		});
	}

	/**
	 * Funcion que de un array de string que representan las filas obtiene un 
	 * array de string correspondiente a las diagonales ascendentes
	 * @function createDiagonalsFromColumns
	 * @public
	 * @param {string[]} adn 
	 * @returns {Observable<string[]>} array de string correspondiente a diagonales descendentes
	 */
	private createDiagonalsFromColumns(arrayadn: string[]) {
		return new Observable((subscriber) => {
			try {
				let arrayDiagonalBottom = [];
				let countInverse = arrayadn.length - 1;
				for (let idxRow = 1; idxRow < arrayadn.length - 3; idxRow++) {
					let strPrin = '';
					let strSec = '';
					let counterIdxRow = idxRow;
					let counterIdxRowSec = countInverse;
					for (let idxCol = 0; idxCol < arrayadn.length - idxRow; idxCol++) {
						strPrin += arrayadn[counterIdxRow].charAt(idxCol);
						strSec += arrayadn[counterIdxRow].charAt(counterIdxRowSec);
						counterIdxRow++;
						counterIdxRowSec--;
					}
					arrayDiagonalBottom.push(strPrin);
					arrayDiagonalBottom.push(strSec);
				}
				subscriber.next(arrayDiagonalBottom);
			} catch (error) {
				subscriber.error(error);
			} finally {
				subscriber.complete();
			}
		});
	}
}
