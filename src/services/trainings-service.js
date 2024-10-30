import {get, post, put, remove} from './api';

const ENDPOINT = 'trainings';

const getTrainings = async () => {
    return get(ENDPOINT);
}

const getTrainingsWithCustomer = async () => {
    return get('gettrainings');
}

const addTraining = async (training) => {
    return post(ENDPOINT, training);
}

const deleteTraining = async (id) => {
    return remove(ENDPOINT + '/' + id);
}

export {getTrainings, getTrainingsWithCustomer, addTraining, deleteTraining};