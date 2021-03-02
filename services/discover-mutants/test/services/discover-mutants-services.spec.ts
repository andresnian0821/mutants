import { JSONMappingParameters } from "aws-sdk/clients/kinesisanalytics";
import "reflect-metadata";
import { DiscoverMutantImplService } from '../../src/services/discover-mutants-impl.service';
import { DiscoverMutantService } from '../../src/services/discover-mutants.service';

describe("Service test Success", () => {
  const dynamoAdapterSpy = jasmine.createSpyObj("sqsAdapter", ["sendMessage"]);
  const sendMessageSpy = dynamoAdapterSpy.sendMessage as jasmine.Spy;

  const requestMutant = {
      dna: [ "ACTGA", "AATAG", "TAACG", "CAACT", "GTTAG" ]
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
    sendMessageSpy.and.returnValue(Promise.resolve('Guardo en dynamo'))
    service.isMutant(requestMutant.dna).then(response => {
      expect(response).toEqual(true);
      done();
    })
  })

  it("Succes service human", (done) => {
    sendMessageSpy.and.returnValue(Promise.resolve('Guardo en dynamo'))
    service.isMutant(requestHuman.dna).then(response => {
      expect(response).toEqual(false);
      done();
    })
  })
})