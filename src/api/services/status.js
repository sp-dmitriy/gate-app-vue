import { DefaultAPIInstance } from '@/api'

const StatusService = {
  getStatusServer() {
    return DefaultAPIInstance.get('/status/server')
  },
  getStatusNode() {
    return DefaultAPIInstance.get('/status/node')
  },
}

export default StatusService