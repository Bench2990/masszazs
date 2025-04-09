import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(value: string): string {
    if (value === '30 perc') return '🕒 30 perc';
    if (value === '1 óra') return '⏰ 1 óra';
    return value;
  }
}

