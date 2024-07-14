import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paint } from '../model/paint.model';

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
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.paintName = params['info'];
    });
  }

}
