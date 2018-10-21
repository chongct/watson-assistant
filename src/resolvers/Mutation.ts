import { assistant, params } from '../helpers/watsonApi';

class WatsonApiCall {
  assistant: any;
  params: any;
  constructor(assistant: object, params: object) {
    this.assistant = assistant;
    this.params = params;
  }

  // Watson Assistant API call to create intent
  apiCreate(intent: string, description: string, examples: {text: string}[]) {
    let newParams = {
      workspace_id: this.params.workspace_id,
      intent,
      description,
      examples
    };
    return new Promise ((resolve, reject) => {
      this.assistant.createIntent(newParams, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response['intent']);
        }
      });
    });
  }

  // Watson Assistant API call to update intent
  apiUpdate(intent: string, newIntent: string, newDescription: string, newExamples: {text: string}[]) {
    let newParams = {
      workspace_id: this.params.workspace_id,
      intent,
      new_intent: newIntent,
      new_description: newDescription,
      new_examples: newExamples
    };
    return new Promise ((resolve, reject) => {
      this.assistant.updateIntent(newParams, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Watson Assistant API call to delete intent
  apiDelete(intent: string) {
    let newParams = {
      workspace_id: this.params.workspace_id,
      intent
    };
    return new Promise ((resolve, reject) => {
      this.assistant.deleteIntent(newParams, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  // Watson Assistant API call to send message
  apiMessage(input: {text: string}) {
    let newParams = {
      workspace_id: this.params.workspace_id,
      input
    };
    return new Promise ((resolve, reject) => {
      this.assistant.message(newParams, (err, response) => {
        if (err) {
          reject(err);
        } else {
          // console.log(response);
          resolve({
            text: response['output']['text'][0],
            conversationId: response['context']['conversation_id']
          });
        }
      });
    });
  }
}
let watsonApiCall = new WatsonApiCall(assistant, params);


// mutation resolvers
async function createIntent(parent, args, context, info) {
  let { intent, description, examples } = args;
  return await watsonApiCall.apiCreate(intent, description, examples);
}

async function updateIntent(parent, args, context, info) {
  let { intent, newIntent, newDescription, newExamples } = args;
  return await watsonApiCall.apiUpdate(intent, newIntent, newDescription, newExamples);
}

async function deleteIntent(parent, args, context, info) {
  return await watsonApiCall.apiDelete(args.intent);
}

async function sendMessage(parent, args, context, info) {
  return await watsonApiCall.apiMessage({
    'text': args.input
  });
}

export {
  createIntent,
  updateIntent,
  deleteIntent,
  sendMessage
}
