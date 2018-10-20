const { assistant, params } = require('../helpers/watsonApi')

// Watson Assistant API call to create intents
function apiCreate(intent, description, examples) {
  params['intent'] = intent
  params['examples'] = examples
  params['description'] = description
  return new Promise ((resolve, reject) => {
    assistant.createIntent(params, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response['intent'])
      }
    })
  })
}

async function createIntents(parent, args, context, info) {
  let intent = await apiCreate(args.intent, args.description, args.examples)
  return intent
}

module.exports = {
  createIntents
}
