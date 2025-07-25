// import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme'
import App from './App.jsx'

// react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Dialog
import { ConfirmProvider } from 'material-ui-confirm'

// Cau hinh Redux Store
import { Provider } from 'react-redux'
import { store } from '~/redux/store'

// Cau hinh react-router-dom voi BrowserRouter
import { BrowserRouter } from 'react-router-dom'

// Cau hinh redux-persist de luu du lieu cua user vao localstorage
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

// Ky thuat Inject Store: la ky thuat khi can su dung bien redux store o cac file ngoai pham vi component
import { injectStore } from './utils/authorizeAxios'
injectStore(store)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename='/'>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider defaultOptions={{
            dialogProps: { maxWidth: 'xs' },
            confirmationButtonProps: { color: 'primary', variant: 'outlined' },
            cancellationButtonProps: { color: 'inherit' },
            allowClose: false
          }}>
            <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
            <CssBaseline />
            <App />
            <ToastContainer position='bottom-left' theme='colored' />
          </ConfirmProvider>
        </CssVarsProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
