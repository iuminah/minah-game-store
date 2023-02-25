import {DOMAIN} from "./api";

export const getImageUrl = (obj, withDomain = true) => {
  const url = (obj?.data || obj)?.attributes?.url;

  if (!url) return null;

  if (url.match(/^http(s)*:\/\//)) return url;

  return withDomain ? `${DOMAIN}${url}` : url;
};

export const getImageThumbnail = (item) => {
  const thumbnail =
    DOMAIN + item?.attributes?.cover?.data?.attributes?.formats?.thumbnail?.url;
  return thumbnail;
};

export const getFormattedImage = (obj, type, withDomain = true) => {
  const url = obj.data?.attributes?.formats[`${type}`]?.url;

  if (!url) return null;

  if (url.match(/^http(s)*:\/\//u)) return url;

  return withDomain ? `${DOMAIN}${url}` : url;
};

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#dfdfdf" offset="20%" />
      <stop stop-color="#c5c5c5" offset="50%" />
      <stop stop-color="#dfdfdf" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#272727" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const shimmerBlur = (w, h) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

export const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export const fixContent = (content) => {
  return content.replaceAll("/uploads/", `${DOMAIN}/uploads/`);
};

export const lastPrice = (price, discount) => {
  const result = price - price * (discount / 100);
  return `${result.toLocaleString()}₫`;
};

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
