let { assistant, params } = require('../helpers/watsonApi')

// Watson Assistant API call to create intent
function apiCreate(intent, description, examples) {
  params = {
    workspace_id: params.workspace_id,
    intent,
    description,
    examples
  }
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

// Watson Assistant API call to update intent
function apiUpdate(intent, newIntent, newDescription, newExamples) {
  params = {
    workspace_id: params.workspace_id,
    intent,
    new_intent: newIntent,
    new_description: newDescription,
    new_examples: newExamples
  }
  return new Promise ((resolve, reject) => {
    assistant.updateIntent(params, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

// Watson Assistant API call to delete intent
function apiDelete(intent) {
  params = {
    workspace_id: params.workspace_id,
    intent
  }
  return new Promise ((resolve, reject) => {
    assistant.deleteIntent(params, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}


// Watson Assistant API call to send message
function apiMessage(input) {
  params = {
    workspace_id: params.workspace_id,
    input
  }
  console.log(params)
  return new Promise ((resolve, reject) => {
    assistant.message(params, (err, response) => {
      if (err) {
        reject(err)
      } else {
        console.log(response)
        resolve({
          text: response['output']['text'][0],
          conversationId: response['context']['conversation_id']
        })
      }
    })
  })
}


// mutation resolvers
async function createIntent(parent, args, context, info) {
  let { intent, description, examples } = args
  return await apiCreate(intent, description, examples)
}

async function updateIntent(parent, args, context, info) {
  let { intent, newIntent, newDescription, newExamples } = args
  return await apiUpdate(intent, newIntent, newDescription, newExamples)
}

async function deleteIntent(parent, args, context, info) {
  return await apiDelete(args.intent)
}

async function sendMessage(parent, args, context, info) {
  return await apiMessage({
    'text': args.input
  })
}

module.exports = {
  createIntent,
  updateIntent,
  deleteIntent,
  sendMessage
}
