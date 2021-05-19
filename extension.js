// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const createSpecInWorkspace = require('./src/create-spec-in-workspace');
const uri = require('./src/uri-parser');
const uriUtils = require('vscode-uri').Utils;
const view = require('./src/vscode-view');
const fs = require('./src/fs-adapter');
const chai = require('./src/spec-templates/mocha-chai-bdd')
const cfg = require('./src/config')
const path = require('./src/path')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	let disposable = vscode.commands.registerCommand(
		'create-chai-spec.create', 
		() => {
			const currentFile = vscode.window.activeTextEditor.document
			const config = cfg.config[uriUtils.extname(currentFile.uri)]
			if (currentFile.isUntitled ) {
				vscode
					.window
					.showErrorMessage("Current file must be saved on disk")
				return
			}
			if (!config) {
				vscode
					.window
					.showErrorMessage("File format not supported")
			}

			createSpecInWorkspace.facade({
				documentParser: uri,
				view: view,
				store: fs,
				spec: chai,
				config: config,
				path: path
			}).create(currentFile.uri)
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
