import * as addComment from './add-comment';
import * as add from './add';
import * as deleteRoute from './delete';
import * as find from './find';
import * as get from './get';
import * as setSubscription from './set-subscription';
import * as update from './update';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import TableController from '../../comms/table-controller';

class IssueRoute {
  static routerPath = 'issue';

  static auth = true;

  constructor(readonly comms: Comms) {
  }

  addComment = (parameters: addComment.Request):
    Result<addComment.EffectiveRequest, addComment.Response> => controllerGenerator<
      addComment.Request,
      addComment.EffectiveRequest,
      addComment.Response
    >(
      addComment.controllerGeneratorOptions,
      IssueRoute.routerPath,
      IssueRoute.auth,
      this.comms,
    )(parameters);

  add = (parameters: add.Request):
    Result<add.EffectiveRequest, add.Response> => controllerGenerator<
      add.Request,
      add.EffectiveRequest,
      add.Response
    >(
      add.controllerGeneratorOptions,
      IssueRoute.routerPath,
      IssueRoute.auth,
      this.comms,
    )(parameters);

  delete = (parameters: deleteRoute.Request):
    Result<deleteRoute.EffectiveRequest, deleteRoute.Response> => controllerGenerator<
      deleteRoute.Request,
      deleteRoute.EffectiveRequest,
      deleteRoute.Response
    >(
      deleteRoute.controllerGeneratorOptions,
      IssueRoute.routerPath,
      IssueRoute.auth,
      this.comms,
    )(parameters);

  find = (parameters: find.Request):
    Result<find.EffectiveRequest, find.Response> => controllerGenerator<
      find.Request,
      find.EffectiveRequest,
      find.Response
    >(
      find.controllerGeneratorOptions,
      IssueRoute.routerPath,
      IssueRoute.auth,
      this.comms,
    )(parameters);

  findTableController = (parameters: find.Query):
    TableController<find.ResponseRow> => new TableController<find.ResponseRow>(
      this.find,
      (row: find.ResponseRow, sortBy: string) => {
        let lastValueSortColumn;
        if (sortBy === 'level') {
          lastValueSortColumn = row.issue.level;
        } else {
          lastValueSortColumn = row.issue.createdAt;
        }
        return {
          lastValueSortColumn,
          lastValueHashId: row.issue.hashId,
        };
      },
      parameters,
    );

  get = (parameters: get.Request):
    Result<get.EffectiveRequest, get.Response> => controllerGenerator<
      get.Request,
      get.EffectiveRequest,
      get.Response
    >(
      get.controllerGeneratorOptions,
      IssueRoute.routerPath,
      IssueRoute.auth,
      this.comms,
    )(parameters);

  setSubscription = (parameters: setSubscription.Request):
    Result<setSubscription.EffectiveRequest, setSubscription.Response> => controllerGenerator<
      setSubscription.Request,
      setSubscription.EffectiveRequest,
      setSubscription.Response
    >(
      setSubscription.controllerGeneratorOptions,
      IssueRoute.routerPath,
      IssueRoute.auth,
      this.comms,
    )(parameters);

  update = (parameters: update.Request):
    Result<update.EffectiveRequest, update.Response> => controllerGenerator<
      update.Request,
      update.EffectiveRequest,
      update.Response
    >(
      update.controllerGeneratorOptions,
      IssueRoute.routerPath,
      IssueRoute.auth,
      this.comms,
    )(parameters);
}

export default IssueRoute;
