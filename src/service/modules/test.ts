import service from '@/service/index'
import { ReqTestParams } from '../interface/reqType'
import { ResTest } from '../interface/resType'
export const testApi = (params:ReqTestParams) => {
  return service.get<ResTest>('/api/test',params)
}
