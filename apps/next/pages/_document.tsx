import type { DocumentContext } from 'next/document';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { AppRegistry } from 'react-native';

const fonts = ['Inter-Regular', 'Inter-Bold', 'Inter-Black'];

const customFontCss = fonts
  .map(
    font => `
    @font-face {
        font-family: '${font}';
        src: url('/font/Inter/${font}.otf');
    }
`,
  )
  .join('\n');

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    AppRegistry.registerComponent('Main', () => Main);
    // @ts-expect-error Register Main application
    const { getStyleElement } = AppRegistry.getApplication('Main');
    const styles = [
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: customFontCss }}
        key="style-reset"
      />,
      getStyleElement(),
    ];

    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps, styles: React.Children.toArray(styles) };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            content="IE=edge"
            httpEquiv="X-UA-Compatible"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
