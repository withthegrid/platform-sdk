import Joi from 'joi';

import { Result, RequestQuery } from './controller';

/**
 *
 * Table controllers support two ways of communicating offset with the server:
 * - lastValueSortColumn/ lastValueHashId: this sdk takes care of mapping the
 *   the page to these two values to retrieve the next page
 * - offset: for routes where the server supplies nextPageOffset on each page,
 *   that can be used to request the next page
 */

function tableQuerySchemaGenerator(
  sortBy: Joi.StringSchema = Joi.string().valid('hashId').default('hashId'),
  maxRowsPerPage = 100,
): Joi.ObjectSchema {
  return Joi.object().keys({
    sortBy,
    descending: Joi.boolean().default(true),
    rowsPerPage: Joi.number()
      .integer()
      .min(1)
      .max(maxRowsPerPage)
      .default(10),
    search: Joi.string().allow('').default(''),
    lastValueSortColumn: Joi.any().description('To retrieve the next page, provide lastValueSortColumn and lastValueHashId. lastValueSortColumn is the value for the key provided in sortBy of the last row that is received. Should also be provided when sortBy is \'hashId\''),
    lastValueHashId: Joi.string().description('To retrieve the next page, provide lastValueSortColumn and lastValueHashId. lastValueHashId is the hashId of the last row that is received.'),
    offset: Joi.string().description('To retrieve the next page, provide of the nextPageOffset of the last page when available and not null (lastValueSortColumn and lastValueHashId can be ignored then).'),
    updatedAfter: Joi.date().iso().description('Only rows that are updated after the provided date will be returned'),
  }).with('lastValueSortColumn', 'lastValueHashId').default();
}

interface DefaultedTableQueryParameters extends RequestQuery {
  sortBy?: string;
  descending?: boolean;
  rowsPerPage?: number;
  search?: string;
}

interface TableQuery extends DefaultedTableQueryParameters {
  lastValueSortColumn?: string | number | Date | null;
  lastValueHashId?: string;
  offset?: string;
  updatedAfter?: Date;
}

interface TableRequest {
  query: TableQuery;
}

type EffectiveTableQuery = Required<DefaultedTableQueryParameters> & TableQuery;

interface EffectiveTableRequest {
  query: EffectiveTableQuery;
}

interface ObjectKeyResult {
  lastValueSortColumn: string | number | Date | null;
  lastValueHashId: string;
}

interface Response<RowImplementation> {
  rows: RowImplementation[];
  nextPageOffset?: string | null;
}

class TableController<RowImplementation> {
  pagesAcquired: number;

  rows: RowImplementation[];

  result: Result<EffectiveTableRequest, Response<RowImplementation>> | null;

  lastValueSortColumn?: string | number | Date | null;

  lastValueHashId?: string;

  nextPageOffset?: string | null;

  constructor(
    private readonly route: (parameters?: TableRequest) => Result<EffectiveTableRequest, Response<RowImplementation>>, // eslint-disable-line max-len
    readonly objectKeyMapper?: (row: RowImplementation, sortBy: string) => ObjectKeyResult,
    readonly parameters?: TableQuery,
  ) {
    this.pagesAcquired = 0;
    this.rows = [];
    this.result = null;
  }

  async acquire(): Promise<number> {
    if (this.result !== null) {
      this.result.cancelToken.cancel();
      this.result = null;
    }

    const params: TableQuery = { ...this.parameters };

    params.lastValueSortColumn = this.lastValueSortColumn;
    params.lastValueHashId = this.lastValueHashId;
    if (this.nextPageOffset === null) {
      throw new Error('Has reached the last page');
    }
    params.offset = this.nextPageOffset;

    const result = this.route({ query: params });
    this.result = result;

    const response = await result.response;

    this.add(response, result.request.query.sortBy);
    return this.pagesAcquired;
  }

  /**
   * No diffing or sorting is done, so should only be called to add new pages on
   * top of the already stored ones. Can be used by an implementation if it has
   * retrieved rows by another means (eg. by a manual call to a .find
   * controller)
   *
   * Be sure to add only one page at a time and ensure it is the complete result
   * for that page, otherwise this.pagesAcquired gets fucked up
   */
  add(response: Response<RowImplementation>, sortBy: string): void {
    if (response.rows.length > 0) {
      if (response.nextPageOffset !== undefined) {
        this.nextPageOffset = response.nextPageOffset;
      } else if (this.objectKeyMapper !== undefined) {
        const lastRow = response.rows[response.rows.length - 1];
        const { lastValueSortColumn, lastValueHashId } = this.objectKeyMapper(
          lastRow,
          sortBy,
        );

        this.lastValueSortColumn = lastValueSortColumn;
        this.lastValueHashId = lastValueHashId;
      } else {
        throw new Error('Response has no nextPageOffset and objectKeyMapper is not defined');
      }

      this.rows = this.rows.concat(response.rows);
    }
    this.pagesAcquired += 1;
  }

  get(page: number): RowImplementation[] {
    if (this.result === null || this.rows.length === 0) {
      return [];
    }

    const lower = page * this.result.request.query.rowsPerPage;
    const upper = lower + this.result.request.query.rowsPerPage;

    return this.rows.filter((r, index) => index >= lower && index < upper);
  }

  destroy(): void {
    if (this.result !== null) {
      this.result.cancelToken.cancel();
      this.result = null;
      this.rows = [];
    }
  }
}

export default TableController;
export {
  tableQuerySchemaGenerator,
  TableQuery,
  EffectiveTableQuery,
  TableRequest,
  EffectiveTableRequest,
};
