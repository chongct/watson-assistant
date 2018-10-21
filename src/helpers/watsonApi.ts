import watson = require('watson-developer-cloud')

interface apiValues {
  username: string;
  password: string;
  version: string;
}
const watsonApiValues: apiValues = {
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  version: process.env.WATSON_VERSION
};
const assistant = new watson.AssistantV1(watsonApiValues)

const params: { workspace_id: string; } = {
  workspace_id: process.env.WATSON_WORKSPACE_ID
}

export {
  assistant,
  params
}
