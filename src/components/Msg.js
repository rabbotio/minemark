import React from 'react'
const buildMessage = msgs => msgs.map((msg, index) => <p key={index}>{msg}</p>)

export default ({ id, uid, msgs, img }) => {
  return uid === '0'
    ? <dd className='to'>
      <img alt='me' className='me' src={img} />{buildMessage(msgs)}
    </dd>
    : <dd className='from'>
      <img alt='you' className='you' src={img} />{buildMessage(msgs)}
    </dd>
}
