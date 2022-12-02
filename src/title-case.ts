const splitByWhiteSpace = (s: string): string[] => {
  return s
    .split(/\s/)
    .filter((x) => x.length)
    .map((x) => x.trim());
};

export class TitleCase {
  readonly exceptions: string[];
  constructor(exceptions: string[]) {
    this.exceptions = exceptions;
  }

  private formatHyphened(s: string): string {
    return s
      .split("-")
      .map((x) => this.apply(x))
      .join("-");
  }

  private formatQuoted(s: string): string {
    return s.charAt(0) + this.apply(s.substring(1));
  }

  apply(s: string): string {
    const words = splitByWhiteSpace(s);
    return words
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .map((s, i) => {
        if (i == 0 || words[i - 1].endsWith(":") || words[i - 1].endsWith(".")) {
          return s;
        }
        if (this.exceptions.includes(s)) {
          return s.toLowerCase();
        }
        if (s.indexOf("-") != -1) {
          return this.formatHyphened(s);
        }
        if (s.startsWith("'") || s.startsWith('"')) {
          return this.formatQuoted(s);
        }
        return s;
      })
      .join(" ")
      .replace(/\s+:\s*/g, ": ");
  }
}

export const capitalizeFirstChar = (s: string) => {
  const words = splitByWhiteSpace(s);
  return words
    .map((s, i) => {
      if (i == 0 || words[i - 1].endsWith(":") || words[i - 1].endsWith(".")) {
        return s.charAt(0).toUpperCase() + s.substring(1);
      }
      // Abbreviations may appear in the middle of words
      return s.charAt(0).toLowerCase() + s.substring(1);
    })
    .join(" ")
    .replace(/\s+:\s*/, ": ")
    .replace(/["'-][A-Z]/g, (m: string) => {
      return m.toLowerCase();
    });
};
