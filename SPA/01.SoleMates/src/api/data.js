import * as api from "./api.js";

export const host = "http://localhost:3030";
//api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Application-specific request
// get all listings
export async function getAllShoes() {
  return await api.get(host + "/data/shoes?sortBy=_createdOn%20desc");
}

// get listing by id
export async function getShoeById(id) {
  return await api.get(host + `/data/shoes/${id}`);
}

// create listing
export async function addShoe(shoe) {
  return await api.post(host + "/data/shoes", shoe);
}

// edit listing by id
export async function editShoeById(id, shoe) {
  return await api.put(host + `/data/shoes/${id}`, shoe);
}

// delete listing by id
export async function deleteShoeById(id) {
  return await api.del(host + `/data/shoes/${id}`);
}

export async function search(query) {
  return await api.get(host + `/data/shoes?where=brand%20LIKE%20%22${query}%22`);
}

