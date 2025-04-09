import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../shared/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DurationPipe } from '../../pipes/duration.pipe';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    DurationPipe,
    MatTableModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  bookings: MatTableDataSource<any> = new MatTableDataSource();
  showSaveButton = false;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.user = { ...this.bookingService.user };
    this.bookings.data = this.bookingService.bookings;
  }

  onEdit() {
    this.showSaveButton = true;
  }

  saveChanges() {
    this.bookingService.saveUser(this.user);
    this.showSaveButton = false;
  }

  deleteBooking(index: number) {
    const updatedBookings = this.bookings.data;
    updatedBookings.splice(index, 1);
    this.bookings.data = [...updatedBookings]; 
  
    this.bookingService.deleteBooking(index); 
  }

  displayedColumns: string[] = ['date', 'time', 'service', 'actions'];
}


