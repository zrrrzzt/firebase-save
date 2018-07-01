const axios = require('axios')

module.exports = options => {
  const save = (args, callback) => {
    return new Promise((resolve, reject) => {
      const selectedKey = args.key || 'value'
      const value = args.value || {}
      const url = `${options.databaseURL}/${selectedKey}.json`

      axios.put(url, value)
        .then(result => {
          return callback ? callback(null, result.data) : resolve(result.data)
        })
        .catch((error) => {
          return callback ? callback(error, null) : reject(error)
        })
    })
  }

  const lookup = (args, callback) => {
    return new Promise((resolve, reject) => {
      const selectedKey = args.key || 'value'
      const url = `${options.databaseURL}/${selectedKey}.json`
      axios.get(url).then(result => {
        return callback ? result.data : resolve(result.data)
      }).catch((error) => {
        return callback ? error : reject(error)
      })
    })
  }

  return {
    save: save,
    lookup: lookup
  }
}
