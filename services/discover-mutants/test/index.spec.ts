import "reflect-metadata";
import { handler } from "../src/index";
import { StatusCodes } from "http-status-codes";
import { DiscoverMutantController } from "../src/controller/discover-mutants-controler";
import { Response } from "../src/models/response.model";
import { DynamoDB } from "aws-sdk";

describe("Index test", () => {
  const body = {
    dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
  };
  const eventMutant = {
    body: JSON.stringify(body),
  };

  it("Handler mutant", () => {
    
    spyOn(DiscoverMutantController.prototype, "eventHandler").and.returnValue(Promise.resolve(true));
    handler(eventMutant).then((result: any) => {
      expect(result.statusCode).toEqual(StatusCodes.OK);
    });
  });

  it("Handler human", () => {
    const body = {
      dna: ["TTGCAA", "CAGTGC", "TTATGT", "AGAAGG", "CGCCTA", "TCACTG"],
    };
    const eventHuman = {
      body: JSON.stringify(body),
    };
    spyOn(DiscoverMutantController.prototype, "eventHandler").and.returnValue(Promise.resolve(false));
    handler(eventHuman).then((result: any) => {
      expect(result.statusCode).toEqual(StatusCodes.FORBIDDEN);
    });
  });

  it("Handler data error", () => {
    const body = {
      dna: "",
    };
    const eventDataErr = {
      body: JSON.stringify(body),
    };
    const response = new Response(StatusCodes.NOT_FOUND, { message: "data.dna should be array" });
    spyOn(DiscoverMutantController.prototype, "eventHandler").and.returnValue(Promise.reject(response));

    handler(eventDataErr).then((result: any) => {
      expect(result.statusCode).toEqual(StatusCodes.FORBIDDEN);
    });
  });

  it("Handler data incomplete", () => {
    const body = {
      dna: "",
    };
    const eventDataIncomplete = {
      body: JSON.stringify(body),
    };
    const response = new Response(StatusCodes.NOT_FOUND, { message: "ADN structure imcomplete" });
    spyOn(DiscoverMutantController.prototype, "eventHandler").and.returnValue(Promise.reject(response));

    handler(eventDataIncomplete).then((result: any) => {
      expect(result.statusCode).toEqual(StatusCodes.FORBIDDEN);
    });
  });
});