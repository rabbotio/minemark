import { name, version } from '../../package.json'

const GA_TRACKING_ID = 'UA-107529694-1'

let app_name = `${name}-${version}`
const gtag = window.gtag || (() => {})
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
