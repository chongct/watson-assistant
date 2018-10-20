const watson = require('watson-developer-cloud')

const assistant = new watson.AssistantV1({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  version: process.env.WATSON_VERSION
})

const params = {
  workspace_id: process.env.WATSON_WORKSPACE_ID
}

module.exports = {
  assistant,
  params
}
