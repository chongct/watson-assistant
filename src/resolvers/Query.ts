import { assistant, params } from '../helpers/watsonApi';

// Watson Assistant API call to list intents
function apiList() {
  return new Promise ((resolve, reject) => {
    assistant.listIntents(params, (err, response) => {
      if (err) {
        reject(err);
      } else {
        // console.log('1');
        resolve(response['intents']);
      }
    });
  });
}

async function listIntents() {
  let intents = await apiList();
  // console.log('2');
  return intents;
}

export {
  listIntents
}
