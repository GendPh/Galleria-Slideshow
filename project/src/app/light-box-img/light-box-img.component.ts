import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-light-box-img',
  standalone: true,
  imports: [],
  templateUrl: './light-box-img.component.html',
  styleUrl: './light-box-img.component.css'
})
export class LightBoxImgComponent {
  @Input() imgSrc: string | undefined;


  // Open light box
  openLightBox() {
    const lightBox = document.getElementById('lightbox-container');
    const body = document.querySelector('body');

    if (lightBox && body) {
      if (!lightBox.classList.contains('open')) {
        lightBox.classList.add('open');
        body.classList.add('no-scroll');
      }
    }
  }

  closeLightBox() {
    const lightBox = document.getElementById('lightbox-container');
    const body = document.querySelector('body');

    if (lightBox && body) {
      if (lightBox.classList.contains('open')) {
        lightBox.classList.remove('open');
        body.classList.remove('no-scroll');
      }
    }
  }

}
