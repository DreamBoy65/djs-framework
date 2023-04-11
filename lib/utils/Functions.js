const {
  readFile,
  writeFile
} = require("fs/promises")

class Functions {
  constructor() {
    this.inviteRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/gi;
    this.botInvRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(app)\.com\/(api\/)?oauth2\/authorize\?([^ ]+)\/?/gi;

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

  clean(text) {
    return String(text)
    .replace(/`/g, `\`${String.fromCharCode(8203)}`)
    .replace(/@/g, `@${String.fromCharCode(8203)}`);
  }

  randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  chunk(array, chunkSize) {
    const temp = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      temp.push(array.slice(i, i + chunkSize));
    }
    return temp;
  }

  firstUpperCase(text, split = ' ') {
    return text.split(split).map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
  }

  shorten(text, maxLen = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...`: text;
  }

  list(arr, conj = 'and') {
    const len = arr.length;
    if (len === 0) return '';
    if (len === 1) return arr[0];
    return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',': ''} ${conj} `: ''}${arr.slice(-1)}`;
  }

  stripInvites(str, {
    guild = true, bot = true, text = '[redacted invite]'
  } = {}) {
    if (guild) str = str.replace(this.inviteRegex, text);
    if (bot) str = str.replace(this.botInvRegex, text);
    return str;
  }

  mergeObj(obj1, obj2) {
    for (var p in obj2) {
      if (obj2[p].constructor == Object) {
        obj1[p] = this.mergeObj(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    }
    return obj1;
  }
}

module.exports = Functions