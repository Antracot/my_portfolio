import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { JSON_PATH, TXT_PATH } from './constans';
  
@Injectable()
export class HttpService{
    [x: string]: any;
  
    constructor(private http: HttpClient){ }
      
    getJsonData(){
        return this.http.get(JSON_PATH)
    }

    getTextData(){
        return this.http.get(TXT_PATH, {responseType: 'text'})
    }

}