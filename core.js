// const payload = "/signals/2021/06/17/americans-eager-travel.html";

const getData = `http://authoring.canvas8.com:9080/uuid-mapper/api/v1/findUuid`;
const postData =
  `http://3.8.78.51:8282/webservice/rest/user/scrapbook/node/createContent/`;
const getDataBtn = document.querySelectorAll(".thumb-to-bookmarks");
const showDataHTML = document.getElementById("showData");

const hideloader = () => {
  document.getElementById("loading").style.display = "none";
};

const loadGetUrls = async (url, callback) => {
  try {
    const response = await fetch(`${getData}?url=${url}`);
    const data = await response.text();
    console.log('data', data);
    // let result = `<h2> show dummy data in list </h2>`;

  //   data.forEach((item) => {
  //     const { id, userId, title, completed } = item;
  //     result += `
	// 	<li>${id}</li>
	// 	<li>${userId}</li>
	// 	<li>${title}</li>
	// 	<li>${completed}</li>
	// `;
  //     const bindData = `<ul>${result}</ul>`;
  //     showDataHTML.innerHTML = bindData;
  //   });

    if (data) {
      hideloader();
    }

    callback();
  } catch (err) {
    if (err.response && err.response.status) {
      return err.response.status;
    }
  }
};

let _data = {
  urlPath: "/signals/2021/06/16/keen-experiment-makeup.html",
  nodeType: "CONTENT",
  name: "experiment",
  cmsId: "76564756"
}

const postIdsUrls = async () => {
  try {
    const response = await fetch(postData, {
      method: "POST",
      body: JSON.stringify(_data),
      headers: {
        'Content-Type': 'application/json',
          authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXNoYXZAY2FudmFzOC5jb20iLCJpYXQiOjE2MjM5MzM5ODksImV4cCI6MTYyNDAyMDM4OX0.rKFrFmykOnx2V-Tytn9D_2Gbczd5qaV21YxJODLo6Bk`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  } catch (err) {
    throw new Error("Network response was not ok", err);
  }
};

getDataBtn.forEach(item => item.addEventListener('click', (event) => {
  const recordId = event.currentTarget.dataset.url;
  loadGetUrls(recordId, postIdsUrls)
}))
