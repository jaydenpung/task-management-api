import { BaseQueryBuilder } from '../../common/query-builder/builder.query-builder';

export class TaskQueryParameter extends BaseQueryBuilder {
  name(value: string): object {
    return {
      where: 'name like :name',
      parameters: { name: `%${value}%` },
    };
  }
  description(value: string): object {
    return {
      where: 'description like :description',
      parameters: { description: `%${value}%` },
    };
  }
}
