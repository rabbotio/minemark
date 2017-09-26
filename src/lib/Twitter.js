class Twitter {
  shareBlob = async ({ blob, filename }) => {
    const formData = new FormData()
    formData.append('media', blob, filename)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', 'https://upload.twitter.com/1.1/media/upload.json', true)
      xhr.onload = xhr.onerror = () => {
        console.log(xhr.responseText)
        const json = JSON.parse(xhr.responseText)

        // Guard
        if (json.errors) reject(new Error(json.errors))

        resolve(json)
      }
      xhr.send(formData)
    })
  }
}

export default Twitter
