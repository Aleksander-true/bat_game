declare module '*.jpg';
declare module '*.gif';
declare module '*.png';

type DialogBtn = {
  text: string,
  callback: ()=>void,
  type?: 'yes' | 'no' | '',
};
