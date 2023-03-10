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

export const changePassword = async (
  currentPassword,
  password,
  confirmPassword,
  userJwt,
) => {
  const data = axios
    .post(
      `${DOMAIN}/api/auth/change-password`,
      {
        currentPassword: currentPassword,
        password: password,
        passwordConfirmation: confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${userJwt}`,
        },
      },
    )
    .then((res) => {
      console.log("res : ", "res");
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

export const uploadAvatar = async (image) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let formdata = new FormData();
  formdata.append("files", image);

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const data = fetch(`${DOMAIN}/api/upload`, requestOptions)
    .then((result) => result)
    .catch((error) => error);
  return data;
};

export const changeUserInfo = async (userID, inputData) => {
  const data = await fetchAPI(
    `
    mutation updateUser($userID: ID!, $inputData: UsersPermissionsUserInput!) {
      updateUsersPermissionsUser(id: $userID, data: $inputData ){
        data {
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
    {variables: {userID, inputData}},
  );
  return data;
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
                  title
                  link
                  brief
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

export const getProducts = async (locale) => {
  const data = await fetchAPI(
    `
    query getProduct($locale: I18NLocaleCode) {
      products(locale: $locale) {
        data {
          attributes {
            title
            link
            locale
          }
        }
      }
    }
    `,
    {variables: {locale}},
  );
  return data?.products?.data;
};

export const getProductByLink = async (link, locale) => {
  const data = await fetchAPI(
    `
    query getProduct($locale: I18NLocaleCode) {
      products(locale: $locale) {
        data {
          attributes {
            title
            link
            developer
            publisher
            releaseDate
            gallery {
              data {
                attributes {
                  url
                }
              }
            }
            logo {
              data {
                attributes {
                  url
                }
              }
            }
            platforms {
              data {
                attributes {
                  os
                }
              }
            }
            windows {
              __typename
              ... on ComponentSpecificationsMinimum {
                OS
                Processor
                Memory
                Storage
                Graphics
              }
              ...on ComponentSpecificationsRecommended {
                OS
                Processor
                Memory
                Storage
                Graphics
              }
            }
            macos {
              __typename
              ... on ComponentSpecificationsMinimum {
                OS
                Processor
                Memory
                Storage
                Graphics
              }
              ...on ComponentSpecificationsRecommended {
                OS
                Processor
                Memory
                Storage
                Graphics
              }
            }
            description
          }
        }
      }
    }
    `,
    {variables: {link, locale}},
  );
  return data?.products?.data?.[0].attributes;
};

export const getCategoties = async (locale) => {
  const data = await fetchAPI(
    `
    query getCategories($locale : I18NLocaleCode) {
      categories(locale : $locale){
        data {
          attributes {
            title
            products(sort: "publishedAt:desc") {
              data {
                attributes {
                  title
                  verticalCover{
                    data{
                      attributes {
                        url
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
  return data?.categories?.data;
};
