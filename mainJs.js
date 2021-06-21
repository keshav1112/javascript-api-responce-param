const getData = `https://api.allorigins.com/get?url=${encodeURIComponent(
  "http://authoring.canvas8.com:9080/uuid-mapper/api/v1/findUuid"
)}`;
const postData = `https://api.allorigins.com/get?url=${encodeURIComponent(
  "http://3.8.78.51:8282/webservice/rest/user/scrapbook/node/createContent/"
)}`;

// const getData = `https://cors-anywhere.herokuapp.com/http://authoring.canvas8.com:9080/uuid-mapper/api/v1/findUuid`
// const postData = `https://cors-anywhere.herokuapp.com/http://3.8.78.51:8282/webservice/rest/user/scrapbook/node/createContent/`

const getDataBtn = document.querySelectorAll(".thumb-to-bookmarks");
const showDataHTML = document.getElementById("showData");
const tagName = document.querySelectorAll("h3");

const hideloader = () => {
  document.getElementById("loading").style.display = "none";
};

const loadGetUrls = async (url, callback) => {
  try {
    const response = await fetch(`${getData}?url=${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
        authorization: `Bearer JWT Token here`,
      },
    });
    const data = await response.text();
    // console.log("data", data);
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

    const payload = {
      urlPath: url,
      nodeType: "CONTENT",
      name: tagName[0].innerText,
      cmsId: data,
    };

    callback(payload);
  } catch (err) {
    if (err.response && err.response.status) {
      return err.response.status;
    }
  }
};

const postIdsUrls = async (payload) => {
  try {
    const response = await fetch(postData, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
        authorization: `Bearer JWT Token here`,
      },
    });

    const data = await response.json();
    console.log("response", data);
  } catch (err) {
    throw new Error("Network response was not ok", err);
  }
};

getDataBtn.forEach((item) =>
  item.addEventListener("click", (event) => {
    const recordId = event.currentTarget.dataset.url;
    loadGetUrls(recordId, postIdsUrls);
  })
);
