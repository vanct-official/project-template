import { aspnetHttp } from './http';
import { API_ENDPOINTS } from './endpoints';

export const aspnetSamplesApi = {
  getAll: (config = {}) => aspnetHttp.get(API_ENDPOINTS.aspnetSamples.list, config),
  getById: (id, config = {}) => aspnetHttp.get(API_ENDPOINTS.aspnetSamples.detail(id), config),
  create: (sample, config = {}) => aspnetHttp.post(API_ENDPOINTS.aspnetSamples.create, sample, config),
};

export default aspnetSamplesApi;
