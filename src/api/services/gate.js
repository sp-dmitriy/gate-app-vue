import { DefaultAPIInstance } from '@/api'

const GateService = {
  openGate() {
    return DefaultAPIInstance.get('/gate/open')
  },
  closeGate() {
    return DefaultAPIInstance.get('/gate/close')
  },
}

export default GateService