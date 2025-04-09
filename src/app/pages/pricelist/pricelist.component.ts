import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-pricelist',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.scss']
})
export class PricelistComponent {
  priceData = [
    { name: 'Svédmasszázs', price30: 6000, price60: 10000 },
    { name: 'Relaxációs aromaterápiás masszázs', price30: 6500, price60: 10500 },
    { name: 'Sportmasszázs', price30: 6500, price60: 11000 },
    { name: 'Talpmasszázs', price30: 6000, price60: 10000 },
    { name: 'Cellulitkezelés / Testformáló masszázs', price30: 7000, price60: 11000 },
    { name: 'Köpölyözés', price30: 6500, price60: 10500 }
  ];

  thirtyMinutePasses = [
    '8 alkalmas bérlet: 42 000 Ft',
    '12 alkalmas bérlet: 65 000 Ft',
    '20 alkalmas bérlet: 95 000 Ft'
  ];
  
  sixtyMinutePasses = [
    '8 alkalmas bérlet: 72 000 Ft',
    '12 alkalmas bérlet: 110 000 Ft',
    '20 alkalmas bérlet: 180 000 Ft'
  ];
}
