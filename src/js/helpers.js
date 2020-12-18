import { TIMEOUT_SEC } from './config';

export const getJSON = async function (url) {
  try {
    const response = await fetch(url);

    const res = await Promise.race([response, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);

    return data;
  } catch (err) {
    console.log('asdasdasd');
    throw err;
  }
};

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
