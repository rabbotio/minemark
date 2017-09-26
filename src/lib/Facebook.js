import loadScript from 'load-script'

class Facebook {
  init = async (appId, version = 'v2.10') =>
    // @ts-ignore
    window.FB ||
    new Promise(resolve => {
      loadScript('https://connect.facebook.net/en_US/sdk.js', () => {
        // @ts-ignore
        window.FB.init({
          appId,
          cookie: true,
          xfbml: true,
          version
        })
        resolve(window.FB)
      })
    })

  postImageToFacebook = async ({ token, filename, blob, message }) => {
    const formData = new FormData()
    formData.append('access_token', token)
    formData.append('source', blob, filename)
    formData.append('message', message)

    console.log(formData)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://graph.facebook.com/me/photos', true)
    xhr.onload = xhr.onerror = () => {
      console.log(xhr.responseText)
    }
    xhr.send(formData)
  }

  willLogInWithScope = async (login, scope = 'publish_actions') =>
    new Promise((resolve, reject) => {
      login(response => resolve(response), { scope })
    })

  willPostBlob = async (token, blob) =>
    this.postImageToFacebook({
      token,
      filename: 'mine.png',
      blob,
      message: 'message'
    })

  willShareWithFacebook = async (appId, blob) => {
    const FB = await this.init(appId)

    // Get login status and post
    FB.getLoginStatus(response => {
      switch (response.status) {
        case 'connected':
          this.willPostBlob(response.authResponse.accessToken, blob)
          break
        case 'not_authorized':
        default:
          this.willLogInWithScope(FB.login).then(response => {
            this.willPostBlob(response.authResponse.accessToken, blob)
          })
          break
      }
    })
  }
}

export default Facebook
