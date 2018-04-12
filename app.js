const spacedeck = require('./spacedeck')

const electron = require('electron')
const electronApp = electron.app
const BrowserWindow = electron.BrowserWindow
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 1200, height: 700})
  mainWindow.loadURL("http://localhost:9666")
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

electronApp.on('ready', createWindow)

// Quit when all windows are closed.
electronApp.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    electronApp.quit()
  }
})

electronApp.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
