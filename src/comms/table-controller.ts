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
  pagesAcquired = 0;

  rowsPerPage = 0;

  rows: RowImplementation[] = [];

  cancelFunction: (() => void) | null = null;

  lastValueSortColumn?: string | number | Date | null;

  lastValueHashId?: string;

  nextPageOffset?: string | null;

  endReached = false;

  constructor(
    private readonly route: (parameters?: TableRequest) => Result<EffectiveTableRequest, Response<RowImplementation>>, // eslint-disable-line max-len
    readonly objectKeyMapper?: (row: RowImplementation, sortBy: string) => ObjectKeyResult,
    readonly parameters?: TableQuery,
  ) {
  }

  async acquire(): Promise<number> {
    if (this.endReached) {
      throw new Error('Has reached the last page');
    }

    if (this.cancelFunction !== null) {
      this.cancelFunction();
      this.cancelFunction = null;
    }

    const params: TableQuery = { ...this.parameters };

    params.lastValueSortColumn = this.lastValueSortColumn;
    params.lastValueHashId = this.lastValueHashId;
    if (this.nextPageOffset !== null) {
      params.offset = this.nextPageOffset;
    }

    const result = this.route({ query: params });
    this.cancelFunction = result.cancelToken.cancel;

    const response = await result.response;

    this.add(
      response,
      result.request.query.rowsPerPage,
      result.request.query.sortBy,
    );
    return this.pagesAcquired;
  }

  /**
   * No diffing or sorting is done, so should only be called to add new pages on
   * top of the already stored ones. Can be used by an implementation if it has
   * retrieved rows by another means (eg. by a manual call to a .find
   * controller)
   *
   * Be sure that the response contains full pages, otherwise you will see at
   * least 1 page with less rows
   */
  add(
    response: Response<RowImplementation>,
    rowsPerPage: number,
    sortBy: string | undefined = undefined,
  ): void {
    this.rowsPerPage = rowsPerPage;
    if (response.rows.length > 0) {
      if (response.nextPageOffset !== undefined) {
        this.nextPageOffset = response.nextPageOffset;
        if (response.nextPageOffset === null) {
          this.endReached = true;
        }
      } else if (this.objectKeyMapper !== undefined && sortBy !== undefined) {
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
    } else {
      this.endReached = true;
    }
    this.pagesAcquired += Math.ceil(response.rows.length / rowsPerPage);
  }

  get(page: number): RowImplementation[] {
    const lower = page * this.rowsPerPage;
    const upper = lower + this.rowsPerPage;

    return this.rows.filter((r, index) => index >= lower && index < upper);
  }

  destroy(): void {
    if (this.cancelFunction !== null) {
      this.cancelFunction();
      this.cancelFunction = null;
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
