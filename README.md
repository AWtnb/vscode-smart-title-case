# smart-title-case: helper for formatting citation list.

Enabled on plaintext or markdown file, or manually, `smartTitleCase.enable` command.


## Features



### `smartTitleCase.apply`

+ For each word in the selected string, capitalize the first letter.
+ All letters specified in `smartTitleCase.exception` in `setting.json` will be in lowercase.
    + Exception: the word immediately following `.` or `:` (i.e., the beggining of sentence).

### `smartTitleCase.capitalizeOnlyFirstChar`

+ Capitalize only the first letter of the selected string and convert the rest of the words lowercase.
+ The first letter of the word immediately following `.` or `:` (i.e., the beginning of the sentence) is always converted to uppercase.

---

Good luck to all academics!