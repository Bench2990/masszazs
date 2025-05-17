import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where, orderBy } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, firstValueFrom, take } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/User';
import { Booking } from '../models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly BOOKINGS_COLLECTION = 'Bookings';
  private readonly USERS_COLLECTION = 'Users';

  constructor(
    private authService: AuthService,
    private firestore: Firestore
  ) {}

  // CREATE
  async addBooking(booking: Omit<Booking, 'id'>): Promise<Booking> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }

      const bookingsCollection = collection(this.firestore, this.BOOKINGS_COLLECTION);
      
      const bookingToSave = {
        ...booking,
      date: new Date(booking['date']).toISOString().split('T')[0] 
      };

      const docRef = await addDoc(bookingsCollection, bookingToSave);
      const bookingId = docRef.id;

      await updateDoc(docRef, { id: bookingId });

      const newBooking = {
        ...bookingToSave,
        id: bookingId
      } as Booking;


      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        const bookings = userData.bookings || [];
        bookings.push(bookingId);
        await updateDoc(userDocRef, { bookings });
      }

      return newBooking;
    } catch (error) {
      console.error('Error adding booking:', error);
      throw error;
    }
  }

  // READ
  getAllBookings(): Observable<Booking[]> {
    return this.authService.currentUser.pipe(
      switchMap(async user => {
        if (!user) {
          return of([]); 
        }
        try {
          const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
          const userDoc = await getDoc(userDocRef);
          if (!userDoc.exists()) {
            return of([]);  
          }
          const userData = userDoc.data() as User;
          const bookingIds = userData.bookings || [];
          if (bookingIds.length === 0) {
            return of([]);  
          }

          const bookingsCollection = collection(this.firestore, this.BOOKINGS_COLLECTION);
          const bookings: Booking[] = [];
          const batchSize = 10;

          for (let i = 0; i < bookingIds.length; i += batchSize) {
            const batch = bookingIds.slice(i, i + batchSize);
            const q = query(bookingsCollection, where('__name__', 'in', batch));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
              bookings.push({ ...doc.data(), id: doc.id } as Booking);
            });
          }

          return of(bookings.sort((a, b) => {
            return a.date.localeCompare(b.date);
          }));
        } catch (error) {
          console.error('Error fetching bookings:', error);
          return of([] as Booking[]);  // Üres tömb, helyes típusadás
        }
      }),
      switchMap(bookings => bookings)
    );
  }

  // UPDATE
  async updateBooking(bookingId: string, updatedData: Partial<Booking>): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      const userData = userDoc.data() as User;
      if (!userData.bookings || !userData.bookings.includes(bookingId)) {
        throw new Error('Booking does not belong to the user');
      }

      const bookingDocRef = doc(this.firestore, this.BOOKINGS_COLLECTION, bookingId);
      return updateDoc(bookingDocRef, updatedData);
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  }

  // DELETE
  async deleteBooking(bookingId: string): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }

      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }

      const userData = userDoc.data() as User;
      if (!userData.bookings || !userData.bookings.includes(bookingId)) {
        throw new Error('Booking does not belong to the user');
      }

      // Töröljük a foglalást
      const bookingDocRef = doc(this.firestore, this.BOOKINGS_COLLECTION, bookingId);
      await deleteDoc(bookingDocRef);

      const updatedBookings = userData.bookings.filter(id => id !== bookingId);
      await updateDoc(userDocRef, { bookings: updatedBookings });
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  }
}


