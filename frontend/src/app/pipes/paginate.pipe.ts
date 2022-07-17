import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(entries: any[], page:number, numOfEntries:number): any[] {

    const init = page*numOfEntries-numOfEntries;

    return entries.slice(init , init+numOfEntries);
  }

}
