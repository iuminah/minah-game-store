import axios from "axios";
import FormData from "form-data";

// const token = process.env.STRAPI_API_TOKEN;
const token =
  "20d1b7e62f73a483d53866e7833ffa62ebb87abd2f9c4ab73456185dc87c68e43be56cf099b4cf12be7d49f5b3f677a5b20de74901f0d3791a3813373a73ebb1943a289e866a34537ea210e21ed6f4acc5572cbb258759b71f18ed93fc66a4313413504d476a423b85192ceea33ff126e36b9de75fd166839c5cb01dfcf9fa94";

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

export const getProduct = async () => {
  const data = await fetchAPI(
    `
    query{
      featureCover {
        data {
          attributes {
            FeatureCover {
              name
              link
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
