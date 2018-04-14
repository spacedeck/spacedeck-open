
# Windows Electron Build

sqlite3 needs to be manually built for the iojs version that electron ships. The following code assumes electron v1.8.4.

````
npm -g install windows-build-tools

cd node_modules\sqlite3

node-gyp configure --module_name=node_sqlite3 --module_path=../lib/binding/electron-v1.8-win32-x64

node-gyp rebuild --target=1.8.4 --target_platform=win32 --dist-url=https://atom.io/download/atom-shell --module_name=node_sqlite3 --module_path=../lib/binding/electron-v1.8-win32-x64 --msvs_version=2015

cd ..\..
````

