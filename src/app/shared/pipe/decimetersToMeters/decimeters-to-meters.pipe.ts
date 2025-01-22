import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimetersToMeters',
  standalone: true
})
export class DecimetersToMetersPipe implements PipeTransform {

  transform(value: number): number {
    return value / 10;
  }

}
