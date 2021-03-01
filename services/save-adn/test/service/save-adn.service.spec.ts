import "reflect-metadata";
import { SaveAdnImplService } from "../../src/services/save-adn-impl.service";
import { SaveAdnService } from "../../src/services/save-adn.service";

describe("Service test Success", () => {
  const dynamoAdapterSpy = jasmine.createSpyObj("dynamoAdapter", ["save"]);
  const saveSpy = dynamoAdapterSpy.save as jasmine.Spy;

  const requestMutant = {
    adn: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
    isMutant: true,
  };

  let service: SaveAdnService;

  beforeEach(() => {
    service = new SaveAdnImplService(dynamoAdapterSpy);
  });

  it("should create a controller", () => {
    expect(service).toBeDefined();
  });

  it("Succes service mutant", (done) => {
    saveSpy.and.returnValue(Promise.resolve("Saved in dynamoDb"));
    service.saveAdn(requestMutant).then((response) => {
      expect(response).toEqual("Saved in dynamoDb");
      done();
    });
  });

  it("Succes service human", (done) => {
    saveSpy.and.returnValue(Promise.reject("Error Saving dynamoDb"));
    service.saveAdn(requestMutant).catch((err) => {
      expect(err).toEqual("Error Saving dynamoDb");
      done();
    });
  });
});
