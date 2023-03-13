declare module '*.jpg';
declare module '*.png';
declare module '*.woff2';
declare module '*.woff';
declare module '*.ttf';

declare module '*.svg' {
  import * as RN from '@vendetta/metro/common'

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  const src: string;
  export default src;
}