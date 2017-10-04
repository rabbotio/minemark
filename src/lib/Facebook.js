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

  postBlob = async ({ token, blob, filename, message }) => {
    const formData = new FormData()
    formData.append('access_token', token)
    formData.append('source', blob, filename)
    message && formData.append('message', message)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', 'https://graph.facebook.com/me/photos', true)
      xhr.onload = xhr.onerror = () => {
        const json = JSON.parse(xhr.responseText)

        // Guard
        if (!json.id) reject(new Error(xhr.responseText))

        // { id, post_id }
        resolve(json)
      }
      xhr.send(formData)
    })
  }

  willLogInWithScope = async (login, scope = 'publish_actions') =>
    new Promise((resolve, reject) => {
      login(response => resolve(response), { scope })
    })

  willPostBlob = async (token, blob, message) =>
    this.postBlob({
      token,
      filename: 'minemark.png',
      blob,
      message
    })

  shareBlob = async (appId, blob, message) => {
    const FB = await this.init(appId)

    // Get login status and post
    FB.getLoginStatus(response => {
      switch (response.status) {
        case 'connected':
          this.willPostBlob(response.authResponse.accessToken, blob, message)
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
