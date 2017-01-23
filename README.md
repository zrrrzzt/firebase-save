[![Build Status](https://travis-ci.org/zrrrzzt/firebase-save.svg?branch=master)](https://travis-ci.org/zrrrzzt/firebase-save)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# firebase-save
Save data to [firebase](https://firebase.google.com)

## Installation
```bash
$ npm i firebase-save --save
```

## Usage
Saves and loookups values for a specific key in firebase.
- Uses ```value``` as key if no key supplied.
- Defaults to {} if no value is presented.
- Supports promises and callbacks

```JavaScript
const fbs = require('firebase-save')
const options = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  appName: '<your-app-name>',
  authEmail: '<your-auth-email>',
  authPassword: '<your-auth-password>'
}

const database = fbs(options)

const someData = {
  key: 'somedata',
  value: {
    fishy: true,
    birdy: true,
    ugly: {
      facts: 'alternative'
    }
  }
}

database.save(someData).then(data => console.log(data))

database.lookup({'key': 'somedata'}).then(data => console.log(data))
```

## License
[MIT](LICENSE)

![alt text](https://robots.kebabstudios.party/firebase-save.png "Robohash image of firebase-save")