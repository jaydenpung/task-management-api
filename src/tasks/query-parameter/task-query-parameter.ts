import { BaseQueryBuilder } from '../../common/query-builder/builder.query-builder';

export class TaskQueryParameter extends BaseQueryBuilder {
  search(value: string): object {
    return {
      $text: { $search: value },
    };
  }
}
