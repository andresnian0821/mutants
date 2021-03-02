/**
 * @constant CONTROLLERS
 * @type {string}
 * @default
 */
export const CONTROLLERS = {
  SaveAdnController: Symbol.for("SaveAdnController"),
};

/**
 * @constant UTILS
 * @type {string}
 * @default
 */
export const UTILS = {
  RequestValidator: Symbol.for("RequestValidator"),
};

/**
 * @constant SERVICES
 * @type {string}
 * @default
 */
export const SERVICES = {
  SaveAdnService: Symbol.for("SaveAdnService"),
};

/**
 * @constant ADAPTERS
 * @type {string}
 * @default
 */
export const ADAPTERS = {
  DynamoAdapter: Symbol.for("DynamoAdapter"),
};

/**
 * @constant CONSTANTS
 * @type {string}
 * @default
 */
export const CONSTANTS = {
  EMPTY: "",
  CCCC: "CCCC",
  GGGG: "GGGG",
  AAAA: "AAAA",
  TTTT: "TTTT",
};

/**
 * @constant DYNAMO_CONST
 * @type {string}
 * @default
 */
export const DYNAMO_CONST = {
  TABLE: "adn_table",
};
