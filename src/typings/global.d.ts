declare namespace Menu {
  interface MenuOptions {
    path:string;
    title:string;
    icon?:string;
    children?:MenuOptions[];
  }
}
