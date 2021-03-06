// Main process
'use strict';
const path = require('path');
const app = require('app');
const ipc = require('electron').ipcMain;
const BrowserWindow = require('browser-window');

app.on('ready', () => {
	const win = new BrowserWindow({
		webPreferences: {
			// Load `electron-notification-shim` in rendering view.
			preload: path.join(__dirname, 'browser.js')
		}
	});

	// Listen for notification events.
	ipc.on('notification-shim', (e, msg) => {
		console.log(`Title: ${msg.title}, Content: ${msg.options.content}`);
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.openDevTools();
});
