import { get, post, put, remove, BASE_URL } from "./api";

const ENDPOINT = "trainings";

const getTrainings = async () => {
  return get(ENDPOINT);
};

const getTrainingsWithCustomer = async () => {
  console.log("Getting trainings with customers");
  const trainings = await get("gettrainings");
  console.log("TRAININGS: ", trainings);
  return trainings;
};

const createTraining = async (training) => {
  return post(ENDPOINT, training);
};

const deleteTraining = async (id) => {
  return remove(BASE_URL + ENDPOINT + "/" + id);
};

export {
  getTrainings,
  getTrainingsWithCustomer,
  createTraining,
  deleteTraining,
};
