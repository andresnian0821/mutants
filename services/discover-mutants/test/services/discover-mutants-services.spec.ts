import { JSONMappingParameters } from "aws-sdk/clients/kinesisanalytics";
import "reflect-metadata";
import { DiscoverMutantImplService } from '../../src/services/discover-mutants-impl.service';
import { DiscoverMutantService } from '../../src/services/discover-mutants.service';

describe("Service test Success", () => {
<<<<<<< HEAD
  const dynamoAdapterSpy = jasmine.createSpyObj("sqsAdapter", ["sendMessage"]);
  const sendMessageSpy = dynamoAdapterSpy.sendMessage as jasmine.Spy;

  const requestMutant = {
      dna: [ "ACTGA", "AATAG", "TAACG", "CAACT", "GTTAG" ]
=======
  const dynamoAdapterSpy = jasmine.createSpyObj("dynamoAdapter", ["save"]);
  const saveSpy = dynamoAdapterSpy.save as jasmine.Spy;

  const requestMutant = {
      dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
>>>>>>> 303de46f73823ddc3c8263dd6f77ee66e2101d6e
  };

  const requestHuman = {
      dna: ["ATGCGA", "CAGTGC", "TTCTGT", "AGAAAG", "CCACTA", "TCACTG"]
  };

  let service: DiscoverMutantService;

  beforeEach(() => {
    service = new DiscoverMutantImplService(dynamoAdapterSpy);
  });

  it("should create a controller", () => {
    expect(service).toBeDefined();
  });

  it("Succes service mutant", (done) => {
<<<<<<< HEAD
    sendMessageSpy.and.returnValue(Promise.resolve('Guardo en dynamo'))
=======
    saveSpy.and.returnValue(Promise.resolve('Guardo en dynamo'))
>>>>>>> 303de46f73823ddc3c8263dd6f77ee66e2101d6e
    service.isMutant(requestMutant.dna).then(response => {
      expect(response).toEqual(true);
      done();
    })
  })

  it("Succes service human", (done) => {
<<<<<<< HEAD
    sendMessageSpy.and.returnValue(Promise.resolve('Guardo en dynamo'))
=======
    saveSpy.and.returnValue(Promise.resolve('Guardo en dynamo'))
>>>>>>> 303de46f73823ddc3c8263dd6f77ee66e2101d6e
    service.isMutant(requestHuman.dna).then(response => {
      expect(response).toEqual(false);
      done();
    })
  })
})