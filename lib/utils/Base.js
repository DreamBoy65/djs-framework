const Logger = require("./Logger")
const {
  EventEmitter
} = require("events")

class Base extends EventEmitter {
  constructor() {
    super()
    this.log = new Logger()
  }

  sleep(ms) {
    return new Promise((res) => setTimeout(() => res(), ms));
  }

  readFileAsync(path) {
    return readFile(path);
  }

  writeFileAsync(path, content) {
    return writeFile(path, content);
  }

  compareObject(obj1, obj2) {
    for (const key in obj1) {
      if (obj2[key] === undefined) {
        return false;
      }
      if (typeof obj1[key] === 'object' && !Array.isArray(obj1[key])) {
        if (!this.compareObject(obj1[key], obj2[key])) {
          return false;
        }
      }
    }
    return true;
  }

  textTruncate(str = "", length = 100, end = "...") {
    return (
      String(str).substring(0, length - end.length) +
      (str.length > length ? end: "")
    );
  }

  truncate(...options) {
    return this.textTruncate(...options);
  }

  ordinalize(n = 0) {
    return (
      Number(n) + [, "st", "nd", "rd"][(n / 10) % 10 ^ 1 && n % 10] ||
      Number(n) + "th"
    );
  }

  commatize(number, maximumFractionDigits = 2) {
    return Number(number || "").toLocaleString("en-US", {
      maximumFractionDigits,
    });
  }

  compactNum(number, maximumFractionDigits = 2) {
    return Number(number || "").toLocaleString("en-US", {
      notation: "compact",
      maximumFractionDigits,
    });
  }

  joinArray(array = []) {
    return list.format(array.map((x) => String(x)));
  }
  
  clean(text) {
  return String(text)
  .replace(/`/g, `\`${String.fromCharCode(8203)}`)
  .replace(/@/g, `@${String.fromCharCode(8203)}`);
}
}

module.exports = Base