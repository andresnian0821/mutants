import "reflect-metadata";
import { GetStadisticsMutantsService } from "../../src/services/get-stadistics-mutants.service";
import { GetStadisticsMutantsImplService } from "../../src/services/get-stadistics-mutants-impl.service";

describe("FindMutantService test", () => {
  const dynamoSpy = jasmine.createSpyObj("dynamoAdapter", ["get"]);

  const getSpy = dynamoSpy.get as jasmine.Spy;

  let service: GetStadisticsMutantsService;

  beforeEach(() => {
    service = new GetStadisticsMutantsImplService(dynamoSpy);
  });

  it("should create a service", () => {
    expect(service).toBeDefined();
  });

  it("should get true on service", (done) => {
    const response = {
      count_mutant_dna: 2,
      count_human_dna: 2,
      ratio: 3,
    };
    getSpy.and.returnValue(Promise.resolve(response));
    service.getStadistics().then((result) => {
      expect(result.count_mutant_dna).toEqual(undefined);
      done();
    });
  });
});
