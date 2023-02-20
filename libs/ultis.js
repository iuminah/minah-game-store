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
