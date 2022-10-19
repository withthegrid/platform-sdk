import Comms from '../comms';

import AnalyticsRoute from './analytics';
import AuthenticationRoute from './authentication';
import EnvironmentRoute from './environment';
import ChartRoute from './chart';
import CommandRoute from './command';
import CommandTypeRoute from './command-type';
import DeviceRoute from './device';
import DeviceTypeRoute from './device-type';
import GraphRoute from './graph';
import IssueRoute from './issue';
import IssueCommentRoute from './issue-comment';
import ConnectivityThresholdRoute from './connectivity-threshold';
import IssueTriggerRuleRoute from './issue-trigger-rule';
import LabelRoute from './label';
import MeasurementRoute from './measurement';
import MeasurementFilterRoute from './measurement-filter';
import QuantityRoute from './quantity';
import ReportRoute from './report';
import ReportTypeRoute from './report-type';
import SettingsRoute from './settings';
import SubscriptionRoute from './subscription';
import SuggestionsRoute from './suggestions';
import SupplierRoute from './supplier';
import MeasurementThresholdRoute from './measurement-threshold';
import SupplierActivityRoute from './supplier-activity';
import SupplierCertificateRoute from './supplier-certificate';
import SupplierReportTypeRoute from './supplier-report-type';
import SupplierWebhookRoute from './supplier-webhook';
import TwoFactorAuthenticationRoute from './two-factor-authentication';
import UserRoute from './user';

class Routes {
  analytics: AnalyticsRoute;

  authentication: AuthenticationRoute;

  chart: ChartRoute;

  command: CommandRoute;

  commandType: CommandTypeRoute;

  device: DeviceRoute;

  deviceType: DeviceTypeRoute;

  environment: EnvironmentRoute;

  graph: GraphRoute;

  issue: IssueRoute;

  issueComment: IssueCommentRoute;

  connectivityThreshold: ConnectivityThresholdRoute;

  issueTriggerRule: IssueTriggerRuleRoute;

  label: LabelRoute;

  measurement: MeasurementRoute;

  measurementFilter: MeasurementFilterRoute;

  measurementThreshold: MeasurementThresholdRoute;

  quantity: QuantityRoute;

  report: ReportRoute;

  reportType: ReportTypeRoute;

  settings: SettingsRoute;

  subscription: SubscriptionRoute;

  suggestions: SuggestionsRoute;

  supplier: SupplierRoute;

  supplierActivity: SupplierActivityRoute;

  supplierCertificate: SupplierCertificateRoute;

  supplierReportType: SupplierReportTypeRoute;

  supplierWebhook: SupplierWebhookRoute;

  twoFactorAuthentication: TwoFactorAuthenticationRoute;

  user: UserRoute;

  constructor(readonly comms: Comms) {
    this.analytics = new AnalyticsRoute(comms);
    this.authentication = new AuthenticationRoute(comms);
    this.chart = new ChartRoute(comms);
    this.command = new CommandRoute(comms);
    this.commandType = new CommandTypeRoute(comms);
    this.device = new DeviceRoute(comms);
    this.deviceType = new DeviceTypeRoute(comms);
    this.environment = new EnvironmentRoute(comms);
    this.graph = new GraphRoute(comms);
    this.issue = new IssueRoute(comms);
    this.issueComment = new IssueCommentRoute(comms);
    this.connectivityThreshold = new ConnectivityThresholdRoute(comms);
    this.issueTriggerRule = new IssueTriggerRuleRoute(comms);
    this.label = new LabelRoute(comms);
    this.measurement = new MeasurementRoute(comms);
    this.measurementFilter = new MeasurementFilterRoute(comms);
    this.measurementThreshold = new MeasurementThresholdRoute(comms);
    this.quantity = new QuantityRoute(comms);
    this.report = new ReportRoute(comms);
    this.reportType = new ReportTypeRoute(comms);
    this.settings = new SettingsRoute(comms);
    this.subscription = new SubscriptionRoute(comms);
    this.suggestions = new SuggestionsRoute(comms);
    this.supplier = new SupplierRoute(comms);
    this.supplierActivity = new SupplierActivityRoute(comms);
    this.supplierCertificate = new SupplierCertificateRoute(comms);
    this.supplierReportType = new SupplierReportTypeRoute(comms);
    this.supplierWebhook = new SupplierWebhookRoute(comms);
    this.twoFactorAuthentication = new TwoFactorAuthenticationRoute(comms);
    this.user = new UserRoute(comms);
  }
}

export default Routes;
export {
  AnalyticsRoute,
  AuthenticationRoute,
  ChartRoute,
  CommandRoute,
  CommandTypeRoute,
  DeviceRoute,
  DeviceTypeRoute,
  EnvironmentRoute,
  GraphRoute,
  IssueRoute,
  IssueCommentRoute,
  ConnectivityThresholdRoute,
  IssueTriggerRuleRoute,
  LabelRoute,
  MeasurementRoute,
  MeasurementFilterRoute,
  MeasurementThresholdRoute,
  QuantityRoute,
  ReportRoute,
  ReportTypeRoute,
  SettingsRoute,
  SubscriptionRoute,
  SuggestionsRoute,
  SupplierRoute,
  SupplierActivityRoute,
  SupplierCertificateRoute,
  SupplierReportTypeRoute,
  SupplierWebhookRoute,
  TwoFactorAuthenticationRoute,
  UserRoute,
};
