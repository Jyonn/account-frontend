import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {RespError} from '../models/resp-error';
import {JumpService} from './jump.service';
import {HttpCallback} from '../models/http-callback';
import {App} from '../models/app';

@Injectable()
export class ApiService {
  public static qn_host = 'https://up.qiniup.com';

  constructor(
    private requestService: RequestService,
    private jump: JumpService,
  ) {}

  get defaultCatcher() {
    return this._defaultCatcher.bind(this);
  }

  private static packForm(data: {key: string, token: string, file: any}) {
    const formData = new FormData();
    formData.append('key', data.key);
    formData.append('token', data.token);
    formData.append('file', data.file);
    return formData;
  }

  private _defaultCatcher(respError: RespError) {
    if (RespError.JUMP_LOGIN_PAGE_ERRORS.includes(respError.identifier)) {
      this.jump.loginPage();
    }
  }

  public getRegions() {
    return this.requestService
      .get('/base/regions');
  }

  public getPhoneCode(data: {mode: any, phone: any, response: any}) {
    return this.requestService
      .post('/base/recaptcha', data);
  }

  public getLoginTokenUsingPWD(data: {mode: any, phone: any, qt: any, response: any, pwd: any}) {
    return this.requestService
      .post('/base/recaptcha', data);
  }

  public getLoginTokenUsingCode(data: {mode: any, code: any, pwd: any}) {
    return this.requestService
      .post('/base/recaptcha', data);
  }

  public getMyInfo() {
    return this.requestService
      .get('/user/');
  }

  public getAppList(data: {relation: any, frequent?: any, count?: any, last_time?: any}) {
    return this.requestService
      .get('/app/', data);
  }

  public getAppInfo(appId: any) {
    return this.requestService
      .get(`/app/${appId}`);
  }

  public getAppSecret(appId: any) {
    return this.requestService
      .get(`/app/${appId}/secret`);
  }

  public oauthApp(data: {app_id: any}) {
    return this.requestService
      .post('/oauth/', data);
  }

  public getAppScope() {
    return this.requestService
      .get('/app/scope');
  }

  public getAppPremise() {
    return this.requestService
      .get('/app/premise');
  }

  public createNewApp(data: {name: any, info: any, desc: any, redirect_uri: any, test_redirect_uri: any, scopes: any, premises: any}) {
    return this.requestService
      .post('/app/', data);
  }

  public getLogoUploadToken(data: {filename: any, app_id: any}) {
    return this.requestService
      .get('/app/logo', data);
  }

  public getAvatarUploadToken(data: {filename: any}) {
    return this.requestService
      .get('/user/avatar', data);
  }

  public uploadFile(data: {key: any, token: any, file: any}) {
    const formData = ApiService.packForm(data);
    return this.requestService
      .post(ApiService.qn_host, formData);
  }

  public uploadFileV2(data: {key: any, token: any, file: any}, callback: HttpCallback) {
    const formData = ApiService.packForm(data);
    return this.requestService
      .postV2(ApiService.qn_host, formData, callback);
  }

  public updateAppInfo(app: App) {
    const scopeList = [];
    const premiseList = [];
    for (const scope of app.scopes) {
      scopeList.push(scope.id);
    }
    for (const premise of app.premises) {
      premiseList.push(premise.id);
    }

    return this.requestService
      .put(`/app/${app.app_id}`, {
        name: app.app_name || '',
        desc: app.app_desc || '',
        info: app.app_info || '',
        redirect_uri: app.redirect_uri || '',
        test_redirect_uri: app.test_redirect_uri || '',
        scopes: scopeList,
        premises: premiseList
      });
  }

  public updateScore(appUserId: any, data: {mark: any}) {
    return this.requestService
      .put(`/app/user/${appUserId}`, data);
  }

  public getCardUploadToken(data: {filename: any, back: any}) {
    return this.requestService
      .get('/user/idcard', data);
  }

  public autoVerify() {
    return this.requestService
      .get('/user/verify', {});
  }

  public confirmVerify(data: {name?: any, birthday?: any, idcard?: any, male?: any, token?: any, auto?: any}) {
    return this.requestService
      .post('/user/verify', data);
  }

  public updateUserInfo(data: {nickname?: any, description?: any, qitian?: any, birthday?: any}) {
    return this.requestService
      .put('/user/', data);
  }

  public applyDev() {
    return this.requestService
      .post('/user/dev', {});
  }
}
