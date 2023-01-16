import axios from "axios";
import FormData from "form-data";

// DEV_TOKEN
// const token =
//   "51be6be305c911ee07001187f65702c001544df3264c16361ae573137dbfa2c1c62ad243ba061db9ffc573b82f7a1194250245aa63214caf354efce2f667950435f76426eabd1b67d0425e0a31e130585e0526ad1ca8c8a1804e83b0318ac9a51c08c66f45bc561522e78c60775261d8614536732e493f456b9f08168517e4c2";

// PRODUCT_TOKEN
const token =
  "2d976260e67219668d8bfd5d84d488ffad02c7e24bed5fa6ec958c485837acc4d66f8208d1097b412f4903fa8c1dea10340806c3fda15923721648b1e6d331f0ede6d95cfb789234ca7b3cf837ce80e6beca2a67f574ebc349b1649696afc486a532a828338d532dbbfd7305b37f8e56ce8fe7aebf797a3040d86f5c08757a03";

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

export const getFeatureSlide = async () => {
  const data = await fetchAPI(
    `
    query{
      featureCover {
        data {
          attributes {
            FeatureCover {
              name
              slug
              image {
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
    }
    `,
    {},
  );
  return data?.featureCover?.data;
};
