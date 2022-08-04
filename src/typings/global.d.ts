declare namespace Menu {
  interface MenuOptions {
    path:string;
    title:string;
    close?:boolean;
    icon?:string;
    children?:MenuOptions[];
  }
}
