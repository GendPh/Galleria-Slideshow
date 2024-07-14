import { Component, Input, OnInit } from '@angular/core';
import { Paint } from '../model/paint.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-paint-thumbnail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './paint-thumbnail.component.html',
  styleUrl: './paint-thumbnail.component.css'
})
export class PaintThumbnailComponent {
  @Input() paint: Paint | undefined;

  public formatName(name: string | undefined): string {
    return name ? name.replace(/ /g, '-') : '';
  }
}
