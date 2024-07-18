import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, map, Observable, ObservedValueOf } from 'rxjs';
import { Paint } from '../model/paint.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private galleryUrl = '../../assets/data.json';
  public isCounting = signal<boolean>(false);
  private slideTimer: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public slideTimer$: Observable<number> = this.slideTimer.asObservable();
  private interval: any;
  private counter: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private onGoingPage: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private allPaints: Paint[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.getGallery().subscribe(paints => this.allPaints = paints);
  }

  public getGallery(): Observable<Paint[]> {
    return this.http.get<Paint[]>(this.galleryUrl);
  }

  public getPaint(name: string): Observable<Paint> {
    return this.getGallery().pipe(
      map((paints) => {
        const paintName = name.replace(/_/g, ' ');
        return paints.find(paint => paint.name === paintName)!;
      })
    );
  }

  public getPreviousPaintName(name: string): Observable<Paint> {
    this.stopCountTimer();
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

  public getNextPaintName(name: string): Observable<Paint> {
    this.stopCountTimer();
    return this.getGallery().pipe(
      map((paints) => {
        const paintName = name.replace(/_/g, ' ');
        const index = paints.findIndex(paint => paint.name === paintName);
        return paints[index + 1];
      })
    );
  }

  public getPaintIndex(paintName: string): Observable<number> {
    return this.getGallery().pipe(
      map((paints) => {
        const paint = paints.find(paint => paint.name === paintName.replace(/_/g, " "))!;
        return paints.indexOf(paint);
      })
    );
  }

  public getOnGoingPage(index: number): void {
    this.onGoingPage.next(index);
  }
  public setCounterToZero(): void {
    this.onGoingPage.next(0);
  }

  public startCountTimer(): void {
    if (this.onGoingPage.value == 0) {
      this.router.navigate(['/detail', this.allPaints[0].name.replace(/ /g, '_')]);
    }

    this.isCounting.update(() => true);

    const secondsPerPage = 7;

    this.interval = setInterval(() => {

      if (this.counter.value <= secondsPerPage) {
        let timerPercentage = (this.counter.value / secondsPerPage) * 100;
        this.counter.next(this.counter.value + 1);
        this.slideTimer.next(timerPercentage);
      } else {
        this.goToNextPaint();
      }
    }, 1000);
  }

  public stopCountTimer(): void {
    this.isCounting.update(() => false);
    clearInterval(this.interval);
  }

  private goToNextPaint(): void {
    this.slideTimer.next(0);
    this.counter.next(0);

    if (this.onGoingPage.value == this.allPaints.length - 1) {
      this.router.navigate(['/detail', this.allPaints[0].name.replace(/ /g, '_')]);
    } else {
      this.router.navigate(['/detail', this.allPaints[this.onGoingPage.value + 1].name.replace(/ /g, '_')]);
    }
  }
}
