import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'rupiah'
})
export class RupiahPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value == null) return '-';

    const number = typeof value === 'string' ? parseFloat(value) : value;

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  }
}
