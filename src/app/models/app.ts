import {User} from './user';
import {Link} from './link';
import {ChooseItem} from './choose-item';


export class App {
  app_desc: string;
  app_id: string;
  app_name: string;
  app_info: string;
  logo: Link;
  redirect_uri: string;
  owner: User;
  app_secret: string;
  scopes: Array<ChooseItem>;
  premises: Array<ChooseItem>;
  mark: Array<number>;
  user_num: number;
  relation: {belong: boolean, bind: boolean, mark: number, rebind: boolean, user_app_id: string};

  markPeople: number;
  markNum: string;
  markPeopleText: string;
  starClassList: Array<string>;

  logoImage: HTMLImageElement;

  constructor(_: {user_num?, app_desc?, app_id?, app_name?, app_info?, logo?,
    redirect_uri?, owner?, app_secret?, scopes?, premises?, relation?, mark?}) {
    this.app_id = _.app_id;
    this.update(_);
  }

  update(_: {user_num?, app_desc?, app_name?, app_info?, logo?, redirect_uri?,
    owner?, app_secret?, scopes?, premises?, relation?, mark?}) {
    this.user_num = _.user_num || 0;
    this.app_desc = _.app_desc;
    this.app_name = _.app_name;
    this.app_info = _.app_info;
    this.logo = new Link(_.logo);
    this.redirect_uri = _.redirect_uri;
    this.owner = _.owner || new User({});
    this.app_secret = _.app_secret;
    this.scopes = [];
    this.premises = [];
    this.relation = _.relation || {belong: false, bind: false, mark: 0, rebind: false, user_app_id: null};
    this.mark = _.mark || [0, 0, 0, 0, 0];
    if (_.scopes) {
      for (const scope of _.scopes) {
        this.scopes.push(ChooseItem.fromScope(scope));
      }
    }
    if (_.premises) {
      for (const premise of _.premises) {
        this.premises.push(ChooseItem.fromPremise(premise));
      }
    }

    this.updateValue();
  }

  updateValue() {
    if (this.logo.link) {
      this.logoImage = new Image();
      this.logoImage.src = this.logo.link;
    }

    this.markPeople = this.mark[0] + this.mark[1] + this.mark[2] + this.mark[3] + this.mark[4];
    const mp = this.markPeople;
    this.markPeopleText = mp ? `${mp}个` : '暂无';

    const markSum = this.mark[0] + this.mark[1] * 2 + this.mark[2] * 3 + this.mark[3] * 4 + this.mark[4] * 5;
    this.markNum = (markSum / this.markPeople).toFixed(1);

    let markNumRaw = markSum / this.markPeople;
    if (!markNumRaw) {
      markNumRaw = 0;
    }
    this.starClassList = [];
    for (let i = 0; i < 5; i++) {
      if (markNumRaw < 0.25) {
        this.starClassList[i] = 'icon-star-l';
      } else if (markNumRaw < 0.75) {
        this.starClassList[i] = 'icon-star-h';
      } else {
        this.starClassList[i] = 'icon-star-s';
      }
      markNumRaw -= 1;
    }
  }

  get info() {
    return this.app_info || '暂无介绍';
  }

  markPercentage(index) {
    return this.mark[index] / this.markPeople * 100 + '%';
  }
}
