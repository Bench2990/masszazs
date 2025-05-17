import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 30) return '🕒 30 perc';  
    if (value === 60) return '⏰ 1 óra';    
    return value.toString();                              
  }
}


