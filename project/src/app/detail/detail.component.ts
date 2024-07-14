import { Component } from '@angular/core';
import { InfoComponent } from '../info/info.component';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [HeaderComponent, InfoComponent, RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {

}
