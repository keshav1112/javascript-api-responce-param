const getData = "http://authoring.canvas8.com:9080/uuid-mapper/api/v1/findUuid";

const postData =
  "http://3.8.78.51:8282/webservice/rest/user/scrapbook/node/createContent/";

// const getData = `https://cors-anywhere.herokuapp.com/http://authoring.canvas8.com:9080/uuid-mapper/api/v1/findUuid`
// const postData = `https://cors-anywhere.herokuapp.com/http://3.8.78.51:8282/webservice/rest/user/scrapbook/node/createContent/`

// const getData = "http://authoring.canvas8.com:9080/uuid-mapper/api/v1/findUuid";
// const postData =
//   "http://3.8.78.51:8282/webservice/rest/user/scrapbook/node/createContent/";

const getDataBtn = document.querySelectorAll(".thumb-to-bookmarks");
const showDataHTML = document.getElementById("showData");
// const tagName = document.getElementsByTagName("H3");

const hideloader = () => {
  document.getElementById("loading").style.display = "none";
};

const loadGetUrls = async (url, title, callback) => {
  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        getData
      )}?url=${url}`
    );
    const data = await response.json();
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
      name: title.parentNode.children[1].innerText,
      cmsId: data.contents,
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
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        "http://3.8.78.51:8282/webservice/rest/user/scrapbook/node/createContent/"
      )}`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("response", data);
  } catch (err) {
    throw new Error("Network response was not ok", err);
  }
};

getDataBtn.forEach((item) =>
  item.addEventListener("click", (event) => {
    const recordId = event.currentTarget.dataset.url;
    const heading = event.target;
    loadGetUrls(recordId, heading, postIdsUrls);
  })
);
