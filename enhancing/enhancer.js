module.exports = {
  success,
  fail,
  repair,
  get,
};

function success(item) {
  const enhancementLimit = 20;

  return {
    ...item,
    enhancement:
      item.enhancement < enhancementLimit
        ? item.enhancement + 1
        : item.enhancement,
  };
}

function fail(item) {
  let newDurability;
  let newEnhancement;

  if (item.enhancement < 15) {
    newDurability = item.durability - 5;
  } else if (item.enhancement >= 15) {
    newDurability = item.durability - 10;

    if (item.enhancement > 16) {
      newEnhancement = item.enhancement - 1;
    }
  } else {
    newDurability = item.durability;
    newEnhancement = item.enhancement;
  }

  if (newDurability < 0) {
    newDurability = 0;
  }

  return {
    ...item,
    durability: newDurability,
    enhancement: newEnhancement,
  };
}

function repair(item) {
  return { ...item, durability: 100 };
}

function get(item) {
  let newName;

  if (item.enhancement === 0) {
    newName = item.name;
  } else if (item.enhancement > 0) {
    newName = `[+${item.enhancement}] ${item.name}`;
  }

  return { ...item, name: newName };
}
