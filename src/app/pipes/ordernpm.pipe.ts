import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordernpm'
})
export class OrdernpmPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
