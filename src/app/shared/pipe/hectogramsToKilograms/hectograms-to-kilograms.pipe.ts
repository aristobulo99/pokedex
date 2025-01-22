import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hectogramsToKilograms',
  standalone: true
})
export class HectogramsToKilogramsPipe implements PipeTransform {

  transform(value: number): number {
    return value / 10;
  }

}
