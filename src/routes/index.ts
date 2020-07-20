import Comms from '../comms';

import AuthenticationRoute from './authentication';
import AutocompleteRoute from './autocomplete';
import EnvironmentRoute from './environment';
import CommandRoute from './command';
import CommandTypeRoute from './command-type';
import DeviceRoute from './device';
import DeviceTypeRoute from './device-type';
import GraphRoute from './graph';
import IssueRoute from './issue';
import IssueCommentRoute from './issue-comment';
import LabelRoute from './label';
import QuantityRoute from './quantity';
import ReportRoute from './report';
import ReportTypeRoute from './report-type';
import SettingsRoute from './settings';
import SupplierRoute from './supplier';
import SupplierActivityRoute from './supplier-activity';
import SupplierCertificateRoute from './supplier-certificate';
import SupplierReportTypeRoute from './supplier-report-type';
import SupplierWebhookRoute from './supplier-webhook';
import UserRoute from './user';
import DownloadRoute from './download';

interface RouteClasses {
  Authentication?: typeof AuthenticationRoute;
  Autocomplete?: typeof AutocompleteRoute;
  Command?: typeof CommandRoute;
  CommandType?: typeof CommandTypeRoute;
  Device?: typeof DeviceRoute;
  DeviceType?: typeof DeviceTypeRoute;
  Environment?: typeof EnvironmentRoute;
  Graph?: typeof GraphRoute;
  Issue?: typeof IssueRoute;
  IssueComment?: typeof IssueCommentRoute;
  Label?: typeof LabelRoute;
  Quantity?: typeof QuantityRoute;
  Report?: typeof ReportRoute;
  ReportType?: typeof ReportTypeRoute;
  Settings?: typeof SettingsRoute;
  Supplier?: typeof SupplierRoute;
  SupplierActivityRoute?: typeof SupplierActivityRoute;
  SupplierCertificate?: typeof SupplierCertificateRoute;
  SupplierReportType?: typeof SupplierReportTypeRoute;
  SupplierWebhook?: typeof SupplierWebhookRoute;
  User?: typeof UserRoute;
  Download?: typeof DownloadRoute;
}

class Routes {
  authentication: AuthenticationRoute;

  autocomplete: AutocompleteRoute;

  command: CommandRoute;

  commandType: CommandTypeRoute;

  device: DeviceRoute;

  deviceType: DeviceTypeRoute;

  environment: EnvironmentRoute;

  graph: GraphRoute;

  issue: IssueRoute;

  issueComment: IssueCommentRoute;

  label: LabelRoute;

  quantity: QuantityRoute;

  report: ReportRoute;

  reportType: ReportTypeRoute;

  settings: SettingsRoute;

  supplier: SupplierRoute;

  supplierActivity: SupplierActivityRoute;

  supplierCertificate: SupplierCertificateRoute;

  supplierReportType: SupplierReportTypeRoute;

  supplierWebhook: SupplierWebhookRoute;

  user: UserRoute;

  download: DownloadRoute;

  constructor(readonly comms: Comms) {
    this.authentication = new AuthenticationRoute(comms);
    this.autocomplete = new AutocompleteRoute(comms);
    this.command = new CommandRoute(comms);
    this.commandType = new CommandTypeRoute(comms);
    this.device = new DeviceRoute(comms);
    this.deviceType = new DeviceTypeRoute(comms);
    this.environment = new EnvironmentRoute(comms);
    this.graph = new GraphRoute(comms);
    this.issue = new IssueRoute(comms);
    this.issueComment = new IssueCommentRoute(comms);
    this.label = new LabelRoute(comms);
    this.quantity = new QuantityRoute(comms);
    this.report = new ReportRoute(comms);
    this.reportType = new ReportTypeRoute(comms);
    this.settings = new SettingsRoute(comms);
    this.supplier = new SupplierRoute(comms);
    this.supplierActivity = new SupplierActivityRoute(comms);
    this.supplierCertificate = new SupplierCertificateRoute(comms);
    this.supplierReportType = new SupplierReportTypeRoute(comms);
    this.supplierWebhook = new SupplierWebhookRoute(comms);
    this.user = new UserRoute(comms);
    this.download = new DownloadRoute(comms);
  }
}

export default Routes;
export {
  AuthenticationRoute,
  AutocompleteRoute,
  CommandRoute,
  CommandTypeRoute,
  DeviceRoute,
  DeviceTypeRoute,
  EnvironmentRoute,
  GraphRoute,
  IssueRoute,
  IssueCommentRoute,
  LabelRoute,
  QuantityRoute,
  ReportRoute,
  ReportTypeRoute,
  SettingsRoute,
  SupplierRoute,
  SupplierActivityRoute,
  SupplierCertificateRoute,
  SupplierReportTypeRoute,
  SupplierWebhookRoute,
  UserRoute,
  DownloadRoute,
};
