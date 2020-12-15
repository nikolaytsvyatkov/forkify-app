import URL from './config'

export const  getJSON = async function(url) {
    try {
     
        const response = await fetch(url);
        const data = await response.json();
        if (data.status !== 'success') throw new Error(data.message)

        return data;
    }catch(err) {
        
        throw err;
        
    }

}

export const  timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
  