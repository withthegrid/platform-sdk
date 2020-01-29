import Comms from '../comms';

import IssueRoute from './issue';
import AuthenticationRoute from './authentication';
import AutocompleteRoute from './autocomplete';
import EnvironmentRoute from './environment';
import CommandRoute from './command';
import DeviceRoute from './device';
import GraphRoute from './graph';
import ReportRoute from './report';
import ReportTypeRoute from './report-type';
import SettingsRoute from './settings';
import UserRoute from './user';
import DownloadRoute from './download';

interface RouteClasses {
  Issue?: typeof IssueRoute;
  Authentication?: typeof AuthenticationRoute;
  Autocomplete?: typeof AutocompleteRoute;
  Command?: typeof CommandRoute;
  Device?: typeof DeviceRoute;
  Environment?: typeof EnvironmentRoute;
  Graph?: typeof GraphRoute;
  Report?: typeof ReportRoute;
  ReportType?: typeof ReportTypeRoute;
  Settings?: typeof SettingsRoute;
  User?: typeof UserRoute;
  Download?: typeof DownloadRoute;
}

class Routes {
  issue: IssueRoute;

  authentication: AuthenticationRoute;

  autocomplete: AutocompleteRoute;

  command: CommandRoute;

  device: DeviceRoute;

  environment: EnvironmentRoute;

  graph: GraphRoute;

  report: ReportRoute;

  reportType: ReportTypeRoute;

  settings: SettingsRoute;

  user: UserRoute;

  download: DownloadRoute;


  constructor(readonly comms: Comms) {
    this.issue = new IssueRoute(comms);
    this.authentication = new AuthenticationRoute(comms);
    this.autocomplete = new AutocompleteRoute(comms);
    this.command = new CommandRoute(comms);
    this.device = new DeviceRoute(comms);
    this.environment = new EnvironmentRoute(comms);
    this.graph = new GraphRoute(comms);
    this.report = new ReportRoute(comms);
    this.reportType = new ReportTypeRoute(comms);
    this.settings = new SettingsRoute(comms);
    this.user = new UserRoute(comms);
    this.download = new DownloadRoute(comms);
  }
}

export default Routes;
export {
  IssueRoute,
  AuthenticationRoute,
  AutocompleteRoute,
  CommandRoute,
  DeviceRoute,
  EnvironmentRoute,
  GraphRoute,
  ReportRoute,
  ReportTypeRoute,
  SettingsRoute,
  UserRoute,
  DownloadRoute,
};
