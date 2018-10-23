import { assistant, params } from '../helpers/watsonApi';

// Watson Assistant API call to list intents
function apiList() {
  return new Promise ((resolve, reject) => {
    assistant.listIntents(params, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response['intents']);
      }
    });
  });
}

// query resolver
async function listIntents() {
  return await apiList();
}

export {
  listIntents
}
