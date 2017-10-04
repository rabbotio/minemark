import ReactGA from 'react-ga'

const UA = 'UA-107529694-1'

let _isInit = false

export const initGA = () => {
  if (_isInit) return

  // console.log('GA init')
  ReactGA.initialize(UA)
  _isInit = true
}

export const logPageView = () => {
  initGA()
  // console.log(`Logging pageview for ${window.location.pathname}`)
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    initGA()
    // console.log('logEvent:', category, action)
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    initGA()
    ReactGA.exception({ description, fatal })
  }
}
