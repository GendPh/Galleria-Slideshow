import { Component, OnInit } from '@angular/core';
import { InfoComponent } from '../info/info.component';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { Paint } from '../model/paint.model';
import { GalleryService } from '../service/gallery.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [HeaderComponent, InfoComponent, FooterComponent, RouterLink, RouterOutlet],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  paint: Paint | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private galleryService: GalleryService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.galleryService.getPaint(params.get('info')!).subscribe(paint => {
        
        if (paint === undefined) {
          this.router.navigate(['']);
        }

        this.paint = paint;
      });
    });
  }
}
