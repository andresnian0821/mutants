/** 
 * @constant CONTROLLERS
 * @type {string}
 * @default
*/
export const CONTROLLERS = {
  DiscoverMutantController: Symbol.for("DiscoverMutantController"),
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
  DiscoverMutantService: Symbol.for("DiscoverMutantService")
};

/** 
 * @constant ADAPTERS
 * @type {string}
 * @default
*/
export const ADAPTERS = {
  SQSAdapter: Symbol.for("SqsAdapter")
}

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
  TTTT: "TTTT"
};

/** 
 * @constant DYNAMO_CONST
 *  @type {string}
 *  @default
*/
export const DYNAMO_CONST = {
  TABLE: 'adn_table'
}

/** 
 * @constant URL_SQS
 *  @type {string}
 *  @default
*/
export const URL_SQS = 'https://sqs.us-east-2.amazonaws.com/489774021742/save-mutants-dynamo-sqs';