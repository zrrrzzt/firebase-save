'use strict'

const { get } = require('got')

module.exports = (options) => {
  const firebase = require('firebase')
  const app = firebase.initializeApp({
    apiKey: options.apiKey,
    authDomain: options.authDomain,
    databaseURL: options.databaseURL
  }, options.appName)

  if (options.authEmail && options.authPassword) {
    app.auth().signInWithEmailAndPassword(options.authEmail, options.authPassword).catch(error => {
      return error
    })
  }

  const database = app.database()

  const save = (args, callback) => {
    return new Promise((resolve, reject) => {
      const selectedKey = args.key || 'value'
      const value = args.value || {}
      const valueRef = database.ref(selectedKey)
      valueRef.set(value)
        .then(() => {
          const result = {key: selectedKey, value: value}
          if (callback) {
            return callback(null, result)
          }
          resolve(result)
        })
        .catch((error) => {
          if (callback) {
            return callback(error, null)
          }
          reject(error)
        })
    })
  }

  const lookup = (args, callback) => {
    return new Promise((resolve, reject) => {
      const selectedKey = args.key || 'value'
      const url = `${options.databaseURL}/${selectedKey}.json`
      get(url, {json: true}).then((data) => {
        const value = data.body
        const result = {key: selectedKey, value: value}
        if (callback) {
          return result
        }
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  return {
    save: save,
    lookup: lookup
  }
}
