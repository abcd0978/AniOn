//이미지파일 타입
declare module '*.jpg' {
  const content: any;
  export default content;
}
declare module '*.svg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
