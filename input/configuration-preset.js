export class ConfigurationPreset {
  static fileExtension = ".png";

  configurationMap = {};
  folderName = "";
  prefix = "";
  postfix = "";

  constructor(configurationMap, folderName, prefix = "", postfix = "") {
    this.configurationMap = configurationMap;
    this.prefix = prefix;
    this.postfix = postfix;
    this.folderName = folderName;
  }

  getFilePath(configurationInput, color) {
    const configurationItem = this.configurationMap[configurationInput];
    if (!configurationItem) {
      throw new Error("Incorrect configuration input");
    }

    if (typeof configurationItem === "object") {
      const { colored, name } = configurationItem;
      if (colored) {
        return (
          this.folderName +
          "/" +
          name +
          "/" +
          this.prefix +
          name +
          this.postfix +
          "_" +
          color +
          ConfigurationPreset.fileExtension
        );
      }

      return (
        this.folderName +
        "/" +
        this.prefix +
        name +
        this.postfix +
        ConfigurationPreset.fileExtension
      );
    } else if (typeof configurationItem === "string") {
      return (
        this.folderName +
        "/" +
        this.prefix +
        configurationItem +
        this.postfix +
        ConfigurationPreset.fileExtension
      );
    } else {
      throw new Error(
        "Unknown type of configuration item: " + configurationItem
      );
    }
  }
}
