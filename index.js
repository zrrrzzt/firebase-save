'use strict'

const { get, put } = require('got')

module.exports = (options) => {
  const save = (args, callback) => {
    return new Promise((resolve, reject) => {
      const selectedKey = args.key || 'value'
      const value = args.value || {}
      const url = `${options.databaseURL}/${selectedKey}.json`

      put(url, {body: JSON.stringify(value), json: true})
        .then((result) => {
          const data = result.body
          if (callback) {
            return callback(null, data)
          }
          resolve(data)
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
        if (callback) {
          return value
        }
        resolve(value)
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
