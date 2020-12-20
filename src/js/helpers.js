import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const response = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : await fetch(url);

    const res = await Promise.race([response, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);

    return data;
  } catch (err) {
    console.log('asdasdasd');
    throw err;
  }
};

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

//     const data = await res.json();
//     console.log(data);
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
// export const getJSON = async function (url) {
//   try {
//     const response = await fetch(url);

//     const res = await Promise.race([response, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (data.status !== 'success') throw new Error(data.message);

//     return data;
//   } catch (err) {
//     console.log('asdasdasd');
//     throw err;
//   }
// };

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setInterval(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
