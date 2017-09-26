import loadScript from 'load-script'

class Facebook {
  constructor (appId, version = 'v2.10') {
    this.appId = appId
    this.version = version
  }

  init = async () =>
    new Promise(resolve => {
      loadScript('https://connect.facebook.net/en_US/sdk.js', () => {
        // @ts-ignore
        window.FB.init({
          appId: this.appId,
          cookie: true,
          xfbml: true,
          version: this.version
        })
        resolve(window.FB)
      })
    })

  post = (data, message) => {
    // Get image source url
    window.FB.api('/' + data.id + '?fields=images', response => {
      if (response && !response.error) {
        console.log(response)

        // Create facebook post using image
        window.FB.api(
          '/me/feed',
          'POST',
          {
            message,
            picture: response.images[0].source,
            link: window.location.href,
            name: 'OMG!',
            description: 'description',
            privacy: {
              value: 'SELF'
            }
          },
          response => {
            if (response && !response.error) {
              /* handle the result */
              console.log('Posted story to facebook')
              console.log(response)
            }
          }
        )
      }
    })
  }

  postImageToFacebook = async ({ token, filename, mimeType, blob, message }) => {
    var formData = new FormData()
    formData.append('access_token', token)
    formData.append('source', blob, filename)
    formData.append('message', 'message')

    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://graph.facebook.com/me/photos', true)
    xhr.onload = xhr.onerror = () => {
      console.log(xhr.responseText)
    }
    xhr.send(formData)

    // body.append('no_story', 'true')
    /*
    window.FB.api('/me/photos', 'POST', formData, function (resp) {
      console.log('into function')
      if (resp && !resp.error) {
        console.log('uploaded')
        console.log(resp)
      } else {
        console.log('some error')
        console.log(resp.error)
      }
    })
    */

    // Upload image to facebook without story(post to feed)
    /*
    const data = await fetch('https://graph.facebook.com/me/photos?access_token=' + token, {
      method: 'POST',
      body,
      mode: 'cors',
      method: 'post',
      headers: {
        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }).catch(err => console.log(err))

    console.log('success: ', data)
    data && this.post(data, message) */
  }
}

export default Facebook
