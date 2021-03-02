/**
 * @constant CONTROLLERS
 *  @type {string}
 *  @default [GetStadisticsMutantController]
 */
export const CONTROLLERS = {
  GetStadisticsMutantController: Symbol.for("GetStadisticsMutantController"),
};

/**
 * @constant UTILS
 *  @type {string}
 *  @default [RequestValidator]
 */
export const UTILS = {
  RequestValidator: Symbol.for("RequestValidator"),
};

/**
 * @constant SERVICES
 *  @type {string}
 *  @default [GetStadisticsMutantService]
 */
export const SERVICES = {
  GetStadisticsMutantService: Symbol.for("GetStadisticsMutantService"),
};

/**
 * @constant ADAPTERS
 *  @type {string}
 *  @default [DynamoAdapter]
 */
export const ADAPTERS = {
  DynamoAdapter: Symbol.for("DynamoAdapter"),
};

/**
 * @constant CONSTANTS
 *  @type {string}
 *  @default []
 */
export const CONSTANTS = {
  EMPTY: "",
};

/**
 * @constant DYNAMO_CONST
 *  @type {string}
 *  @default [adn_table]
 */
export const DYNAMO_CONST = {
  TABLE: `adn_table`,
};
