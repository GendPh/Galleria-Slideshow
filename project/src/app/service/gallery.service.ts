import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ObservedValueOf } from 'rxjs';
import { Paint } from '../model/paint.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private galleryUrl = '../../assets/data.json';

  constructor(private http: HttpClient) { }

  getGallery(): Observable<Paint[]> {
    return this.http.get<Paint[]>(this.galleryUrl);
  }
}
