

const request = require('request-promise-native');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = '642e8233cb764f12b33040ae2d6008bc';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';
const uriBaseVerify = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify';

const imageUrl = 'https://downloader.disk.yandex.ru/disk/c8e2458c9d88ef0da574331d73e967bee10ba1840ffbf27c65a1a9bfbe590ece/5c9f9b97/DnvQHQgWZ3f7_5Ws7oU9WCBJML7Zki3T5cXQH4_A8Q_FGYzf3xOIY0a0pGxpjK1PWMtPJ8UTCGNPSAjE_0MGJA%3D%3D?uid=0&filename=%D1%84%D0%BE%D1%82%D0%BE.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&fsize=132236&hid=f458a4d4723b91a0672044b4675f295b&media_type=image&tknv=v2&etag=20ca2e5743ce8fa5598f495d84b2ee7a';

const imageUrl2 = 'https://downloader.disk.yandex.ru/disk/ba541fe338930e22c12415e786810a74a812ab51fdaaa6b05d9ceb1006793ae3/5ca012ae/DnvQHQgWZ3f7_5Ws7oU9WC9kmeengtu1hI9qYtPTATz9Wa6cLIzaqF_3ybPq2qGcgyBVPmwaZxa-AXYRxuRjvw%3D%3D?uid=0&filename=IMG_0536.JPG&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&fsize=122792&hid=80a60029ea5de86a94a28b7f5d14890f&media_type=image&tknv=v2&etag=4273c63d86e08387a30f9fd979891ab6';

// Request parameters.
const params = {
  returnFaceId: 'true',
  returnFaceLandmarks: 'false',
  returnFaceAttributes: 'age,gender,headPose,smile,facialHair,glasses,'
      + 'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
};

const options = {
  uri: uriBase,
  qs: params,
  body: `${'{"url": ' + '"'}${imageUrl}"}`,
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': subscriptionKey
  }
};

const options2 = {
  uri: uriBase,
  qs: params,
  body: `${'{"url": ' + '"'}${imageUrl}"}`,
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': subscriptionKey
  }
};

let jsonResponse = [];
let jsonResponse2 = [];


async function getId() {
  await request.post(options, (error, response, body) => {
    if (error) {
      console.log('Error: ', error);
      return;
    }
    jsonResponse = JSON.parse(body);
    console.log('JSON Response\n');
    console.log(jsonResponse);
  });
  console.log('JSON Response\n');

  // await request.post(options2, async (error, response, body) => {
  //   if (error) {
  //     console.log('Error: ', error);
  //     return;
  //   }
  //   jsonResponse2 = JSON.parse(body);

  //   console.log('JSON Response2\n');
  //   console.log(jsonResponse2);
  // });
}


async function compareFoto() {
  try {
    await getId();
    const optionsCompare = {
      uri: uriBaseVerify,
      // qs: params,
      body: JSON.stringify({ faceId1: jsonResponse[0].faceId, faceId2: jsonResponse2[0].faceId }),
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey
      }
    };
    //  console.log('JSON ResponseCompare\n');
    //  console.log(jsonResponse2[0].faceId);
    //  console.log(jsonResponse[0].faceId);
    let jsonResponseCompare = [];
    await request.post(optionsCompare, (error, response, body) => {
      if (error) {
        console.log('Error: ', error);
        return;
      }
      jsonResponseCompare = JSON.stringify(JSON.parse(body), null, '  ');
      console.log('JSON ResponseCompare\n');
      console.log(jsonResponseCompare);
    });
  } catch (e) {
    console.error(e);
  }
}

getId();
// compareFoto();
