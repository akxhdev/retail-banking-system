import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _isLoading: boolean = false;
  constructor() {}

  public startLoading() {
    this._isLoading = true;
  }

  public stopLoading() {
    this._isLoading = false;
  }

  public get isLoading() {
    return this._isLoading;
  }
}
