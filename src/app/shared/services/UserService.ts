import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  getUserProfile(): Observable<{
    user: User | null,
    bookings: any[] 
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            bookings: []
          });
        }

        return from(this.fetchUserWithBookings(authUser.uid));
      })
    );
  }

  private async fetchUserWithBookings(userId: string): Promise<{
    user: User | null,
    bookings: any[] 
  }> {
    try {
      
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        return { user: null, bookings: [] };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };

      
      const bookings = user.bookings || [];

      return {
        user,
        bookings
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return { user: null, bookings: [] };
    }
  }
}

