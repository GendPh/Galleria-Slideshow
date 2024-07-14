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

  getPaint(name: string): Observable<Paint> {
    return this.getGallery().pipe(
      map((paints) => {
        const paintName = name.replace(/-/g, ' ');
        return paints.find(paint => paint.name === paintName)!;
      })
    );
  }

  getPreviousPaintName(name: string): Observable<string> {
    return this.getGallery().pipe(
      map((paints) => {
        const paintName = name.replace(/-/g, ' ');
        const index = paints.findIndex(paint => paint.name === paintName);
        return paints[index - 1].name;
      })
    );
  }

}
