import { Component, Input } from '@angular/core';
import { Paint } from '../model/paint.model';
import { GalleryService } from '../service/gallery.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
  @Input() paint: Paint | undefined;
  previousName: string = "";

  constructor(private galleryService: GalleryService) { }

}
