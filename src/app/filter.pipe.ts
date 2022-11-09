import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(values: any, filter: string): [] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: any) => {
      const nameFound =
        value.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const severityFound =
        value.country_check_severity
          .toLowerCase()
          .indexOf(filter.toLowerCase()) !== -1;

      if (nameFound || severityFound) {
        return value;
      }
    });
  }
}
