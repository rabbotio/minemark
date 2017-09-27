import { gql } from 'react-apollo'

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

export { getDeviceRanking }
