const { BrowserWindow, app } = require('electron')
require('./index.js')

let mainWindow = null

function main() {
  mainWindow = new BrowserWindow()
  mainWindow.loadURL(`http://localhost:8180/`)
  mainWindow.on('close', event => {
    mainWindow = null
  })
}

app.on('ready', main)