const API_BASE = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");

export function requestImageSrc(image) {
  if (!image) return `${process.env.PUBLIC_URL}/problem.jpg`;
  if (/^https?:\/\//i.test(image)) return image;
  const path = image.startsWith("/") ? image : `/${image}`;
  return `${API_BASE}${path}`;
}
