

const request = require('request-promise-native');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = '642e8233cb764f12b33040ae2d6008bc';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';
const uriBaseVerify = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify';

const imageUrl = 'https://3.downloader.disk.yandex.ru/disk/17c547ec3cc18b91cdeffb8f0a542d1fa2fb43d146721e4b3dfb35656da9b884/5ca0c917/DnvQHQgWZ3f7_5Ws7oU9WCBJML7Zki3T5cXQH4_A8Q_FGYzf3xOIY0a0pGxpjK1PWMtPJ8UTCGNPSAjE_0MGJA%3D%3D?uid=2828552&filename=%D1%84%D0%BE%D1%82%D0%BE.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&fsize=132236&hid=f458a4d4723b91a0672044b4675f295b&media_type=image&tknv=v2&etag=20ca2e5743ce8fa5598f495d84b2ee7a';

const imageUrl2 = 'https://4.downloader.disk.yandex.ru/disk/6397c4b7b2df18af7b7dc17cf63d9553a5c2bcd23ff034a613f5f8928c68958d/5ca0c5ec/DnvQHQgWZ3f7_5Ws7oU9WP-pvEMD2Pi6Bwff1q8BIzIlwLmEjM0pQXJLUh7W434mJTeiIMXBu7Uipo-hPL1gWw%3D%3D?uid=2828552&filename=20130130_%D0%9B%D0%B5%D0%B2%D0%B8%D0%BD_28.JPG&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&fsize=177017&hid=1764e9cdd7588e193f7d057de107a04f&media_type=image&tknv=v2&etag=8f4350693ed885416f70314cc00bdec5';

// Request parameters.
// const params = {
//   returnFaceId: 'true',
//   returnFaceLandmarks: 'false',
//   returnFaceAttributes: 'age,gender,headPose,smile,facialHair,glasses,'
//       + 'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
// };

// const options = {
//   uri: uriBase,
//   qs: params,
//   body: `${'{"url": ' + '"'}${imageUrl}"}`,
//   headers: {
//     'Content-Type': 'application/json',
//     'Ocp-Apim-Subscription-Key': subscriptionKey
//   }
// };

// const options2 = {
//   uri: uriBase,
//   qs: params,
//   body: `${'{"url": ' + '"'}${imageUrl2}"}`,
//   headers: {
//     'Content-Type': 'application/json',
//     'Ocp-Apim-Subscription-Key': subscriptionKey
//   }
// };

// let jsonResponse = [];
// let jsonResponse2 = [];


// async function getId2() {
//   await request.post(options, (error, response, body) => {
//     if (error) {
//       console.log('Error: ', error);
//       return;
//     }
//     jsonResponse = JSON.parse(body);
//     console.log('JSON Response\n');
//     console.log(jsonResponse);
//   });


//   await request.post(options2, async (error, response, body) => {
//     if (error) {
//       console.log('Error: ', error);
//       return;
//     }
//     jsonResponse2 = JSON.parse(body);

//     console.log('JSON Response2\n');
//     console.log(jsonResponse2);
//   });
// }

async function getId(url) {
  try {
    const params = {
      returnFaceId: 'true',
      returnFaceLandmarks: 'false',
      returnFaceAttributes: 'age,gender,headPose,smile,facialHair,glasses,'
        + 'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
    };

    const options = {
      uri: uriBase,
      qs: params,
      body: `${'{"url": ' + '"'}${url}"}`,
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey
      }
    };
    let jsonResponse = [];
    await request.post(options, async (error, response, body) => {
      if (error) {
        console.log('Error: ', error);
        return;
      }
      jsonResponse = await JSON.parse(body);
      console.log(`JSON Response\n${url}`);
    // console.log(jsonResponse);
    });
    return jsonResponse;
  } catch (e) {
    console.error(e);
  }
}


async function compareFoto(url1, url2) {
  try {
    const jsonResponse1 = await getId(url1);
    const jsonResponse2 = await getId(url2);
    const optionsCompare = {
      uri: uriBaseVerify,
      // qs: params,
      body: JSON.stringify({ faceId1: jsonResponse1[0].faceId, faceId2: jsonResponse2[0].faceId }),
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey
      }
    };
    let jsonResponseCompare = [];
    await request.post(optionsCompare, async (error, response, body) => {
      if (error) {
        console.log('Error: ', error);
        return;
      }
      jsonResponseCompare = await JSON.parse(body);
      console.log('JSON ResponseCompare\n');
      console.log(jsonResponseCompare);
    });
    console.log(jsonResponseCompare.isIdentical);
    return jsonResponseCompare.isIdentical;
  } catch (e) {
    console.error(e);
  }
}


// compareFoto(imageUrl, imageUrl2);

module.exports = compareFoto;
