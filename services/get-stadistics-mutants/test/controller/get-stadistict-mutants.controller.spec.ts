import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { GetStadisticsMutantsController } from "../../src/controller/get-stadistics-mutants.controller";
import { Response } from "../../src/models/response.model";

describe("Index test", () => {
  const serviceSpy = jasmine.createSpyObj("getStadisticsMutantsImplService", ["getStadistics"]);

  const getStatsSpy = serviceSpy.getStadistics as jasmine.Spy;

  let controller: GetStadisticsMutantsController;

  beforeEach(() => {
    controller = new GetStadisticsMutantsController(serviceSpy);
  });

  it("should create a controller", () => {
    expect(controller).toBeDefined();
  });

  it("should get a stats result", (done) => {
    const response = {
      count_mutant_dna: 1,
      count_human_dna: 2,
      ratio: 3,
    };
    const result = Promise.resolve(response);
    getStatsSpy.and.returnValue(result);

    controller.eventHandler().then((result) => {
      expect(result.count_mutant_dna).toEqual(response.count_mutant_dna);
      done();
    });
  });

  it("should get an error", (done) => {
    const response = new Response(StatusCodes.NOT_FOUND, { data: "Errror" });
    const result = Promise.reject(response);
    getStatsSpy.and.returnValue(result);

    controller.eventHandler().catch((err) => {
      expect(err.statusCode).toEqual(StatusCodes.NOT_FOUND);
      done();
    });
  });
});
