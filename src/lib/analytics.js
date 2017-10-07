import loadScript from 'load-script'

const GA_TRACKING_ID = 'UA-107529694-1'
const _isDebug = process.env.NODE_ENV !== 'production'

const gtag = (...args) => {
  if (!window.dataLayer) {
    console.warn('gtag not init yet')
    return
  }
  _isDebug && console.info('gtag push : ', arguments)
  window.dataLayer.push(arguments)
}

export const initGA = () =>
  new Promise(resolve =>
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`, () => {
      _isDebug && console.info('gtag init')
      window.dataLayer = window.dataLayer || []
      gtag('js', new Date())
      trackPageView()
    })
  )

export const trackPageView = options => gtag('config', GA_TRACKING_ID, options)

export const trackEvent = (action = '') => gtag('event', action)

export const trackException = (error, fatal = false) =>
  gtag('event', 'exception', {
    description: error.message,
    fatal
  })
