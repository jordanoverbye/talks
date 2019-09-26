import React from 'react'
import App from 'next/app'
import { Global } from '@emotion/core'
import { ThemeProvider, Styled } from 'theme-ui'
import theme from '../theme'

import Header from '../components/Header'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Global
          styles={{
            'html, body': {
              padding: 0,
              margin: 0
            }
          }}
        />
        <Styled.root>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
        </Styled.root>
      </ThemeProvider>
    )
  }
}

export default MyApp
