# smart-title-case

## Features

### `smartTitleCase.apply`

```
this is a pen.
==> This is a Pen.
```

- For each word in the selected string, capitalize the first character.
- Words specified in `smartTitleCase.exception` in `setting.json` will be in lowercase.
    - Changes to `setting.json` are applied by reloading the window.
- Exception: Always capitalize the first character of the word immediately following `.` or `:` (_i.e._, the beggining of sentence).

### `smartTitleCase.capitalizeOnlyFirstChar`

```
this is a pen.
==> This is a pen.
```

- Capitalize only the first character of the selected string and convert the rest of the words lowercase.
- Exception: Always capitalize the first character of the word immediately following `.` or `:` (_i.e._, the beggining of sentence).

### `-strictly` commands

Above commands do not convert consecutive uppercase letters (_e.g._, `DNA`) because they are often abbreviations. To include such abbreviations, you can use `smartTitleCase.apply-strictly` or `smartTitleCase.capitalizeOnlyFirstChar-strictly`.


---

Good luck to all academics!