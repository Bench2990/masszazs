import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../shared/booking.service';



@Component({
  selector: 'app-booking',
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'hu' }],
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  @Output() navigateToProfile: EventEmitter<string> = new EventEmitter();

  client = {
    name: '',
    email: '',
    phone: '',
    visitedBefore: false
  };

  selectedService: string = '';
  services: string[] = ['Svéd masszázs', 'Aromaterápiás masszázs', 'Talpmasszázs', 'Sportmasszázs', 'Cellulitkezelés', 'Köpölyözés'];

  is30min: boolean = false;
  is60min: boolean = false;

  selectedSlot: any = null;
  bookingSuccess: boolean = false;

  calendarDays: { date: Date, slots: { time: string, booked: boolean }[] }[] = [];

  constructor(private router: Router, private bookingService: BookingService) {
    this.generateCalendar();
  }

  generateCalendar() {
    const today = new Date();
    const endDate = new Date();
    endDate.setMonth(today.getMonth() + 2);
  
    const timeSlots = this.generateTimeSlots('08:00', '20:00');
  
    let currentDate = new Date(today);
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay(); 
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { 
        const slots = timeSlots.map(time => ({ time, booked: false }));
        this.calendarDays.push({ date: new Date(currentDate), slots });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  generateTimeSlots(start: string, end: string): string[] {
    const result: string[] = [];
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);

    let hour = startHour;
    let minute = startMin;

    while (hour < endHour || (hour === endHour && minute < endMin)) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      result.push(time);
      minute += 60;
      if (minute >= 60) {
        hour += 1;
        minute = 0;
      }
    }
    return result;
  }

  selectDuration(duration: string) {
    this.is30min = duration === '30';
    this.is60min = duration === '60';
  }

  selectSlot(hour: any) {
    this.selectedSlot = hour;
  }

  isBookingValid(): boolean {
    return this.client.name !== '' &&
           this.client.email !== '' &&
           this.client.phone !== '' &&
           (this.is30min || this.is60min);
          
  }

  

  submitBooking() {
    this.bookingSuccess = true;
  
    this.bookingService.saveUser(this.client);
  
    const duration = this.is30min ? '30 perc' : this.is60min ? '1 óra' : '';
    const selectedDay = this.calendarDays.find(day =>
      day.slots.includes(this.selectedSlot)
    );
  
    if (selectedDay) {
      this.bookingService.addBooking(
        this.selectedService,
        duration,
        this.selectedSlot,
        selectedDay.date
      );
    }
  
    setTimeout(() => {
      this.router.navigate(['/profile']);
    }, 1500);
  }
}
