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
        const paintName = name.replace(/_/g, ' ');
        return paints.find(paint => paint.name === paintName)!;
      })
    );
  }

  getPreviousPaintName(name: string): Observable<Paint> {
    return this.getGallery().pipe(
      map((paints) => {
        const paintName = name.replace(/_/g, ' ');
        const index = paints.findIndex(paint => paint.name === paintName);
        if (index === 0) {
          throw new Error('No previous paint');
        }
        return paints[index - 1];
      })
    );
  }

  getNextPaintName(name: string): Observable<Paint> {
    return this.getGallery().pipe(
      map((paints) => {
        const paintName = name.replace(/_/g, ' ');
        const index = paints.findIndex(paint => paint.name === paintName);
        return paints[index + 1];
      })
    );
  }

}
