import { Injectable } from '@angular/core';
import { Conversion } from '../interfaces/conversions';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { 
    if (typeof Storage === 'undefined') {
      throw new Error('StorageService: Local storage is not supported');
    }
  }

  setRecentConversion(key: string, data: Array<Conversion>) {
    try {
      const serializedData = JSON.stringify(data);
      sessionStorage.setItem(key, serializedData);
    } catch (e) {
      throw new Error('Provided data is not serializable!');
    }
  }

  getRecentconversion(key: string): Array<any> {
    const item = sessionStorage.getItem(key);
    return item && JSON.parse(item);
  }

  clearHistory(key: string) {
    sessionStorage.removeItem(key);;
  }

}
