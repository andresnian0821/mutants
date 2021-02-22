import { RequestValidator } from '../../src/utils/request-validator';
import * as schema from '../../src/resources/schema-request.json';
import { StatusCodes } from 'http-status-codes';


describe('Request Validator test', () => {
	let requestValidator: RequestValidator;
	beforeEach(() => {
		requestValidator = new RequestValidator();
	});

  it('Succes Request Validator', (done) => {
    const request = {
		dna: [ 'ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG' ]
	};
    requestValidator.validate(request ,schema)
      .then((resp) => {
        expect(resp).toEqual(request.dna)
        done();
      });
  });
  
  it('Fail Request Validator', (done) => {
    const request = {
      dna: "Test Fail"
    };
    requestValidator.validate(request ,schema)
      .catch((err) => {
        expect(err.statusCode).toEqual(StatusCodes.NOT_FOUND)
        done();
      });
	});
});
