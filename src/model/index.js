import uuidv4 from 'uuid'
import localforage from 'localforage'

class index {
  updateUUID = uuid => {
    this.uuid = uuid || uuidv4()
    localforage.setItem('uuid', this.uuid)
  }

  getUUID = async () => localforage.getItem('uuid')
  getId = async () => localforage.getItem('id')
  setId = async value => localforage.setItem('id', value)
  getData = async () => ({
    id: await this.getId(),
    uuid: await this.getUUID()
  })

  getUpdateAt = async () => localforage.getItem('updatedAt')
  setUpdateAt = async value => localforage.setItem('updatedAt', value)

  constructor () {
    localforage.getItem('uuid').then(uuid => this.updateUUID(uuid)).catch(() => this.updateUUID())
  }
}

export default index
