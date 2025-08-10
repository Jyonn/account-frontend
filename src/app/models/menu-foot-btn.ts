export class MenuFootBtn {
  icon: string;
  text: string;
  hide: boolean;

  constructor(d: {icon: any, text: any, hide: any}) {
    this.icon = d.icon;
    this.text = d.text;
    this.hide = d.hide;
  }
}
