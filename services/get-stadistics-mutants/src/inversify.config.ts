import { Container } from "inversify";
import { GetStadisticsMutantsController } from "./controller/get-stadistics-mutants.controller";
import { GetStadisticsMutantsImplService } from "./services/get-stadistics-mutants-impl.service";
import { GetStadisticsMutantsService } from "./services/get-stadistics-mutants.service";
import { DynamoAdapter } from "./adapter/dynamo/dynamo.adapter";
import { DynamoImplAdapter } from "./adapter/dynamo/dynamo-impl.adapter";
import { SERVICES, CONTROLLERS, UTILS, ADAPTERS } from "./utils/constants";
import { RequestValidator } from "./utils/request-validator";

const AppContainer: Container = new Container();
AppContainer.bind<GetStadisticsMutantsController>(CONTROLLERS.GetStadisticsMutantController).to(
  GetStadisticsMutantsController,
);
AppContainer.bind<GetStadisticsMutantsService>(SERVICES.GetStadisticsMutantService).to(GetStadisticsMutantsImplService);
AppContainer.bind<DynamoAdapter>(ADAPTERS.DynamoAdapter).to(DynamoImplAdapter);
AppContainer.bind<RequestValidator>(UTILS.RequestValidator).to(RequestValidator);

export { AppContainer };
