import * as vscode from "vscode";

import { TitleCase, capitalizeFirstChar } from "./title-case";

const getExceptions = (): string[] => {
  const config = vscode.workspace.getConfiguration("smartTitleCase");
  const userException: string = config.get("exception") || "";
  return userException.split(",").map((x) => x.trim());
};
const SMART_TITLE_CASE = new TitleCase(getExceptions());

const formatSelectedText = (s: string, linebreak: string, formatter: Function): string => {
  return s
    .split(linebreak)
    .map((line) => {
      const indentDepth = line.length - line.trimStart().length;
      const indentation = line.substring(0, indentDepth);
      const target = line.substring(indentDepth);
      return indentation + formatter(target);
    })
    .join(linebreak);
};

const formatSelections = (editor: vscode.TextEditor, formatter: Function) => {
  editor.edit((editBuilder) => {
    editor.selections
      .filter((sel) => !sel.isEmpty)
      .forEach((sel) => {
        const text = editor.document.getText(sel);
        const linebreak = editor.document.eol == 1 ? "\n" : "\r\n";
        const newText = formatSelectedText(text, linebreak, formatter);
        if (text != newText) {
          editBuilder.replace(sel, newText);
        }
      });
  });
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("smartTitleCase.apply", (editor: vscode.TextEditor) => {
      formatSelections(editor, (s: string) => SMART_TITLE_CASE.apply(s));
    })
  );
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("smartTitleCase.capitalizeOnlyFirstChar", (editor: vscode.TextEditor) => {
      formatSelections(editor, capitalizeFirstChar);
    })
  );
}

export function deactivate() {}
