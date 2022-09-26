import { BaseQueryParameterDTO } from '../dto/base-query-parameter.dto';
import { Pagination } from '../pagination/pagination';
import { PaginationBuilder } from '../pagination/builder.pagination';
import { OrderByCondition, Repository } from 'typeorm';

/**
 * To build the query based on the query param passed in
 */
export abstract class BaseQueryBuilder {
  allowLoadAll = true;

  constructor(private readonly qs: BaseQueryParameterDTO) {}

  setQuery<T>(model: Repository<T>) {
    const whereConditions: object[] = this.getWhere();

    const query = model.createQueryBuilder();
    for (const condition of whereConditions) {
      query.andWhere(condition['where'], condition['parameters']);
    }

    query
      .offset(this.getOffset())
      .limit(this.getLimit())
      .orderBy(this.getOrderBy());

    return query;
  }

  getQs(): BaseQueryParameterDTO {
    return this.qs;
  }

  hasPaginationMeta(): boolean {
    return this.qs?.paginationMeta === true;
  }

  async getCustomPagination(total: number): Promise<Pagination> {
    return PaginationBuilder.build(total, this.getQs());
  }

  async getPagination<T>(model: Repository<T>): Promise<Pagination> {
    const query = this.setQuery(model);

    query.skip(0);
    query.limit(null);

    const total = await query.getCount();

    return PaginationBuilder.build(total, this.getQs());
  }

  protected getWhere(): object[] {
    const conditions = [];
    Object.keys(this.qs || {}).forEach((key: string | number) => {
      if (this[key]) {
        conditions.push(this[key](this.qs[key]));
      }
    });

    return conditions;
  }

  protected getOrderBy(): OrderByCondition {
    if (this.qs?.orderBy) {
      const isLatest = this.qs.orderBy.startsWith('-');
      const columnName = isLatest
        ? this.camelToSnakeCase(this.qs.orderBy.substring(1))
        : this.camelToSnakeCase(this.qs.orderBy);

      return {
        [columnName]: isLatest ? 'DESC' : 'ASC',
      } as OrderByCondition;
    } else {
      // default will be order by ID desc
      return {
        id: 'DESC',
      };
    }
  }

  protected getOffset(): number {
    const recordSkip = (this.qs?.page - 1) * (this.qs?.limit || 1);

    return recordSkip < 0 || isNaN(recordSkip) ? 0 : recordSkip;
  }

  protected getLimit(): number {
    if (this.qs?.limit === 0 && this.allowLoadAll) {
      return null;
    }
    return this.qs?.limit || 30;
  }

  protected camelToSnakeCase(str): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
}
