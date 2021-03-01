import "reflect-metadata";
import { SaveAdnController } from "../../src/controller/save-adn-controler";
import { StatusCodes } from "http-status-codes";
import { Response } from "../../src/models/response.model";

describe("Controller test Success", () => {
  const serviceSpy = jasmine.createSpyObj("saveAdnService", ["saveAdn"]);

  const saveAdntSpy = serviceSpy.saveAdn as jasmine.Spy;

  let controller: SaveAdnController;

  const request = {
    dna: ["ATGCGA", "CAGTGC", "TTCTGT", "AGAAAG", "CCACTA", "TCACTG"],
  };

  beforeEach(() => {
    controller = new SaveAdnController(serviceSpy);
  });

  it("should create a controller", () => {
    expect(controller).toBeDefined();
  });

  it("should discover Mutant result", (done) => {
    saveAdntSpy.and.returnValue(Promise.resolve(true));
    controller.eventHandler(request).then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it("should discover Mutant result", (done) => {
    saveAdntSpy.and.returnValue(Promise.reject(false));
    controller.eventHandler(request).catch((err) => {
      expect(err).toEqual(false);
      done();
    });
  });
});
