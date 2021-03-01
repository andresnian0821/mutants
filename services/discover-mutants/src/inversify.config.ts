import { Container } from "inversify";
import { DiscoverMutantController } from "./controller/discover-mutants-controler";
import { DiscoverMutantService } from "./services/discover-mutants.service";
import { DiscoverMutantImplService } from "./services/discover-mutants-impl.service";
import { SqsAdapter } from "./adapter/sqs/sqs-save-adn.adapter";
import { SqsAdampterImpl } from "./adapter/sqs/sqs-save-adn-impl.adapter";
import { SERVICES, CONTROLLERS, UTILS, ADAPTERS } from './utils/constants';
import { RequestValidator } from './utils/request-validator';

const AppContainer: Container = new Container();
AppContainer.bind<DiscoverMutantController>(CONTROLLERS.DiscoverMutantController).to(DiscoverMutantController);
AppContainer.bind<DiscoverMutantService>(SERVICES.DiscoverMutantService).to(DiscoverMutantImplService);
AppContainer.bind<SqsAdapter>(ADAPTERS.SQSAdapter).to(SqsAdampterImpl);
AppContainer.bind<RequestValidator>(UTILS.RequestValidator).to(RequestValidator);

export { AppContainer };
