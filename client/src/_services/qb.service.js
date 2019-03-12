import axios from "axios";

export const qbService = {
  login,
  logout,
  getCompany,
  postQBquery
};

function login() {
  return new Promise((resolve, reject) => {
    axios
      .get("api/qb/auth") // get the uri to use below
      .then(res => {
        // use that uri to open a window
        let uri = res.data;
        var parameters = "location=1,width=600,height=800";
        var win = window.open(uri, "connectPopup", parameters);

        var pollOAuth = window.setInterval(() => {
          try {
            if (win.document.URL.indexOf("code") !== -1) {
              window.clearInterval(pollOAuth);
              const redirectUri = win.document.URL;
              win.close();
              resolve(getCallback(redirectUri));
            }
          } catch (e) {
            //when intuit login window is open, there will be an error here
            //for every interval in the above if statement.
          }
        }, 100);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

function getCallback(redirectUri) {
  return axios
    .get(redirectUri)
    .then(res => {
      return { qbConnected: res.data.qbConnected };
    })
    .catch(err => {
      console.log(err);
    });
}

function logout() {
  return axios
    .get("/api/qb/revoke")
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}

function getCompany() {
  return axios
    .get("/api/qb/company")
    .then(response => {
      if (response.data.error === "Not authorized") {
        console.log(response.data);
        // return response.data;
      } else {
        // console.log(response.data);
        return response.data;
      }
      // return await response.data;
    })
    .catch(err => {
      console.log(err);
    });
}

function postQBquery(queryString) {
  console.log("trying to get customers");
  let data = {
    body: queryString
  };
  return axios
    .post("/api/qb/query", data)
    .then(response => {
      return { data: response.data };
    })
    .catch(err => {
      console.log(err);
      // return res.json(err);
    });
}
