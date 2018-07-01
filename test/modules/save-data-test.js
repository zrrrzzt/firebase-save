const tap = require('tap')
const fbs = require('../../index')
const options = {
  databaseURL: 'https://seneca-firebase-test.firebaseio.com'
}
const db = fbs(options)

const someData = {
  key: 'somedata',
  value: {
    birdy: true,
    fishy: true,
    ugly: {
      facts: 'alternative'
    }
  }
}

tap.test('it saves data', test => {
  return db.save(someData)
    .then(data => {
      tap.equal(JSON.stringify(data), JSON.stringify(someData.value), 'Input equals output')
      test.done()
    }).catch(error => {
      throw error
    })
})
