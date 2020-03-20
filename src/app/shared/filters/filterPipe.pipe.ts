import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPipe',
    pure: false
})
export default class filterPipe implements PipeTransform {
  transform( filterType: any[], filter: Object, value1 : string, value2: string ): any {
    let returnArray = [];
    filterType.forEach( item => {
      if (!(item == 'pis' || item == 'crs')) {
        returnArray.push(item);
      }
    });
    return returnArray;
  }
}