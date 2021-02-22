export interface DiscoverMutantService {
  isMutant(adn: string[]): Promise<boolean>;
}
