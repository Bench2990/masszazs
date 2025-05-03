import { Component, EventEmitter, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit {
  @Input() sidenav!: MatSidenav;
  @Input() isLoggedIn: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();

  constructor() {
    console.log('constructor called');
  }
  

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
  }

  closeMenu() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    this.logoutEvent.emit();
    this.closeMenu();
    window.location.href = '/home';
  }
}





