# smart-title-case

Helper for formatting citation list.

## Features



### `smartTitleCase.apply`

```
this is a pen.
==> This is a Pen.
```

+ For each word in the selected string, capitalize the first character.
+ Words specified in `smartTitleCase.exception` in `setting.json` will be in lowercase.
    + Exception: Always capitalize the first character of the word immediately following `.` or `:` (_i.e._, the beggining of sentence).

### `smartTitleCase.capitalizeOnlyFirstChar`

```
this is a pen.
==> This is a pen.
```

+ Capitalize only the first character of the selected string and convert the rest of the words lowercase.
    + Exceptions:
        + Always capitalize the first character of the word immediately following `.` or `:` (_i.e._, the beggining of sentence).
        + Consecutive capital letters are not changed (_e.g._, `DNA`).

---

Good luck to all academics!