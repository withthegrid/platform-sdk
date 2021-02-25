import * as addEdgeToPin from './add-edge-to-pin';
import * as addEdge from './add-edge';
import * as addGrid from './add-grid';
import * as addPinGroup from './add-pin-group';
import * as addNode from './add-node';
import * as addPin from './add-pin';
import * as deleteEdgeFromPin from './delete-edge-from-pin';
import * as deleteEdge from './delete-edge';
import * as deleteGrid from './delete-grid';
import * as deletePinGroup from './delete-pin-group';
import * as deleteNode from './delete-node';
import * as deletePin from './delete-pin';
import * as find from './find';
import * as findEdge from './find-edge';
import * as findGrid from './find-grid';
import * as findPinGroup from './find-pin-group';
import * as findPinQuantities from './find-pin-quantities';
import * as findNode from './find-node';
import * as getEdgeMeasurements from './get-edge-measurements';
import * as getEdge from './get-edge';
import * as getGrid from './get-grid';
import * as getPinGroupPerformance from './get-pin-group-performance';
import * as getPinGroup from './get-pin-group';
import * as getNode from './get-node';
import * as getPinMeasurements from './get-pin-measurements';
import * as getPin from './get-pin';
import * as getTile from './get-tile';
import * as setNotification from './set-notification';
import * as setThreshold from './set-threshold';
import * as updateEdge from './update-edge';
import * as updateGrid from './update-grid';
import * as updateLocations from './update-locations';
import * as updatePinGroup from './update-pin-group';
import * as updateNode from './update-node';
import * as updatePin from './update-pin';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import TableController from '../../comms/table-controller';

class GraphRoute {
  static routerPath = 'graph';

  static auth = true;

  constructor(readonly comms: Comms) {
  }

  addEdgeToPin = (parameters: addEdgeToPin.Request):
    Result<addEdgeToPin.EffectiveRequest, addEdgeToPin.Response> => controllerGenerator<
      addEdgeToPin.Request,
      addEdgeToPin.EffectiveRequest,
      addEdgeToPin.Response
    >(
      addEdgeToPin.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  addEdge = (parameters: addEdge.Request):
    Result<addEdge.EffectiveRequest, addEdge.Response> => controllerGenerator<
      addEdge.Request,
      addEdge.EffectiveRequest,
      addEdge.Response
    >(
      addEdge.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  addGrid = (parameters: addGrid.Request):
    Result<addGrid.EffectiveRequest, addGrid.Response> => controllerGenerator<
      addGrid.Request,
      addGrid.EffectiveRequest,
      addGrid.Response
    >(
      addGrid.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  addPinGroup = (parameters: addPinGroup.Request):
    Result<addPinGroup.EffectiveRequest, addPinGroup.Response> => controllerGenerator<
      addPinGroup.Request,
      addPinGroup.EffectiveRequest,
      addPinGroup.Response
    >(
      addPinGroup.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  addNode = (parameters: addNode.Request):
    Result<addNode.EffectiveRequest, addNode.Response> => controllerGenerator<
      addNode.Request,
      addNode.EffectiveRequest,
      addNode.Response
    >(
      addNode.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  addPin = (parameters: addPin.Request):
    Result<addPin.EffectiveRequest, addPin.Response> => controllerGenerator<
      addPin.Request,
      addPin.EffectiveRequest,
      addPin.Response
    >(
      addPin.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  deleteEdgeFromPin = (parameters: deleteEdgeFromPin.Request):
    Result<deleteEdgeFromPin.EffectiveRequest, deleteEdgeFromPin.Response> => controllerGenerator<
      deleteEdgeFromPin.Request,
      deleteEdgeFromPin.EffectiveRequest,
      deleteEdgeFromPin.Response
    >(
      deleteEdgeFromPin.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  deleteEdge = (parameters: deleteEdge.Request):
    Result<deleteEdge.EffectiveRequest, deleteEdge.Response> => controllerGenerator<
      deleteEdge.Request,
      deleteEdge.EffectiveRequest,
      deleteEdge.Response
    >(
      deleteEdge.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  deleteGrid = (parameters: deleteGrid.Request):
    Result<deleteGrid.EffectiveRequest, deleteGrid.Response> => controllerGenerator<
      deleteGrid.Request,
      deleteGrid.EffectiveRequest,
      deleteGrid.Response
    >(
      deleteGrid.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  deletePinGroup = (parameters: deletePinGroup.Request):
    Result<deletePinGroup.EffectiveRequest, deletePinGroup.Response> => controllerGenerator<
      deletePinGroup.Request,
      deletePinGroup.EffectiveRequest,
      deletePinGroup.Response
    >(
      deletePinGroup.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  deleteNode = (parameters: deleteNode.Request):
    Result<deleteNode.EffectiveRequest, deleteNode.Response> => controllerGenerator<
      deleteNode.Request,
      deleteNode.EffectiveRequest,
      deleteNode.Response
    >(
      deleteNode.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  deletePin = (parameters: deletePin.Request):
    Result<deletePin.EffectiveRequest, deletePin.Response> => controllerGenerator<
      deletePin.Request,
      deletePin.EffectiveRequest,
      deletePin.Response
    >(
      deletePin.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  find = (parameters?: find.Request):
    Result<find.EffectiveRequest, find.Response> => controllerGenerator<
      find.Request,
      find.EffectiveRequest,
      find.Response
    >(
      find.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  findTableController = (parameters?: find.Query):
    TableController<find.ResponseRow> => new TableController<find.ResponseRow>(
      this.find,
      undefined,
      parameters,
    );

  findEdge = (parameters?: findEdge.Request):
    Result<findEdge.EffectiveRequest, findEdge.Response> => controllerGenerator<
      findEdge.Request,
      findEdge.EffectiveRequest,
      findEdge.Response
    >(
      findEdge.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  findEdgeTableController = (parameters?: findEdge.Query):
    TableController<findEdge.ResponseRow> => new TableController<findEdge.ResponseRow>(
      this.findEdge,
      (row: findEdge.ResponseRow) => ({
        lastValueSortColumn: row.edge.hashId,
        lastValueHashId: row.edge.hashId,
      }),
      parameters,
    );

  findGrid = (parameters?: findGrid.Request):
    Result<findGrid.EffectiveRequest, findGrid.Response> => controllerGenerator<
      findGrid.Request,
      findGrid.EffectiveRequest,
      findGrid.Response
    >(
      findGrid.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  findGridTableController = (parameters?: findGrid.Query):
    TableController<findGrid.ResponseRow> => new TableController<findGrid.ResponseRow>(
      this.findGrid,
      (row: findGrid.ResponseRow, sortBy: string) => {
        let lastValueSortColumn;
        if (sortBy === 'hashId') {
          lastValueSortColumn = row.grid.hashId;
        } else {
          lastValueSortColumn = row.grid.name;
        }
        return {
          lastValueSortColumn,
          lastValueHashId: row.grid.hashId,
        };
      },
      parameters,
    );

  findPinGroup = (parameters?: findPinGroup.Request):
    Result<findPinGroup.EffectiveRequest, findPinGroup.Response> => controllerGenerator<
      findPinGroup.Request,
      findPinGroup.EffectiveRequest,
      findPinGroup.Response
    >(
      findPinGroup.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  findPinQuantities = (parameters: findPinQuantities.Request):
    Result<findPinQuantities.EffectiveRequest, findPinQuantities.Response> => controllerGenerator<
      findPinQuantities.Request,
      findPinQuantities.EffectiveRequest,
      findPinQuantities.Response
    >(
      findPinQuantities.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  findPinGroupTableController = (parameters?: findPinGroup.Query):
    TableController<findPinGroup.ResponseRow> => new TableController<findPinGroup.ResponseRow>(
      this.findPinGroup,
      (row: findPinGroup.ResponseRow, sortBy: string) => {
        let lastValueSortColumn;
        if (sortBy === 'name') {
          lastValueSortColumn = row.pinGroup.name;
        } else {
          lastValueSortColumn = row.pinGroup.hashId;
        }
        return {
          lastValueSortColumn,
          lastValueHashId: row.pinGroup.hashId,
        };
      },
      parameters,
    );

  findNode = (parameters?: findNode.Request):
    Result<findNode.EffectiveRequest, findNode.Response> => controllerGenerator<
      findNode.Request,
      findNode.EffectiveRequest,
      findNode.Response
    >(
      findNode.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  findNodeTableController = (parameters?: findNode.Query):
    TableController<findNode.ResponseRow> => new TableController<findNode.ResponseRow>(
      this.findNode,
      (row: findNode.ResponseRow) => ({
        lastValueSortColumn: row.node.hashId,
        lastValueHashId: row.node.hashId,
      }),
      parameters,
    );

  getEdgeMeasurements = (parameters: getEdgeMeasurements.Request):
    Result<
      getEdgeMeasurements.EffectiveRequest,
      getEdgeMeasurements.Response
    > => controllerGenerator<
      getEdgeMeasurements.Request,
      getEdgeMeasurements.EffectiveRequest,
      getEdgeMeasurements.Response
    >(
      getEdgeMeasurements.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  getEdge = (parameters: getEdge.Request):
    Result<getEdge.EffectiveRequest, getEdge.Response> => controllerGenerator<
      getEdge.Request,
      getEdge.EffectiveRequest,
      getEdge.Response
    >(
      getEdge.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  getGrid = (parameters: getGrid.Request):
    Result<getGrid.EffectiveRequest, getGrid.Response> => controllerGenerator<
      getGrid.Request,
      getGrid.EffectiveRequest,
      getGrid.Response
    >(
      getGrid.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  getPinGroupPerformance = (parameters: getPinGroupPerformance.Request):
    Result<
      getPinGroupPerformance.EffectiveRequest,
      getPinGroupPerformance.Response
    > => controllerGenerator<
      getPinGroupPerformance.Request,
      getPinGroupPerformance.EffectiveRequest,
      getPinGroupPerformance.Response
    >(
      getPinGroupPerformance.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  getPinGroup = (parameters: getPinGroup.Request):
    Result<getPinGroup.EffectiveRequest, getPinGroup.Response> => controllerGenerator<
      getPinGroup.Request,
      getPinGroup.EffectiveRequest,
      getPinGroup.Response
    >(
      getPinGroup.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  getNode = (parameters: getNode.Request):
    Result<getNode.EffectiveRequest, getNode.Response> => controllerGenerator<
      getNode.Request,
      getNode.EffectiveRequest,
      getNode.Response
    >(
      getNode.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  getPinMeasurements = (parameters: getPinMeasurements.Request):
    Result<getPinMeasurements.EffectiveRequest, getPinMeasurements.Response> => controllerGenerator<
      getPinMeasurements.Request,
      getPinMeasurements.EffectiveRequest,
      getPinMeasurements.Response
    >(
      getPinMeasurements.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  getPin = (parameters: getPin.Request):
    Result<getPin.EffectiveRequest, getPin.Response> => controllerGenerator<
      getPin.Request,
      getPin.EffectiveRequest,
      getPin.Response
    >(
      getPin.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  getTile = (parameters: getTile.Request):
    Result<getTile.EffectiveRequest, getTile.Response> => controllerGenerator<
      getTile.Request,
      getTile.EffectiveRequest,
      getTile.Response
    >(
      getTile.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  setNotification = (parameters: setNotification.Request):
    Result<setNotification.EffectiveRequest, setNotification.Response> => controllerGenerator<
      setNotification.Request,
      setNotification.EffectiveRequest,
      setNotification.Response
    >(
      setNotification.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  setThreshold = (parameters: setThreshold.Request):
    Result<setThreshold.EffectiveRequest, setThreshold.Response> => controllerGenerator<
      setThreshold.Request,
      setThreshold.EffectiveRequest,
      setThreshold.Response
    >(
      setThreshold.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  updateEdge = (parameters: updateEdge.Request):
    Result<updateEdge.EffectiveRequest, updateEdge.Response> => controllerGenerator<
      updateEdge.Request,
      updateEdge.EffectiveRequest,
      updateEdge.Response
    >(
      updateEdge.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  updateGrid = (parameters: updateGrid.Request):
    Result<updateGrid.EffectiveRequest, updateGrid.Response> => controllerGenerator<
      updateGrid.Request,
      updateGrid.EffectiveRequest,
      updateGrid.Response
    >(
      updateGrid.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  updateLocations = (parameters: updateLocations.Request):
    Result<updateLocations.EffectiveRequest, updateLocations.Response> => controllerGenerator<
      updateLocations.Request,
      updateLocations.EffectiveRequest,
      updateLocations.Response
    >(
      updateLocations.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  updatePinGroup = (parameters: updatePinGroup.Request):
    Result<updatePinGroup.EffectiveRequest, updatePinGroup.Response> => controllerGenerator<
      updatePinGroup.Request,
      updatePinGroup.EffectiveRequest,
      updatePinGroup.Response
    >(
      updatePinGroup.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  updateNode = (parameters: updateNode.Request):
    Result<updateNode.EffectiveRequest, updateNode.Response> => controllerGenerator<
      updateNode.Request,
      updateNode.EffectiveRequest,
      updateNode.Response
    >(
      updateNode.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);

  updatePin = (parameters: updatePin.Request):
    Result<updatePin.EffectiveRequest, updatePin.Response> => controllerGenerator<
      updatePin.Request,
      updatePin.EffectiveRequest,
      updatePin.Response
    >(
      updatePin.controllerGeneratorOptions,
      GraphRoute.routerPath,
      GraphRoute.auth,
      this.comms,
    )(parameters);
}

export default GraphRoute;
