import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { InfoComponent } from './info/info.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent, title: 'Home'
  },
  {
    path: 'detail',
    redirectTo: 'detail/Starry-Night',
    pathMatch: 'full'
  },
  {
    path: 'detail/:info',
    component: DetailComponent,
    children: [
      {
        path: '',
        component: InfoComponent
      }
    ]
  },
];
