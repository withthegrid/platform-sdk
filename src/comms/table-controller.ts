import { Result, RequestQuery } from './controller';

interface DefaultedTableQueryParameters extends RequestQuery {
  sortBy?: string;
  descending?: boolean;
  rowsPerPage?: number;
  search?: string;
}

interface TableQuery extends DefaultedTableQueryParameters {
  lastValueSortColumn?: string | number | Date | null;
  lastValueHashId?: string;
}

interface TableRequest {
  query: TableQuery;
}

interface EffectiveTableQuery extends Required<DefaultedTableQueryParameters> {
  lastValueSortColumn?: string | number | Date | null;
  lastValueHashId?: string;
}

interface EffectiveTableRequest {
  query: EffectiveTableQuery;
}

interface ObjectKeyResult {
  lastValueSortColumn: string | number | Date | null;
  lastValueHashId: string;
}

class TableController<RowImplementation> {
  pagesAcquired: number;

  rows: RowImplementation[];

  result: Result<EffectiveTableRequest, { rows: RowImplementation[] }> | null;

  lastValueSortColumn?: string | number | Date | null;

  lastValueHashId?: string;

  constructor(
    private readonly route: (parameters: TableRequest) => Result<EffectiveTableRequest, { rows: RowImplementation[] }>, // eslint-disable-line max-len
    readonly objectKeyMapper: (row: RowImplementation, sortBy: string) => ObjectKeyResult,
    readonly parameters: TableQuery,
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

    const result = this.route({ query: params });
    this.result = result;

    const response = await result.response;

    if (response.rows.length > 0) {
      const lastRow = response.rows[response.rows.length - 1];
      const { lastValueSortColumn, lastValueHashId } = this.objectKeyMapper(
        lastRow,
        result.request.query.sortBy,
      );

      this.lastValueSortColumn = lastValueSortColumn;
      this.lastValueHashId = lastValueHashId;

      this.rows = this.rows.concat(response.rows);
    }
    this.pagesAcquired += 1;
    return this.pagesAcquired;
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
  TableQuery,
  EffectiveTableQuery,
  TableRequest,
  EffectiveTableRequest,
};
