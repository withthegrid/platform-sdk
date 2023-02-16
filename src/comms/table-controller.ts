import Joi from 'joi';

import { Result, RequestQuery } from './controller';

/**
 * Table controllers abstract paging functionaly of .find routes
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
    offset: Joi.string().description('To retrieve the next page, provide of the nextPageOffset of the last page when available and not null.'),
    updatedAfter: Joi.date().iso().description('Only rows that are updated after the provided date will be returned'),
  }).default();
}

interface DefaultedTableQueryParameters extends RequestQuery {
  sortBy?: string;
  descending?: boolean;
  rowsPerPage?: number;
  search?: string;
}

interface TableQuery extends DefaultedTableQueryParameters {
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

interface SimplifiedEffectiveTableRequest {
  query: Omit<EffectiveTableQuery, 'sortBy' | 'descending' | 'search'>;
}

interface Response<RowImplementation> {
  rows: RowImplementation[];
  nextPageOffset: string | null;
}

class TableController<RowImplementation> {
  pagesAcquired = 0;

  rowsPerPage = 0;

  rows: RowImplementation[] = [];

  cancelFunction: (() => void) | null = null;

  nextPageOffset: string | null = null;

  endReached = false;

  constructor(
    private readonly route: (parameters?: TableRequest) => Result<SimplifiedEffectiveTableRequest, Response<RowImplementation>>, // eslint-disable-line max-len
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

    if (this.nextPageOffset !== null) {
      params.offset = this.nextPageOffset;
    }

    const result = this.route({ query: params });
    this.cancelFunction = result.cancelToken.cancel;

    const response = await result.response;

    this.add(
      response,
      result.request.query.rowsPerPage,
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
   * least 1 page with fewer rows
   */
  add(
    response: Response<RowImplementation>,
    rowsPerPage: number,
  ): void {
    this.rowsPerPage = rowsPerPage;
    if (response.rows.length > 0) {
      this.nextPageOffset = response.nextPageOffset;
      if (response.nextPageOffset === null) {
        this.endReached = true;
      }

      this.rows = this.rows.concat(response.rows);
      this.pagesAcquired += Math.ceil(response.rows.length / rowsPerPage);
    } else {
      this.pagesAcquired += 1; // for backwards compatability only
      this.endReached = true;
    }
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
