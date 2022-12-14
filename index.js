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
import { Exclusions } from "./utilities/exclusions.js";

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
  const exclusions = new Exclusions();

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
    LAYERS.HandAccessory,
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
    exclusions.push(LAYERS.Accessory, [2]);
  }
  // Revalidate mouth type -- end

  const hairType = Random.generateRandomFromConfigurationMap(hairMap);
  layers[LAYERS.Hair] = hairMap.getFilePath(hairType, colorName);
  // Revalidate hair type
  if (![2, 3, 6, 8].includes(hairType)) {
    exclusions.push(LAYERS.Accessory, [3, 12]);
  }
  if (![2, 6].includes(hairType)) {
    exclusions.push(LAYERS.Accessory, [7]);
  }
  if (hairType === 5) {
    exclusions.push(LAYERS.Accessory, [4, 8, 9]);
  }
  if (hairType === 4) {
    exclusions.push(LAYERS.Accessory, [8]);
  }
  // Revalidate hair type -- end

  const clothingType = Random.generateRandomFromConfigurationMap(clothingsMap);
  layers[LAYERS.Clothing] = clothingsMap.getFilePath(clothingType, colorName);
  // Revalidate clothing type
  if ([3, 4].includes(clothingType)) {
    exclusions.push(LAYERS.Accessory, [10, 12]);
  }
  if (clothingType === 5) {
    exclusions.push(LAYERS.Accessory, [3, 4, 5, 6, 8, 9, 12]);
    layersSequence.moveAfter(LAYERS.Hair, LAYERS.Clothing);
    layers[LAYERS.Hair] = hoodedCapeHairMap.getFilePath(hairType, colorName);
  }
  // Revalidate clothing type -- end

  const accessoryType = Random.generateRandomFromConfigurationMap(
    accessoriesMap,
    exclusions.getByKey(LAYERS.Accessory)
  );
  layers[LAYERS.Accessory] = accessoriesMap.getFilePath(
    accessoryType,
    colorName
  );
  // Revalidate accessory type
  if (accessoryType === 12) {
    layersSequence.moveAfter(LAYERS.Accessory, LAYERS.Hair);
  }
  if (accessoryType === 1) {
    // QUESTION: the only available hand type in this case is 7 or NONE
    layersSequence.removeFromSequence(LAYERS.HandAccessory);
    exclusions.push(LAYERS.Hand, [1, 2, 3, 4, 5, 6]);
    // layersSequence.removeFromSequence(LAYERS.Hand);
  }
  if (accessoryType === 5) {
    if (hairType !== 2) {
      layersSequence.moveAfter(LAYERS.Accessory, LAYERS.Mouth);
    }
  }
  if (accessoryType === 2) {
    exclusions.push(LAYERS.Hand, [1, 7]);
  }
  // Revalidate accessory type -- end

  const handType = Random.generateRandomFromConfigurationMap(
    handsMap,
    exclusions.getByKey(LAYERS.Hand)
  );
  layers[LAYERS.Hand] = handsMap.getFilePath(handType, colorName);
  if (handType === 8) {
    layersSequence.removeFromSequence(LAYERS.Hand);
  }
  // Revalidate hand type
  if (handType === 7) {
    layersSequence.moveAfter(LAYERS.Hand, LAYERS.Clothing);
  }
  if ([7, 8].includes(handType)) {
    exclusions.push(LAYERS.HandAccessory, [4, 5, 6, 7, 8, 9]);
  }
  if ([3, 5].includes(handType)) {
    exclusions.push(LAYERS.HandAccessory, [1, 2, 3, 4, 5, 6, 7, 8, 10]);
  }
  if (handType === 4) {
    exclusions.push(LAYERS.HandAccessory, [1, 2, 3, 10]);
  }
  if ([1, 2, 6].includes(handType) || accessoryType === 1) {
    layersSequence.removeFromSequence(LAYERS.HandAccessory);
  }
  // Revalidate hand type -- end

  if (layersSequence.sequence.includes(LAYERS.HandAccessory)) {
    const handAccessoryType = Random.generateRandomFromConfigurationMap(
      handAccessoryMap,
      exclusions.getByKey(LAYERS.HandAccessory)
    );
    layers[LAYERS.HandAccessory] = handAccessoryMap.getFilePath(
      handAccessoryType,
      colorName
    );
  }

  if (makeupType === 2 && layersSequence.sequence.includes(LAYERS.Hand)) {
    layersSequence.moveToTop(LAYERS.Makeup);
  }

  Image.generateFromLayers(
    layersSequence.sequence
      .map((layerName) => layers[layerName])
      .map((path) => `./input/${path}`)
  ).then((canvas) => {
    const buffer = canvas.toBuffer("image/png");
    if (!fs.existsSync("./generated")) {
      fs.mkdirSync("./generated");
    }
    fs.writeFileSync(`./generated/${Date.now()}.png`, buffer);
  });
}

new Array(20).fill(0).forEach(function () {
  generateNft();
});
