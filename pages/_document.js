import Document, { Html, Head, Main, NextScript } from "next/document";
import { createGlobalStyle, ServerStyleSheet } from 'styled-components';

import Layout from '../components/layout'

const GlobalStyle = createGlobalStyle`


`;

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage
    
        try {
          ctx.renderPage = () =>
            originalRenderPage({
              enhanceApp: (App) => (props) =>
                sheet.collectStyles(<App {...props} />),
            })
    
          const initialProps = await Document.getInitialProps(ctx)
          return {
            ...initialProps,
            styles: (
              <>
                {initialProps.styles}
                {sheet.getStyleElement()}
              </>
            ),
          }
        } finally {
          sheet.seal()
    }
    }

    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <GlobalStyle />
                        <Main />
                        <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
