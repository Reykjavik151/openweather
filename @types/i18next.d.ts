import 'i18next';

import type Resources from './localisation-resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: Resources;
  }
}
