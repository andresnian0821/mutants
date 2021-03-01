import { Container } from "inversify";
import { SaveAdnController } from "./controller/save-adn-controler";
import { SaveAdnService } from "./services/save-adn.service";
import { SaveAdnImplService } from "./services/save-adn-impl.service";
import { DynamoAdapter } from "./adapter/dynamo/dynamo.adapter";
import { DynamoImplAdapter } from "./adapter/dynamo/dynamo-impl.adapter";
import { SERVICES, CONTROLLERS, ADAPTERS } from "./utils/constants";

const AppContainer: Container = new Container();
AppContainer.bind<SaveAdnController>(CONTROLLERS.SaveAdnController).to(SaveAdnController);
AppContainer.bind<SaveAdnService>(SERVICES.SaveAdnService).to(SaveAdnImplService);
AppContainer.bind<DynamoAdapter>(ADAPTERS.DynamoAdapter).to(DynamoImplAdapter);
export { AppContainer };
