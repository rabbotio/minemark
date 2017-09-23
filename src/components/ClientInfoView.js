import React from 'react'

const ClientInfoView = ({ client }) => (
  <div>
    <div>
      {`Mining Monero by ${client.browser.name} ${client.engine.name} ${client.browser.version}`}
    </div>
    <div>
      {`on ${client.os.name} ${client.os.version} with ${client.cpu.architecture} from ${client.device.vendor}`}
    </div>
  </div>
)
export default ClientInfoView
