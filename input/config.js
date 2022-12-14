import { ConfigurationPreset } from "./configuration-preset.js";

// Common colors config
const COLORS_MAP = {
  1: "BROWN",
  2: "LILAC",
  3: "NATURAL",
  4: "TAN",
  5: "WHITE",
};

export function getColorByNumber(integerNumber) {
  return COLORS_MAP[integerNumber];
}

// Backgrounds config
export const backgroundMap = new ConfigurationPreset(
  {
    1: "BLUE",
    2: "GOLD",
    3: "GRAY",
    4: "GREEN",
    5: "PINK",
    6: "YELLOW",
  },
  "Background",
  "LT "
);

// Clothing config
export const clothingsMap = new ConfigurationPreset(
  {
    1: "BLACK TOP",
    2: "CAPE.ARMOR",
    3: "ELEGANT TOP _ SHAWL",
    4: "EMPEROR JACKET",
    5: "HOODED CAPE",
    6: "KIMONO Feminine",
    7: "KIMONO Non-Gender",
    8: "SHIRT _ TIE",
    9: "SPORTY CROP TOP",
  },
  "Clothing"
);

// Accessories config
export const accessoriesMap = new ConfigurationPreset(
  {
    1: { name: "FOX SPIRIT MASK", colored: true },
    2: { name: "BUBBLE GUM", colored: false },
    3: { name: "CAP BACKWARD", colored: false },
    4: { name: "EARRING", colored: false },
    5: { name: "EYE PATCH", colored: false },
    6: { name: "FLOWER HEADDRESS", colored: false },
    7: { name: "FOREHEAD JEWEL", colored: false },
    8: { name: "HEADPHONES", colored: false },
    9: { name: "HOOP EARRING", colored: false },
    10: { name: "NECKLACE", colored: false },
    11: { name: "SUNGLASSES", colored: false },
    12: { name: "VEIL", colored: false },
  },
  "Accessories"
);

// Eyes and brows config
export const eyesBrowsMap = new ConfigurationPreset(
  {
    1: "CLOSED",
    2: "GOLDEN EYE _ SYMBOL",
    3: "HAPPY",
    4: "INFLUENCE",
    5: "SEXY",
    6: "TEAR",
    7: "THOUGHTS",
    8: "WINK",
  },
  "Eyes and Brows"
);

// Hair config
export const hoodedCapeHairMap = new ConfigurationPreset(
  {
    1: "BRAID _ BUN",
    2: "BUZZ",
    3: "ELEGANT",
    4: "EMPRESS STYLE 2",
    5: "EMPRESS STYLE",
    6: "LONG",
    7: "PIGTAILS",
    8: "SHORT",
    9: "UPSTYLE",
  },
  "Hair/HAIR FOR HOODED CAPE ONLY",
  "",
  "__ONLY HOODED CAPE"
);

export const hairMap = new ConfigurationPreset(
  {
    1: "BRAID _ BUN",
    2: "BUZZ",
    3: "ELEGANT",
    4: "EMPRESS STYLE_02",
    5: "EMPRESS STYLE",
    6: "LONG",
    7: "PIGTAILS",
    8: "SHORT",
    9: "UPSTYLE",
  },
  "Hair"
);

// Hand accessory config
export const handAccessoryMap = new ConfigurationPreset(
  {
    1: { name: "GOLD MICROPHONE", colored: true },
    2: { name: "JOURNAL BOOK", colored: true },
    3: { name: "POCKET WATCH", colored: true },
    4: { name: "BLUE BUTTERFLY", colored: false },
    5: { name: "GOLD MIRROR", colored: false },
    6: { name: "GOLDEN KEY", colored: false },
    7: { name: "PEACOCK FAN", colored: false },
    8: { name: "WAND SWORD", colored: false },
    9: { name: "WEAPON", colored: false },
    10: { name: "FLAME", colored: true },
  },
  "Hand Accessory"
);

// Hands config
export const handsMap = new ConfigurationPreset(
  {
    1: { name: "BOTH HANDS", colored: true },
    2: { name: "DON_T CARE", colored: true },
    3: { name: "HOLDING", colored: true },
    4: { name: "HOLDING RIGHT", colored: true },
    5: { name: "HOLDING _GLOVED", colored: true },
    6: { name: "ON THE CHEEK", colored: true },
    7: { name: "SHHH", colored: true },
    8: { name: "NONE", colored: false },
  },
  "Hands"
);

// Makeup config
export const makeupMap = new ConfigurationPreset(
  {
    1: "BODY TATTOO",
    2: "CHERRY BLOSSOM",
    3: "DREAM CATCHER",
    4: "EYEBROW PIERCE",
    5: "SCAR",
    6: "UNDER EYE TATTOO",
  },
  "Makeup"
);

// Mouth config
export const mouthMap = new ConfigurationPreset(
  {
    1: "BITE (BLACK)",
    2: "CLOSED (GLOSS)",
    3: "K9 TOOTH",
    4: "OH",
    5: "POUT",
    6: "SEXY (RED)",
    7: "SMILE (PINK)",
    8: "TONGUE",
  },
  "Mouth"
);

// Race config
export const raceMap = new ConfigurationPreset(COLORS_MAP, "Race");
