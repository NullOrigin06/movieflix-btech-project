const PRE_DEPLOYMENT_URL = "https://movieflix-api.onrender.com/api";
const LIVE_RENDER_URL = "https://movieflix-api-gvet.onrender.com/api";

export function resolveApiBase(configuredUrl) {
  const url = configuredUrl || "http://localhost:5000/api";
  const resolved = url === PRE_DEPLOYMENT_URL ? LIVE_RENDER_URL : url;
  return resolved.replace(/\/$/, "");
}
