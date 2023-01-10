/// <reference types="vite/client" />
declare module '*.ts';
declare module '*.tsx';
declare module '*.js';
declare module '*.json';

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
