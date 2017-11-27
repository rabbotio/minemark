import gql from 'graphql-tag'

const getDeviceRanking = async client =>
  client
    .query({
      query: gql`{
      allDevices(first: 10, orderBy: max_DESC) {
        browserName
        browserVersion
        thread
        min
        max
      }
    }`
    })
    .then(({ data }) => data.allDevices)

const upsertDevice = async (client, { id = '', uuid, browserName, browserVersion, thread, min, max }) => {
  id = id || ''

  const payload = `uuid: "${uuid}"
browserName: "${browserName}"
browserVersion: "${browserVersion}"
thread: ${thread}
min: ${min}
max: ${max}`

  return client.mutate({
    mutation: id
      ? gql`mutation {
    updateDevice(
      id: "${id}"
      ${payload}
    ) 
      {
        id
        updatedAt
      }
    }`
      : gql`mutation {
      createDevice(
        ${payload}
      ) 
        {
          id
          updatedAt
        }
      }`
  })
}

let min = 0
let max = 0
let mins = []
const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length

const collect = async (client, clientInfo, persistanceData, hps, thread) => {
  const _min = Math.min(max, hps)
  const _max = Math.max(max, hps)

  const { id, uuid } = persistanceData
  const { browser } = clientInfo

  let isDirty = false
  if (_min > min) (min = _min) && (isDirty = true)
  if (_max > max) (max = _max) && (isDirty = true)
  if (!id) isDirty = true

  // Dirty?
  if (!isDirty) return null

  mins.push(_min)

  return upsertDevice(client, {
    id,
    uuid,
    browserName: browser.name,
    browserVersion: browser.version,
    thread,
    min: average(mins),
    max
  })
}

export { getDeviceRanking, collect }
