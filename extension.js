// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const specInWorkSpace = require('./src/specInWorkSpace');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	let disposable = vscode.commands.registerCommand('create-chai-spec.create', function () {
		const currentFile = vscode.window.activeTextEditor.document
		if (currentFile.isUntitled ) {
			vscode.window.showErrorMessage("Current file must be saved on disk")
		} else {
			specInWorkSpace.createInWorkspace(currentFile.uri)
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
