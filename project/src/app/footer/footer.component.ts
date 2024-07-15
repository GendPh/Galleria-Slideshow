import { Component, Input, OnInit } from '@angular/core';
import { Paint } from '../model/paint.model';
import { GalleryService } from '../service/gallery.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
  @Input() paint: Paint | undefined;
  previousPaintAvailable: boolean = false;

  constructor(
    private galleryService: GalleryService,
    private router: Router
  ) { }


  public nextPaint(): void {
    this.galleryService.getNextPaintName(this.paint?.name!).subscribe(
      {
        next: (next) => {
          this.paint = next;
          this.router.navigate(['/detail', this.paint.name.replace(/ /g, '_')]);
        }
      }
    );
  }

  public previousPaint(): void {
    this.galleryService.getPreviousPaintName(this.paint?.name!).subscribe(
      {
        next: (previous) => {
          this.paint = previous;
          this.router.navigate(['/detail', this.paint.name.replace(/ /g, '_')]);
        }
      }
    );

  }
}
