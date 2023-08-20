//이미지파일 타입
declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "*.jpg" {
  const content: string;
  export default content;
}
