import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { PricelistComponent } from './pages/pricelist/pricelist.component';
import { BookingComponent } from './pages/booking/booking.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'pricelist', component: PricelistComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
