const splitByWhiteSpace = (s: string): string[] => {
  return s.split(/\s/).filter((x) => x.length);
};

const smartConcWords = (ss: string[]): string => {
  return ss.join(" ").replace(/\s+:\s*/g, ": ");
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
    const fmt = words
      .map((s) => {
        return s.charAt(0).toUpperCase() + s.substring(1); // not `s.substring(1).toLowerCase()` because `s` may be abbreviation such as "fMRI".
      })
      .map((s) => {
        if (s.indexOf("-") != -1) {
          return this.formatHyphened(s);
        }
        return s;
      })
      .map((s) => {
        if (s.startsWith("'") || s.startsWith('"')) {
          return this.formatQuoted(s);
        }
        return s;
      })
      .map((s, i) => {
        if (i == 0 || words[i - 1].endsWith(":") || words[i - 1].endsWith(".") || !this.exceptions.includes(s)) {
          return s;
        }
        return s.toLowerCase();
      });
    return smartConcWords(fmt);
  }
}

const smartUpperFirst = (s: string): string => {
  if (s.startsWith("'") || s.startsWith('"')) {
    return s.charAt(0) + s.charAt(1).toUpperCase() + s.substring(2);
  }
  return s.charAt(0).toUpperCase() + s.substring(1);
};

const smartLowerFirst = (s: string): string => {
  if (s.startsWith("'") || s.startsWith('"')) {
    return s.charAt(0) + s.charAt(1).toLowerCase() + s.substring(2);
  }
  return s.charAt(0).toLowerCase() + s.substring(1); // not simply `s.toLowerCase()` because abbreviations may appear in the middle of words
};

export const capitalizeFirstChar = (s: string) => {
  const words = splitByWhiteSpace(s);
  const fmt = words.map((s, i) => {
    if (i == 0 || words[i - 1].endsWith(":") || words[i - 1].endsWith(".")) {
      return smartUpperFirst(s);
    }
    return smartLowerFirst(s);
  });
  return smartConcWords(fmt);
};
