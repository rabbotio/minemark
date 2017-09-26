import canvg from 'canvg-browser'
import '../lib/canvas-blob'

// Styles
import styled from 'styled-components'

import Facebook from '../lib/Facebook'
const FB_APP_ID = '113587919136550'

const Buttonz = styled.button`
position:relative;
width: auto;
display:inline-block;
color:#ecf0f1;
text-decoration:none;
border-radius:5px;
border:solid 1px #bdc3c7;
background:#95a5a6;
text-align:center;
padding:4px 8px 6px;
margin: 12px;
outline: none;

-webkit-transition: all 0.1s;
-moz-transition: all 0.1s;
transition: all 0.1s;

-webkit-box-shadow: 0px 3px 0px #7f8c8d;
-moz-box-shadow: 0px 3px 0px #7f8c8d;
box-shadow: 0px 3px 0px #7f8c8d;

:active{
    -webkit-box-shadow: 0px 2px 0px #7f8c8d;
    -moz-box-shadow: 0px 2px 0px #7f8c8d;
    box-shadow: 0px 2px 0px #7f8c8d;
    position:relative;
    top:4px;
}
`

const willShareWithFacebook = async blob => {
  const facebook = new Facebook(FB_APP_ID)
  const FB = await facebook.init()
  FB.getLoginStatus(response => {
    console.log(response)
    switch (response.status) {
      case 'connected':
        console.log(response)
        facebook.postImageToFacebook({
          token: response.authResponse.accessToken,
          filename: 'test.png',
          mimeType: 'image/png',
          blob,
          message: 'message'
        })
        break
      case 'not_authorized':
        FB.login(
          response => {
            console.log(response)
            // postImageToFacebook(response.authResponse.accessToken, 'Canvas to Facebook/Twitter', 'image/png', blob, window.location.href)
          },
          { scope: 'publish_actions,publish_stream' }
        )
        break
      default:
        FB.login(
          response => {
            console.log(response)
            // postImageToFacebook(response.authResponse.accessToken, 'Canvas to Facebook/Twitter', 'image/png', blob, window.location.href)
          },
          { scope: 'publish_actions,publish_stream' }
        )
        break
    }
  })
}

const dataURItoBlob = dataURI => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1])
  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length)
  var dw = new DataView(ab)
  for (var i = 0; i < byteString.length; i++) {
    dw.setUint8(i, byteString.charCodeAt(i))
  }
  // write the ArrayBuffer to a blob, and you're done
  return new Blob([ab], { type: mimeString })
}

const onShare = (svg, provider = 'facebook') => {
  // Make 2x picture
  svg.setAttribute('width', 640)
  svg.setAttribute('height', 640)
  svg.setAttribute('transform', `scale(2,2)`)

  // Capture
  const canvas = document.getElementById('canvas')

  canvg(canvas, svg.outerHTML, {
    scaleWidth: 640,
    scaleHeight: 640
  })

  // Revert to 1x
  svg.setAttribute('width', 320)
  svg.setAttribute('height', 320)
  svg.setAttribute('transform', 'scale(1,1)')

  setTimeout(
    () =>
      canvas.toBlob(blob => {
        console.log(blob)
        // Share Facebook
        switch (provider) {
          case 'facebook':
            willShareWithFacebook(blob)
            break
          default:
            console.error('Not implement')
            break
        }
      }),
    100
  )
}

export { Buttonz, onShare }
