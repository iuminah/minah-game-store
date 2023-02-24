import axios from "axios";
import FormData from "form-data";

const token =
  "67c62940c97240816e00c6efb3315d04a228ab7a99b8067b7747fec2388df1a1aa6443ff4fee50694dd28be44f3474a7ea692938c19c8269147e3ccac9e613cdc4acb84f653870dd7bb01fd1d7e6435784a6cffdf5a9501f719dbcfbf8a71faab04a2ed8a6f3be05dbb8d13973e62686cc83d11e94c9064b194dfe9c9d95052f";

// export const DOMAIN = "http://localhost:1337";
export const DOMAIN = "https://minah-game-cms-uppyx.appengine.bfcplatform.vn";

const apiInstance = axios.create({
  baseURL: `${DOMAIN}/api`,
  headers: {Authorization: `Bearer ${token}`},
});

const fetchAPI = async (query, {variables} = {}) => {
  try {
    const headers = {"Content-Type": "application/json"};

    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${DOMAIN}/graphql`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error("Failed to fetch API");
    }

    return json.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const registerAccount = async (username, email, password) => {
  const data = axios
    .post(`${DOMAIN}/api/auth/local/register`, {
      username: username,
      email: email,
      password: password,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return data;
};

export const logIn = async (email, password) => {
  const data = axios
    .post(`${DOMAIN}/api/auth/local`, {
      identifier: email,
      password: password,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return data;
};

export const forgotPassword = async (email) => {
  const data = axios
    .post(`${DOMAIN}/api/auth/forgot-password`, {
      email: email, // user's email
    })
    .then((res) => {
      console.log("Your user received an email");
      return res;
    })
    .catch((err) => {
      console.log("An error occurred:", err.response);
      return err;
    });
  return data;
};

export const resetPassword = async (privateCode, password) => {
  const data = axios
    .post(`${DOMAIN}/api/auth/reset-password`, {
      code: privateCode, // code contained in the reset link of step 3.
      password: password,
      passwordConfirmation: password,
    })
    .then((res) => {
      console.log("Your user's password has been reset.");
      return res;
    })
    .catch((err) => {
      console.log("An error occurred:", err.response);
      return err;
    });
  return data;
};

export const resendEmail = async (email) => {
  const data = axios
    .post(`${DOMAIN}/api/auth/send-email-confirmation`, {
      email: email, // user's email
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      // console.error("An error occurred:", error.response);
      return err;
    });

  return data;
};

export const uploadAvatar = async (data) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let formdata = new FormData();
  formdata.append("files", data);

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${DOMAIN}/api/upload`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const getUserData = async (userID) => {
  const data = await fetchAPI(
    `
    query getUser ($userID: ID) {
      usersPermissionsUsers(filters: {id: {eq: $userID}}) {
        data {
          id
          attributes {
            username
            email
            avatar {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
    `,
    {
      variables: {
        userID,
      },
    },
  );
  return data?.usersPermissionsUsers?.data[0];
};

export const getNewGameSlide = async (locale) => {
  const data = await fetchAPI(
    `
    query($locale: I18NLocaleCode) {
      newGame (locale: $locale){
        data {
          attributes {
            products {
              data {
                attributes {
                  name
                  slug
                  brief
                  button
                  prices
                  discount
                  cover {
                    data {
                      attributes {
                        url
                        formats
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    {variables: {locale}},
  );
  return data?.newGame?.data?.attributes.products?.data;
};

export const getProducts = async () => {
  const data = await fetchAPI(
    `
    query {
      products {
        data {
          attributes {
            name
            slug
          }
        }
      }
    }
    `,
    {},
  );
  return data?.products?.data;
};

export const getProductBySlug = async (slug, locale) => {
  const data = await fetchAPI(
    `
    query getGameBySlug($slug: String, $locale: I18NLocaleCode) {
      products(locale: $locale,filters: {slug: {eq: $slug}}) {
        data {
          attributes {
            name
            description
          }
        }
      }
    }
    `,
    {variables: {slug, locale}},
  );
  return data?.products?.data?.[0].attributes;
};
