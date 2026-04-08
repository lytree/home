/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_ICP: string
  readonly VITE_SITE_NAME: string
  readonly VITE_SITE_AUTHOR: string
  readonly VITE_SITE_KEYWORDS: string
  readonly VITE_SITE_DES: string
  readonly VITE_SITE_URL: string
  readonly VITE_SITE_LOGO: string
  readonly VITE_SITE_MAIN_LOGO: string
  readonly VITE_SITE_APPLE_LOGO: string
  readonly VITE_DESC_HELLO: string
  readonly VITE_DESC_TEXT: string
  readonly VITE_DESC_HELLO_OTHER: string
  readonly VITE_DESC_TEXT_OTHER: string
  readonly VITE_SITE_START: string
  readonly VITE_SITE_ICP: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}