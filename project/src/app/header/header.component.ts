import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GalleryService } from '../service/gallery.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public galleryService: GalleryService) { }

  public startTimer(): void {
    this.galleryService.startCountTimer();
  }

  public stopTimer(): void {
    this.galleryService.stopCountTimer();
  }
}
