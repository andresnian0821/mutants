import "reflect-metadata";
import { handler } from "../src/index";
import { StatusCodes } from "http-status-codes";
import { SaveAdnController } from "../src/controller/save-adn-controler";
import { Response } from "../src/models/response.model";

describe("Index test", () => {
  const request = {
    Records: [
      {
        body: '{"adn":["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],"isMutant":true}'
      },
    ],
  };

  it("Handler mutant", () => {
    spyOn(SaveAdnController.prototype, "eventHandler").and.returnValue(Promise.resolve(true));
    handler(request).then((result: any) => {
      expect(result.statusCode).toEqual(StatusCodes.OK);
    });
  });
});
