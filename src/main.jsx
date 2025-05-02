// import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
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


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider defaultOptions={{
          dialogProps: { maxWidth: 'xs' },
          confirmationButtonProps: { color: 'primary', variant: 'outlined' },
          cancellationButtonProps: { color: 'inherit' },
          allowClose: false
        }}>
          <CssBaseline />
          <App />
          <ToastContainer position='bottom-left' theme='colored' />
        </ConfirmProvider>
      </CssVarsProvider>
    </Provider>
  </BrowserRouter>
)
