export class Random {
  static generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateRandomFromConfigurationMap(configurationMap, excluded = []) {
    const keysNumbers = Object.keys(configurationMap.configurationMap).map(
      (key) => Number(key)
    );
    if (excluded.length > 0) {
      const filteredKeys = keysNumbers.filter(
        (keyNumber) => !excluded.includes(keyNumber)
      );
      const randomizedIndex = Random.generateRandomIntegerInRange(
        0,
        filteredKeys.length - 1
      );
      return filteredKeys[randomizedIndex];
    }

    return Random.generateRandomIntegerInRange(
      1,
      Math.max(
        ...Object.keys(configurationMap.configurationMap).map((key) =>
          Number(key)
        )
      )
    );
  }
}
