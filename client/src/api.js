import { resolveApiBase } from "./apiBase";

// All the talking to our backend happens here, so pages stay simple.
const API = resolveApiBase(import.meta.env.VITE_API_URL);

// Sends a request. If the user is logged in, it adds their token.
async function request(path, method = "GET", body) {
  const headers = { "Content-Type": "application/json" };

  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const response = await fetch(API + path, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  // if the server said "error", throw so the page can show the message
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export function registerUser(name, email, password) {
  return request("/auth/register", "POST", { name, email, password });
}

export function loginUser(email, password) {
  return request("/auth/login", "POST", { email, password });
}

export function getMovies(search) {
  const query = search ? "?search=" + encodeURIComponent(search) : "";
  return request("/movies" + query);
}

export function getMovie(id) {
  return request("/movies/" + id);
}

export function getMyList() {
  return request("/mylist");
}

export function addToMyList(movieId) {
  return request("/mylist/" + movieId, "POST");
}

export function removeFromMyList(movieId) {
  return request("/mylist/" + movieId, "DELETE");
}

export function getWatching() {
  return request("/watching");
}

export function saveWatching(movieId) {
  return request("/watching/" + movieId, "POST");
}

export function removeWatching(movieId) {
  return request("/watching/" + movieId, "DELETE");
}
