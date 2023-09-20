'use strict';

const extract = require('extract-zip')
const config = require('config')
const fs = require('fs')
const path = require('path')

const db = require('../models/db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { v4: uuidv4 } = require('uuid');


require('../models/db')

module.exports = {
  importZIP: function(user, zipPath) {

    // 1. extract zip to local storage folder
    // 2. read spaces.json from this folder
    // 3. iterate through spaces and read all their artifact jsons
    // 4. fixup storage paths
    // 5. replace creator id by user._id

    let relativeImportDir = 'import_'+user._id
    let importDir = path.resolve(config.get('storage_local_path')+'/'+config.get('storage_bucket')+'/'+relativeImportDir)
    
    if (!fs.existsSync(importDir)) {
      fs.mkdirSync(importDir)
    }
  
    extract(zipPath, {dir: importDir}, function(err) {
      if (err) {
        console.log(err)
        return
      }
      console.log('[import] extracted to',importDir)

      let spacesJson = fs.readFileSync(importDir+'/spaces.json')
      let spaces = JSON.parse(spacesJson)
      var homeFolderId = null

      console.log('[import] spaces:',spaces.length)

      // pass 1: find homefolder
      for (var i=0; i<spaces.length; i++) {
        let space = spaces[i]
        if (!space.parent_space_id) {
          homeFolderId = space._id
          break
        }
      }

      console.log("[import] homeFolderId:",homeFolderId)

      for (var i=0; i<spaces.length; i++) {
        let space = spaces[i]

        if (space.parent_space_id) {
          let artifacts = JSON.parse(fs.readFileSync(importDir+'/'+space._id+'_artifacts.json'))
          console.log('[import] space',space._id,'artifacts:',artifacts.length)

          //let q = {where: {_id: space._id}}
          space.creator_id = user._id
          delete space.__v
          
          // transplant homefolder
          console.log("parent:",space.parent_space_id)
          if (space.parent_space_id+"" == homeFolderId+"") {
            space.parent_space_id = user.home_folder_id
          }

          // move nested attrs
          console.log(space)
          for (k in space.advanced) {
            space[k] = space.advanced[k]
          }

          db.Space.create(space)
            .error((err) => {
              console.error("[import] space upsert err:",err)
            })
          
          for (var j=0; j<artifacts.length; j++) {
            let a = artifacts[j]
            
            let q = {_id: a._id}
            a.user_id = user._id
            delete a.__v
            delete a.payload_thumbnail_big_uri
            
            // move nested attrs
            for (k in a.style) {
              a[k] = a.style[k]
            }
            for (k in a.meta) {
              a[k] = a.meta[k]
            }
            for (k in a.board) {
              a[k] = a.board[k]
            }

            let prefix = "/storage/"+relativeImportDir+"/"+space._id+"_files/"
            if (a.thumbnail_uri && a.thumbnail_uri[0]!='/') a.thumbnail_uri = prefix + a.thumbnail_uri
            if (a.payload_uri && a.payload_uri[0]!='/') a.payload_uri = prefix + a.payload_uri
            if (a.payload_thumbnail_web_uri && a.payload_thumbnail_web_uri[0]!='/') a.payload_thumbnail_web_uri = prefix + a.payload_thumbnail_web_uri
            if (a.payload_thumbnail_medium_uri && a.payload_thumbnail_medium_uri[0]!='/') a.payload_thumbnail_medium_uri = prefix + a.payload_thumbnail_medium_uri

            if (a.payload_alternatives) {
              for (var k=0; k<a.payload_alternatives.length; k++) {
                let alt = a.payload_alternatives[k]
                
                if (alt.payload_uri && alt.payload_uri[0]!='/') alt.payload_uri = prefix + alt.payload_uri
                if (alt.payload_thumbnail_web_uri && alt.payload_thumbnail_web_uri[0]!='/') alt.payload_thumbnail_web_uri = prefix + alt.payload_thumbnail_web_uri
                if (alt.payload_thumbnail_medium_uri && alt.payload_thumbnail_medium_uri[0]!='/') alt.payload_thumbnail_medium_uri = prefix + alt.payload_thumbnail_medium_uri
              }
            }

            db.packArtifact(a)

            db.Artifact.create(a).error(function(err) {
              console.error("[import] artifact upsert err:",err)
            })
          }
        }
      }
    })
  }
}
