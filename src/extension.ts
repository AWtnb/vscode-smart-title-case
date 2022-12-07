import * as vscode from "vscode";

import { TitleCase, capitalizeFirstChar } from "./title-case";

const getExceptions = ((): string[] => {
  const config = vscode.workspace.getConfiguration("smartTitleCase");
  const userException: string = config.get("exception") || "";
  return userException.split(",").map((x) => x.trim());
});
const SMART_TITLE_CASE = new TitleCase(getExceptions());

const formatSelections = (editor:vscode.TextEditor, formatter: Function) => {
  editor.edit((editBuilder) => {
    editor.selections
      .filter((sel) => !sel.isEmpty)
      .forEach((sel) => {
        const text = editor.document.getText(sel);
        const newText = formatter(text);
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
