export class Sequence {
  sequence = [];

  constructor(initialSequence) {
    this.sequence = initialSequence;
  }

  moveAfter(layerName, secondaryLayerName) {
    if (
      this.sequence.some((key) => key === layerName) &&
      this.sequence.some((key) => key === secondaryLayerName)
    ) {
      const layerIndex = this.sequence.findIndex((key) => key === layerName);

      const sequenceCopy = this.sequence
        .slice()
        .filter((_, index) => index !== layerIndex);

      const secondaryLayerIndex = sequenceCopy.findIndex(
        (key) => key === secondaryLayerName
      );

      sequenceCopy.splice(secondaryLayerIndex + 1, 0, layerName);

      this.sequence = sequenceCopy;
    } else {
      throw new Error(
        `One or more of the provided layers (${layerName}, ${beforeLayerName}) not in the sequence`
      );
    }
  }

  removeFromSequence(layerName) {
    if (this.sequence.some((key) => key === layerName)) {
      this.sequence = this.sequence.filter((key) => key !== layerName);
    } else {
      throw new Error(`Layer (${layerName}) is not in the sequence`);
    }
  }

  insertOnTop(layerName) {
    this.sequence = [...this.sequence, layerName];
  }
}
