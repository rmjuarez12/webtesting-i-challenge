//* Import the enhancer
const enhancer = require("./enhancer.js");

//* Object to use
let item = {
  name: "Sword",
  durability: 50,
  enhancement: 0,
};

//* Test and ensure we have the item(with its necessary properties and values), and necessary methods to use
describe("Item Object and Enhancement methods exist", () => {
  // Ensure object for item exists
  test("Item object exists", () => {
    expect(item).toBeDefined;
  });

  // Ensure the item object has the necessary properties with default values
  test("Item object has a name property", () => {
    expect(item).toHaveProperty("name");
  });

  test("Item object has a durability property with default 100 value", () => {
    expect(item).toHaveProperty("durability");
  });

  test("Item object has a durability property with default 0 value", () => {
    expect(item).toHaveProperty("enhancement");
  });

  // Check if the necessary methods exits
  test("Enhancer file has success method", () => {
    expect(enhancer.success).toBeDefined;
    expect(enhancer.success).toBeInstanceOf(Function);
  });

  test("Enhancer file has fail method", () => {
    expect(enhancer.fail).toBeDefined;
    expect(enhancer.fail).toBeInstanceOf(Function);
  });

  test("Enhancer file has repair method", () => {
    expect(enhancer.repair).toBeDefined;
    expect(enhancer.repair).toBeInstanceOf(Function);
  });

  test("Enhancer file has get method", () => {
    expect(enhancer.get).toBeDefined;
    expect(enhancer.get).toBeInstanceOf(Function);
  });
});

//* Test the methods for enhancements

// Declare a variable to save the new item object
let newItem;

// Test the item repair
describe("Item repairing", () => {
  // Ensure that the value is between 0 - 100
  test("Ensure that durability is between 0 - 100 first", () => {
    expect(item.durability).toBeGreaterThanOrEqual(0);
    expect(item.durability).toBeLessThanOrEqual(100);
  });

  // Check if we got the desired result
  test("If we invoke repair, bring durability back to 100", () => {
    // Invoke function and get new item object
    newItem = enhancer.repair(item);

    // Expected value
    expect(newItem.durability).toBe(100);
  });
});

// Test the success item enhancement
describe("Item enhancement success", () => {
  // Ensure that the value is between 0 - 20
  test("Ensure that enhancement is between 0 - 20 first", () => {
    expect(item.enhancement).toBeGreaterThanOrEqual(0);
    expect(item.enhancement).toBeLessThanOrEqual(20);
  });

  // Test that it is adding the enhancement
  test("Upon succeeding, add +1 enhancement", () => {
    // Invoke the enhance succeed function
    newItem = enhancer.success(item);

    // Expected Result
    expect(newItem.enhancement).toBe(1);
  });

  // If the enhancement increased, change the name to new enhancement
  test("Upon enhancement increased, change name to item to show enhancement level", () => {
    // Invoke the enhance succeed function
    newItem = enhancer.success(item);
    newItem = enhancer.get(newItem);

    expect(newItem.name).toBe("[+1] Sword");
  });

  // Test to ensure that the expected value is not higher than 20
  test("If enhancement is at 20, ensure it does not increase", () => {
    // Increase enhancement to 20
    newItem = {
      ...item,
      enhancement: 20,
    };

    // Invoke the enhance succeed function
    newItem = enhancer.success(newItem);

    expect(newItem.enhancement).toBeLessThanOrEqual(20);
  });

  // Ensure that the durability property is untouched
  test("Durability will remain untouched", () => {
    // Invoke the enhance succeed function
    newItem = enhancer.success(item);

    expect(newItem.durability).toBe(item.durability);
  });
});

// Test the fail enhancement function
describe("Item enhancement fail", () => {
  // Ensure that the value is between 0 - 20
  test("Ensure that enhancement is between 0 - 20 first", () => {
    expect(item.enhancement).toBeGreaterThanOrEqual(0);
    expect(item.enhancement).toBeLessThanOrEqual(20);
  });

  // Test and see what happens when a failure happens under 15 enhancement
  test("If enhancement is less than 15, deduct 5 durability points", () => {
    // Invoke the enhance succeed function
    newItem = enhancer.fail(item);

    // Expected results
    expect(newItem.durability).toBe(45);
  });

  // Test and see what happens when a failure happens under 15 enhancement
  test("If enhancement is greater than or equal to 15, deduct 10 durability points", () => {
    // Add 15 points to enhancement
    newItem = { ...item, enhancement: 15 };

    // Invoke the enhance succeed function
    newItem = enhancer.fail(newItem);

    // Expected results
    expect(newItem.durability).toBe(40);
  });

  test("If enhancement is greater than 16, deduct 1 enhancement point", () => {
    // Add 17 points to enhancement
    newItem = { ...item, enhancement: 17 };

    // Invoke the enhance succeed function
    newItem = enhancer.fail(newItem);

    // Expected results
    expect(newItem.enhancement).toBe(16);
  });

  // If durability goes to negative points, ensure it does not go lower than 0
  test("Ensure that the end result for durability is between 0 - 100", () => {
    // Set durability points to 2
    newItem = {
      ...item,
      durability: 2,
    };

    // Invoke the enhance succeed function
    newItem = enhancer.fail(newItem);

    // Expected return
    expect(newItem.durability).toBeGreaterThanOrEqual(0);
  });
});
