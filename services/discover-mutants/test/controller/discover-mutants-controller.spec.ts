import "reflect-metadata";
import { DiscoverMutantController } from "../../src/controller/discover-mutants-controler";
import { StatusCodes } from 'http-status-codes';
import { Response } from "../../src/models/response.model";
import { Messages } from "../../src/utils/messages";

describe("Controller test Success", () => {
  const serviceSpy = jasmine.createSpyObj("discoverMutanService", ["isMutant"]);
  const requestValidatorSpy = jasmine.createSpyObj("requestValidator", ["validate"]);

  const isMutantSpy = serviceSpy.isMutant as jasmine.Spy;
  const validateSpy = requestValidatorSpy.validate as jasmine.Spy;

  let controller: DiscoverMutantController;

  const request = {
      dna: ["ATGCGA", "CAGTGC", "TTCTGT", "AGAAAG", "CCACTA", "TCACTG"]
  };
  
  beforeEach(() => {
    controller = new DiscoverMutantController(requestValidatorSpy, serviceSpy);
  });

  it("should create a controller", () => {
    expect(controller).toBeDefined();
  });

  it("should discover Mutant result", (done) => {
    const result = Promise.resolve(true);
    const resultValidate = Promise.resolve(request.dna);
    isMutantSpy.and.returnValue(result);
    validateSpy.and.returnValue(resultValidate);

    controller.eventHandler(request).then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });
});

describe("Controller test Fail", () => {
  const serviceSpy = jasmine.createSpyObj("discoverMutanService", ["isMutant"]);
  const requestValidatorSpy = jasmine.createSpyObj("requestValidator", ["validate"]);
  
  const isMutantSpy = serviceSpy.isMutant as jasmine.Spy;
  const validateSpy = requestValidatorSpy.validate as jasmine.Spy;

  let controller: DiscoverMutantController;

  const request = {
      dna: ["ATGCGA", "CAGTGC", "TTCTGT", "AGAAAG", "CCACTA", "TCACTG"]
  };

  const requestaFail = {
      dna: ["ATGCGA", "CAGTGC", "TTCTGT", "AGAAAG", "CCACTA", "TCACT"]
  };
  
  beforeEach(() => {
    controller = new DiscoverMutantController(requestValidatorSpy, serviceSpy);
  });

  it("should get an error", (done) => {
    const result = Promise.reject(false);
    const resultValidate = Promise.resolve(request.dna);
    isMutantSpy.and.returnValue(result);
    validateSpy.and.returnValue(resultValidate);

    controller.eventHandler(request).catch((err) => {
      expect(err).toEqual(false);
      done();
    });
  });

  it("Fail matrix validate", (done) => {
    const resultValidate = Promise.resolve(requestaFail.dna);
    validateSpy.and.returnValue(resultValidate);

    controller.eventHandler(requestaFail).catch((err) => {
      expect(err.message).toEqual(Messages.MATRIX_LENGHT_FAIL);
      done();
    });
  })
})
