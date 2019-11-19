var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

//TODO: remove once the server api is created

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);
const words = ['3dhubs', 'marvin', 'print', 'filament', 'order', 'layer'];
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet('/getRandomWord').reply(200, {
  word: words[getRandomInt(words.length)],
});

export async function getRandomWord() {
  const url = '/getRandomWord';
  const { data } = await axios.get(url);
  return data;
}
