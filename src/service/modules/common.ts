import service from '@/service/index';
import { DictEnum } from '@/components/QiDictSelect/interface';

export const getDictApi = (params?: any) => {
  return service.get<DictEnum[]>('/testDict', params);
};
