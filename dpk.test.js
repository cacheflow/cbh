const {
  deterministicPartitionKey,
  hashPartitionKey,
  defaultTo,
  stringify,
  getPartitionKey,
  isNullOrUndefined,
  isObject,
} = require("./dpk");

describe("isNullOrUndefined", () => {
  it("returns true when it's undefined", () => {
    expect(isNullOrUndefined(undefined)).toBe(true);
  });

  it("returns true when it's undefined", () => {
    expect(isNullOrUndefined(null)).toBe(true);
  });

  it("returns false when it is not undefined", () => {
    expect(isNullOrUndefined([])).toBe(false);
  });

  it("returns false when it is not null", () => {
    expect(isNullOrUndefined("")).toBe(false);
  });
});

describe("hashPartitionKey", () => {
  it("hashes a partition key", () => {
    expect(hashPartitionKey("hello")).toBe(
      "75d527c368f2efe848ecf6b073a36767800805e9eef2b1857d5f984f036eb6df891d75f72d9b154518c1cd58835286d1da9a38deba3de98b5a53e5ed78a84976"
    );
  });
});

describe("defaultTo", () => {
  it("returns a default value when it's null", () => {
    expect(defaultTo(null, "")).toBe("");
  });

  it("returns a default value when it's undefined", () => {
    expect(defaultTo(null, "")).toBe("");
  });
});

describe("stringify", () => {
  it("stringifies a value when it is not a string", () => {
    expect(stringify([])).toBe("[]");
  });
  it("does not stringify a value when it is already a string", () => {
    expect(stringify("")).toBe("");
  });
});

describe("getPartitionKey", () => {
  it("retrieves a partition key", () => {
    let obj = { partitionKey: "1234" };
    expect(getPartitionKey(obj)).toBe("1234");
  });

  it("returns the default partition key when given no obj", () => {
    expect(getPartitionKey()).toBe("0");
  });
});

describe("isObject", () => {
  it("returns true when it is an object", () => {
    expect(isObject({})).toBe(true);
  });

  it("returns false when it is an array", () => {
    expect(isObject([])).toBe(false);
  });

  it("returns false when it is null", () => {
    expect(isObject(null)).toBe(false);
  });

  it("returns false when it is undefined", () => {
    expect(isObject(undefined)).toBe(false);
  });
});

describe("deterministicPartitionKey", () => {
  it("returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("returns the literal '0' when given undefined", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("returns the literal '0' when given null", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("returns the hashed partition key when it exceeds the partition key length", () => {
    let str = "3998e9bc998c48d40ea8991cd945a8b6a112c";
    let arr = [];
    for (let i = 0; i < 10; i += 1) {
      arr.push(str);
    }
    const largePartitionKey = deterministicPartitionKey(arr.join(" "));
    expect(largePartitionKey).toBe(
      "a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26"
    );
    expect(largePartitionKey.length).toBeLessThan(256);
  });
});
