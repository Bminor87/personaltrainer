import { get, post, put, remove } from "./api";

const ENDPOINT = "customers";

const getCustomers = async () => {
  console.log("Getting customers");
  const customers = await get(ENDPOINT);
  return customers._embedded.customers;
};

const getCustomerById = async (id) => {
  return get(ENDPOINT + "/" + id);
};

const createCustomer = async (customer) => {
  return post(ENDPOINT, customer);
};

const updateCustomer = async (customer) => {
  return put(customer._links.self.href, customer);
};

const deleteCustomer = async (url) => {
  return remove(url);
};

export {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
