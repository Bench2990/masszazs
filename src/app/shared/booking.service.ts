import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingService {
  user = {
    name: '',
    email: '',
    phone: '',
    visitedBefore: false
  };

  bookings: {
    service: string;
    duration: string;
    time: string;
    date: Date;
  }[] = [];

  saveUser(user: any) {
    this.user = user;
  }

  addBooking(service: string, duration: string, slot: any, date: Date) {
    this.bookings.push({
      service,
      duration,
      time: slot.time,
      date
    });
  }

  deleteBooking(index: number) {
    this.bookings.splice(index, 1);
  }
}
