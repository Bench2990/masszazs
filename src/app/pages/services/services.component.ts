import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-services',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services = [
    {
      title: 'Svédmasszázs',
      description: 'A klasszikus svédmasszázs lazítja az izmokat, javítja a vérkeringést és segít a stressz oldásában...'
    },
    {
      title: 'Relaxációs aromaterápiás masszázs',
      description: 'Illóolajokkal kombinált lágy mozdulatok, melyek mély relaxációt biztosítanak...'
    },
    {
      title: 'Sportmasszázs',
      description: 'Segít az izmok regenerálásában, javítja az izomteljesítményt...'
    },
    {
      title: 'Talpmasszázs',
      description: 'Serkenti a belső szervek működését, harmonizálja az energiaáramlást...'
    },
    {
      title: 'Cellulitkezelés / Testformáló masszázs',
      description: 'Segít a narancsbőr csökkentésében, javítja a bőr rugalmasságát...'
    },
    {
      title: 'Köpölyözés',
      description: 'Vákuum segítségével stimulálja a keringést, csökkenti a gyulladásos panaszokat...'
    }
  ];

  contraindications = [
    'Leromlott, legyengült egészségügyi állapot, lázas betegség idején',
    'Fokozott vérzékenység (leukémia, hemofília, skorbut)',
    'Súlyos szív- vagy keringési betegségek',
    'Bőrbetegségek, bőrfertőzések',
    'Terhesség első 3 hónapjában és a 9. hónapban',
    'Heveny ízületi gyulladás, duzzanat, bőrpír',
    'Mélyvénás trombózis, visszérgyulladás',
    'Véralvadásgátlók szedése (pl.: Sincumar, Marcumar)',
    'Rosszindulatú daganatos betegségek',
    'Friss stroke vagy agyi történések után',
    'Közvetlenül műtét után',
    'Étkezés vagy alkoholfogyasztás után'
  ];
}

