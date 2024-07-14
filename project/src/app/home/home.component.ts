import { Component, OnInit } from '@angular/core';
import { PaintThumbnailComponent } from '../paint-thumbnail/paint-thumbnail.component';
import { GalleryService } from '../service/gallery.service';
import { Paint } from '../model/paint.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PaintThumbnailComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public paints: Paint[] = [];

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.galleryService.getGallery().subscribe((paintsResponse: Paint[]) => {
      this.paints = paintsResponse;
    });
  }

}
