import Comms from '../comms';

import IssueRoute from './issue';
import AuthenticationRoute from './authentication';
import AutocompleteRoute from './autocomplete';
import EnvironmentRoute from './environment';
import CommandRoute from './command';
import DeviceRoute from './device';
import GraphRoute from './graph';
import IssueCommentRoute from './issue-comment';
import LabelRoute from './label';
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
  IssueComment?: typeof IssueCommentRoute;
  Label?: typeof LabelRoute;
  Report?: typeof ReportRoute;
  ReportType?: typeof ReportTypeRoute;
  Settings?: typeof SettingsRoute;
  User?: typeof UserRoute;
  Download?: typeof DownloadRoute;
}

class Routes {
  authentication: AuthenticationRoute;

  autocomplete: AutocompleteRoute;

  command: CommandRoute;

  device: DeviceRoute;

  environment: EnvironmentRoute;

  graph: GraphRoute;

  issue: IssueRoute;

  issueComment: IssueCommentRoute;

  label: LabelRoute;

  report: ReportRoute;

  reportType: ReportTypeRoute;

  settings: SettingsRoute;

  user: UserRoute;

  download: DownloadRoute;


  constructor(readonly comms: Comms) {
    this.authentication = new AuthenticationRoute(comms);
    this.autocomplete = new AutocompleteRoute(comms);
    this.command = new CommandRoute(comms);
    this.device = new DeviceRoute(comms);
    this.environment = new EnvironmentRoute(comms);
    this.graph = new GraphRoute(comms);
    this.issue = new IssueRoute(comms);
    this.issueComment = new IssueCommentRoute(comms);
    this.label = new LabelRoute(comms);
    this.report = new ReportRoute(comms);
    this.reportType = new ReportTypeRoute(comms);
    this.settings = new SettingsRoute(comms);
    this.user = new UserRoute(comms);
    this.download = new DownloadRoute(comms);
  }
}

export default Routes;
export {
  AuthenticationRoute,
  AutocompleteRoute,
  CommandRoute,
  DeviceRoute,
  EnvironmentRoute,
  GraphRoute,
  IssueRoute,
  IssueCommentRoute,
  LabelRoute,
  ReportRoute,
  ReportTypeRoute,
  SettingsRoute,
  UserRoute,
  DownloadRoute,
};
