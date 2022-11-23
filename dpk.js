const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const HASHING_ALGORITHM = "sha3-512";
const ENCODING = "hex";

const isNullOrUndefined = (data) => data === null || data === undefined;

const isObject = (data) => {
  const dataType = typeof data;
  const objOrFunction = dataType === "object" || dataType === "function";
  const notAnArray = !Array.isArray(data);
  return !isNullOrUndefined(data) && objOrFunction && notAnArray;
};

const getPartitionKey = (data) => {
  if (isNullOrUndefined(data)) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (isObject(data)) {
    return data.partitionKey || "";
  }

  return "";
};

const meetsPartitionKeyLength = (partitionKey) =>
  partitionKey.length > MAX_PARTITION_KEY_LENGTH;

const stringify = (data) =>
  typeof data === "string" ? data : JSON.stringify(data);

const defaultTo = (data, defaultValue = "") =>
  isNullOrUndefined(data) ? defaultValue : data;

const hashPartitionKey = (data) => {
  const stringifiedData = stringify(defaultTo(data));
  return crypto
    .createHash(HASHING_ALGORITHM)
    .update(stringifiedData)
    .digest(ENCODING);
};

const getOrHashPartitionKey = (data) => {
  if (isNullOrUndefined(data)) {
    return TRIVIAL_PARTITION_KEY;
  }

  const partitionKey = getPartitionKey(data);

  if (meetsPartitionKeyLength(partitionKey)) {
    return partitionKey;
  }

  return hashPartitionKey(partitionKey);
};

const deterministicPartitionKey = (data) => getOrHashPartitionKey(data);

module.exports = {
  deterministicPartitionKey,
  getOrHashPartitionKey,
  hashPartitionKey,
  defaultTo,
  stringify,
  getPartitionKey,
  isNullOrUndefined,
  isObject,
};
