import React from 'react'

export default ({ id, uid, msg, img }) => {
  return uid === '0'
    ? <dd className='to'>
      <img className='me' src={img} /><p>{msg}</p>
    </dd>
    : <dd className='from'>
      <img className='you' src={img} /><p>{msg}</p>
    </dd>
}
