import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paint } from '../model/paint.model';
import { GalleryService } from '../service/gallery.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {

  paint: Paint | undefined;
  paintName: string = "";
  constructor(private route: ActivatedRoute, private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.paintName = params['info'];
      console.log(this.paintName);
      
      window.scrollTo(0, 0);

      this.galleryService.getPaint(this.paintName).subscribe(paint => {
        this.paint = paint;
      });

    });
  }

}
