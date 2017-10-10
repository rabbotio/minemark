import loadScript from 'load-script'

const GA_TRACKING_ID = 'UA-107529694-1'
const _isDebug = process.env.NODE_ENV !== 'production'
let app_name

const gtag = (...args) => {
  if (!window.dataLayer) {
    console.warn('gtag not init yet:', ...args)
    return
  }
  _isDebug && console.info('gtag push : ', args)
  window.dataLayer.push(...args)
}

export const initGA = (appName = '') =>
  new Promise(resolve =>
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`, () => {
      _isDebug && console.info('gtag init')
      window.dataLayer = window.dataLayer || []
      app_name = appName
      gtag('js', new Date())
      trackPageView()
    })
  )

export const trackPageView = (options = {}) => gtag('config', GA_TRACKING_ID, options)

export const trackScreen = screen_name =>
  screen_name &&
  gtag('event', 'screen_view', {
    app_name,
    screen_name
  })

export const trackEvent = (action = '', options = {}) => gtag('event', action, options)

export const trackException = (error, fatal = false) =>
  gtag('event', 'exception', {
    description: error.message,
    fatal
  })
