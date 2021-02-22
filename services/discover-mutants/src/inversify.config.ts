import { Container } from "inversify";
import { DiscoverMutantController } from "./controller/discover-mutants-controler";
import { DiscoverMutantService } from "./services/discover-mutants.service";
import { DiscoverMutantImplService } from "./services/discover-mutants-impl.service";
import { DynamoService } from './adapter/dynamo/dynamo.service';
import { DynamoImplService } from './adapter/dynamo/dynamo-impl.service';
import { SERVICES, CONTROLLERS, UTILS, ADAPTERS } from './utils/constants';
import { RequestValidator } from './utils/request-validator';

const AppContainer: Container = new Container();
AppContainer.bind<DiscoverMutantController>(CONTROLLERS.DiscoverMutantController).to(DiscoverMutantController);
AppContainer.bind<DiscoverMutantService>(SERVICES.DiscoverMutantService).to(DiscoverMutantImplService);
AppContainer.bind<DynamoService>(ADAPTERS.DynamoAdapter).to(DynamoImplService);
AppContainer.bind<RequestValidator>(UTILS.RequestValidator).to(RequestValidator);

export { AppContainer };
