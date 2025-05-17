import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/UserService';  
import { BookingService } from '../../shared/services/BookingService';
import { MatTableDataSource } from '@angular/material/table';
import { DurationPipe } from '../../pipes/duration.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../shared/models/User';  
import { Booking } from '../../shared/models/Booking';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    DurationPipe
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  bookings: MatTableDataSource<Booking> = new MatTableDataSource(); 
  showSaveButton = false;

  constructor(
    private userService: UserService,
    private bookingService: BookingService  
  ) {}

  async ngOnInit() {
  
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data.user;  
        if (this.user) {
          this.loadBookings();  
        }
      },
      error: (error) => {
        console.error('Hiba a felhasználói profil betöltésekor:', error);
      }
    });
  }

  loadBookings() {
    if (this.user) {
      this.bookingService.getAllBookings().subscribe(bookings => {
        this.bookings.data = bookings; 
      });
    }
  }

  deleteBooking(index: number) {
    const bookingToDelete = this.bookings.data[index];
    if (bookingToDelete) {
      this.bookingService.deleteBooking(bookingToDelete.id).then(() => {
        this.bookings.data = this.bookings.data.filter(booking => booking.id !== bookingToDelete.id);
      }).catch(error => {
        console.error('Error deleting booking:', error);
      });
    }
  }

  displayedColumns: string[] = ['date', 'time', 'service', 'actions']; 
}