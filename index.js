import fs from "fs";
import {
  accessoriesMap,
  backgroundMap,
  clothingsMap,
  eyesBrowsMap,
  getColorByNumber,
  hairMap,
  handAccessoryMap,
  handsMap,
  hoodedCapeHairMap,
  makeupMap,
  mouthMap,
  raceMap,
} from "./input/config.js";
import { Sequence } from "./utilities/sequence.js";
import { Image } from "./utilities/image.js";
import { Random } from "./utilities/random.js";

const LAYERS = {
  Background: "background",
  Race: "race",
  Nose: "nose",
  Makeup: "makeup",
  EyesBrows: "eyes-brows",
  Mouth: "mouth",
  Hair: "hair",
  Clothing: "clothing",
  Accessory: "accessory",
  Hand: "hand",
  HandAccessory: "hand-accessory",
};

function generateNft() {
  const excludedAccessories = [];
  const excludedHandAccessories = [];
  let handAccessoriesSkipped = false;

  const colorType = Random.generateRandomIntegerInRange(1, 5);
  const colorName = getColorByNumber(colorType);

  const layers = {};
  const layersSequence = new Sequence([
    LAYERS.Background,
    LAYERS.Race,
    LAYERS.Nose,
    LAYERS.Makeup,
    LAYERS.EyesBrows,
    LAYERS.Mouth,
    LAYERS.Hair,
    LAYERS.Clothing,
    LAYERS.Accessory,
    LAYERS.Hand,
  ]);

  const backgroundType =
    Random.generateRandomFromConfigurationMap(backgroundMap);
  layers[LAYERS.Background] = backgroundMap.getFilePath(
    backgroundType,
    colorName
  );

  layers[LAYERS.Race] = raceMap.getFilePath(colorType, colorName);
  layers[LAYERS.Nose] = "NOSE.png";

  const makeupType = Random.generateRandomFromConfigurationMap(makeupMap);
  layers[LAYERS.Makeup] = makeupMap.getFilePath(makeupType);

  const eyesBrowsType = Random.generateRandomFromConfigurationMap(eyesBrowsMap);
  layers[LAYERS.EyesBrows] = eyesBrowsMap.getFilePath(eyesBrowsType, colorName);

  const mouthType = Random.generateRandomFromConfigurationMap(mouthMap);
  layers[LAYERS.Mouth] = mouthMap.getFilePath(mouthType, colorName);
  // Revalidate mouth type
  if ([3, 7, 8].includes(mouthType)) {
    excludedAccessories.push(2);
  }
  // Revalidate mouth type -- end

  const hairType = Random.generateRandomFromConfigurationMap(hairMap);
  layers[LAYERS.Hair] = hairMap.getFilePath(hairType, colorName);
  // Revalidate hair type
  if (![2, 3, 6, 8].includes(hairType)) {
    excludedAccessories.push(3, 12);
  }
  if (![2, 6].includes(hairType)) {
    excludedAccessories.push(7);
  }
  if (hairType === 5) {
    excludedAccessories.push(4, 8, 9);
  }
  if (hairType === 4) {
    excludedAccessories.push(8);
  }
  // Revalidate hair type -- end

  const clothingType = Random.generateRandomFromConfigurationMap(clothingsMap);
  layers[LAYERS.Clothing] = clothingsMap.getFilePath(clothingType, colorName);
  // Revalidate clothing type
  if ([3, 4].includes(clothingType)) {
    excludedAccessories.push(10, 12);
  }
  if (clothingType === 5) {
    excludedAccessories.push(3, 4, 5, 6, 8, 9, 12);
    layersSequence.moveAfter(LAYERS.Hair, LAYERS.Clothing);
    layers[LAYERS.Hair] = hoodedCapeHairMap.getFilePath(hairType, colorName);
  }
  // Revalidate clothing type -- end

  const accessoryType = Random.generateRandomFromConfigurationMap(
    accessoriesMap,
    excludedAccessories
  );
  layers[LAYERS.Accessory] = accessoriesMap.getFilePath(
    accessoryType,
    colorName
  );
  // Revalidate accessory type
  if (accessoryType === 12) {
    layersSequence.moveAfter(LAYERS.Accessory, LAYERS.Hair);
  }
  // Revalidate accessory type -- end

  const handType = Random.generateRandomFromConfigurationMap(handsMap);
  layers[LAYERS.Hand] = handsMap.getFilePath(handType, colorName);
  if (handType === 8) {
    layersSequence.removeFromSequence(LAYERS.Hand);
  }
  // Revalidate hand type
  if ([7, 8].includes(handType)) {
    excludedHandAccessories.push(4, 5, 6, 7, 8, 9);
  }
  if ([3, 5].includes(handType)) {
    excludedHandAccessories.push(1, 2, 3, 4, 5, 6, 7, 8, 10);
  }
  if (handType === 4) {
    excludedHandAccessories.push(1, 2, 3, 10);
  }
  if ([1, 2, 6].includes(handType) || accessoryType === 1) {
    handAccessoriesSkipped = true;
  }
  // Revalidate hand type -- end

  if (!handAccessoriesSkipped) {
    const handAccessoryType = Random.generateRandomFromConfigurationMap(
      handAccessoryMap,
      excludedHandAccessories
    );
    layers[LAYERS.HandAccessory] = handAccessoryMap.getFilePath(
      handAccessoryType,
      colorName
    );
    layersSequence.insertOnTop(LAYERS.HandAccessory);
  }

  if (makeupType === 2) {
    layersSequence.moveAfter(LAYERS.Makeup, LAYERS.Hand);
  }

  Image.generateFromLayers(
    layersSequence.sequence
      .map((layerName) => layers[layerName])
      .map((path) => `./input/${path}`)
  ).then((canvas) => {
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(`./generated/${Date.now()}.png`, buffer);
  });
}

new Array(20).fill(0).forEach(function () {
  generateNft();
});
