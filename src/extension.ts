import * as vscode from "vscode";

import { TitleCase, capitalizeFirstChar } from "./title-case";

type Formatter = (s: string) => string;

class SelectionsFormatter {
  private readonly _editor: vscode.TextEditor;
  private readonly _formatter: Formatter;
  constructor(editor: vscode.TextEditor, formatter: Formatter) {
    this._editor = editor;
    this._formatter = formatter;
  }

  private onText(s: string): string {
    const linebreak = this._editor.document.eol == 1 ? "\n" : "\r\n";
    return s
      .split(linebreak)
      .map((line) => {
        const indentDepth = line.length - line.trimStart().length;
        const indentation = line.substring(0, indentDepth);
        const target = line.substring(indentDepth);
        return indentation + this._formatter(target);
      })
      .join(linebreak);
  }

  apply() {
    const workspaceEdit = new vscode.WorkspaceEdit();
    const sels = this._editor.selections;
    sels
      .filter((sel) => !sel.isEmpty)
      .forEach((sel) => {
        const text = this._editor.document.getText(sel);
        const newText = this.onText(text);
        workspaceEdit.replace(this._editor.document.uri, sel, newText);
      });
    vscode.workspace.applyEdit(workspaceEdit).then(() => {
      this._editor.selections = sels;
    });
  }
}

const loadExceptions = (): string[] => {
  const config = vscode.workspace.getConfiguration("smartTitleCase");
  return (String(config.get("exception")) || "").split(",").map((x) => x.trim());
};

const EXCEPTIONS = loadExceptions();
const TITLE_CASE = new TitleCase(EXCEPTIONS, false);
const STRICT_TITLE_CASE = new TitleCase(EXCEPTIONS, true);

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("smartTitleCase.apply", (editor: vscode.TextEditor) => {
      const sf = new SelectionsFormatter(editor, (s: string): string => TITLE_CASE.apply(s));
      sf.apply();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("smartTitleCase.apply-strictly", (editor: vscode.TextEditor) => {
      const sf = new SelectionsFormatter(editor, (s: string): string => STRICT_TITLE_CASE.apply(s));
      sf.apply();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("smartTitleCase.capitalizeOnlyFirstChar", (editor: vscode.TextEditor) => {
      const f = (s: string): string => capitalizeFirstChar(s, false);
      const sf = new SelectionsFormatter(editor, f);
      sf.apply();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("smartTitleCase.capitalizeOnlyFirstChar-strictly", (editor: vscode.TextEditor) => {
      const f = (s: string): string => capitalizeFirstChar(s, true);
      const sf = new SelectionsFormatter(editor, f);
      sf.apply();
    })
  );
}

export function deactivate() {}
