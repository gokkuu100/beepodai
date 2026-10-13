import app from "./app.mjs";

export default function handler(request, response) {
  const url = request.url || "/";
  if (!url.startsWith("/api")) {
    const queryIndex = url.indexOf("?");
    const path = queryIndex === -1 ? url : url.slice(0, queryIndex);
    const search = queryIndex === -1 ? "" : url.slice(queryIndex);
    request.url = `/api${path.startsWith("/") ? path : `/${path}`}${search}`;
  }

  return app(request, response);
}
