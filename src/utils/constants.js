let apiRoot = ''

if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}

if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trelloapi-m6ew.onrender.com'
}

export const API_ROOT = apiRoot
// export const API_ROOT = 'https://trelloapi-m6ew.onrender.com'


export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12
