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


  constructor(readonly comms: Comms, routeClassesOverride: RouteClasses = {}) {
    if (routeClassesOverride.Issue !== undefined) {
      this.issue = new routeClassesOverride.Issue(comms);
    } else {
      this.issue = new IssueRoute(comms);
    }
    if (routeClassesOverride.Authentication !== undefined) {
      this.authentication = new routeClassesOverride.Authentication(comms);
    } else {
      this.authentication = new AuthenticationRoute(comms);
    }
    if (routeClassesOverride.Autocomplete !== undefined) {
      this.autocomplete = new routeClassesOverride.Autocomplete(comms);
    } else {
      this.autocomplete = new AutocompleteRoute(comms);
    }
    if (routeClassesOverride.Command !== undefined) {
      this.command = new routeClassesOverride.Command(comms);
    } else {
      this.command = new CommandRoute(comms);
    }
    if (routeClassesOverride.Device !== undefined) {
      this.device = new routeClassesOverride.Device(comms);
    } else {
      this.device = new DeviceRoute(comms);
    }
    if (routeClassesOverride.Environment !== undefined) {
      this.environment = new routeClassesOverride.Environment(comms);
    } else {
      this.environment = new EnvironmentRoute(comms);
    }
    if (routeClassesOverride.Graph !== undefined) {
      this.graph = new routeClassesOverride.Graph(comms);
    } else {
      this.graph = new GraphRoute(comms);
    }
    if (routeClassesOverride.Report !== undefined) {
      this.report = new routeClassesOverride.Report(comms);
    } else {
      this.report = new ReportRoute(comms);
    }
    if (routeClassesOverride.ReportType !== undefined) {
      this.reportType = new routeClassesOverride.ReportType(comms);
    } else {
      this.reportType = new ReportTypeRoute(comms);
    }
    if (routeClassesOverride.Settings !== undefined) {
      this.settings = new routeClassesOverride.Settings(comms);
    } else {
      this.settings = new SettingsRoute(comms);
    }
    if (routeClassesOverride.User !== undefined) {
      this.user = new routeClassesOverride.User(comms);
    } else {
      this.user = new UserRoute(comms);
    }
    if (routeClassesOverride.Download !== undefined) {
      this.download = new routeClassesOverride.Download(comms);
    } else {
      this.download = new DownloadRoute(comms);
    }
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
