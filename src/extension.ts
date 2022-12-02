import * as vscode from "vscode";

import { TitleCase, capitalizeFirstChar } from "./title-case";

const TITLE_CASE_EXCEPTIONS = ((): string[] => {
  const config = vscode.workspace.getConfiguration("smartTitleCase");
  const exc: string = config.get("exception") || "";
  return exc.split(",").map((x) => x.trim());
})();
const SMART_TITLE_CASE = new TitleCase(TITLE_CASE_EXCEPTIONS);

const formatSelections = (formatter: Function) => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
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
    vscode.commands.registerCommand("smartTitleCase.enable", () => {
      console.log("smart-title-case was enabled!");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("smartTitleCase.apply", () => {
      formatSelections((s: string) => SMART_TITLE_CASE.apply(s));
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("smartTitleCase.capitalizeOnlyFirstChar", () => {
      formatSelections(capitalizeFirstChar);
    })
  );
}

export function deactivate() {}
