const splitByWhiteSpace = (s: string): string[] => {
  return s.split(/\s/).filter((x) => x.length);
};

const smartConcWords = (ss: string[]): string => {
  return ss.join(" ").replace(/\s+:\s*/g, ": ");
};

const isEndOfSentence = (s: string): boolean => {
  const last = s.charAt(s.length - 1);
  return [".", ":", "!", "?"].includes(last);
};

const startsWithQuote = (s: string): boolean => {
  const start = s.charAt(0);
  return ["'", '"', "\u2018", "\u201c"].includes(start);
};

export class TitleCase {
  private readonly _exceptions: string[];
  private readonly _strict: boolean;
  constructor(exceptions: string[], strict: boolean) {
    this._exceptions = exceptions;
    this._strict = strict;
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

  private toTitle(s: string): string {
    const c = s.charAt(0).toUpperCase();
    const rest = s.substring(1);
    if (this._strict) {
      return c + rest.toLowerCase();
    }
    return c + rest;
  }

  apply(line: string): string {
    const words = splitByWhiteSpace(line);
    const fmt = words
      .map((s) => {
        return this.toTitle(s);
      })
      .map((s) => {
        if (s.indexOf("-") != -1) {
          return this.formatHyphened(s);
        }
        return s;
      })
      .map((s) => {
        if (startsWithQuote(s)) {
          return this.formatQuoted(s);
        }
        return s;
      })
      .map((s, i) => {
        if (i == 0 || isEndOfSentence(words[i - 1]) || !this._exceptions.includes(s)) {
          return s;
        }
        return s.toLowerCase();
      });
    return smartConcWords(fmt);
  }
}

const smartUpperFirst = (s: string): string => {
  if (startsWithQuote(s)) {
    return s.charAt(0) + s.charAt(1).toUpperCase() + s.substring(2);
  }
  return s.charAt(0).toUpperCase() + s.substring(1);
};

const smartLowerCase = (s: string): string => {
  return s.replace(/[A-Z]+/g, (m: string): string => {
    if (m.length > 1) {
      return m;
    }
    return m.toLowerCase();
  });
};

export const capitalizeFirstChar = (s: string, strict: boolean) => {
  const words = splitByWhiteSpace(s);
  const fmt = words
    .map((s) => {
      if (strict) {
        return s.toLowerCase();
      }
      return smartLowerCase(s);
    })
    .map((s, i) => {
      if (i == 0 || isEndOfSentence(words[i - 1])) {
        return smartUpperFirst(s);
      }
      return s;
    });
  return smartConcWords(fmt);
};
