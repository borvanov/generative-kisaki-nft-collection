export class Exclusions {
  exclusions = {};

  push(exclusionType, items) {
    const currentExclusionsForKey = this.exclusions[exclusionType];
    this.exclusions[exclusionType] = (currentExclusionsForKey || []).concat(
      items
    );
  }

  getByKey(exclusionKey) {
    return this.exclusions[exclusionKey];
  }
}
