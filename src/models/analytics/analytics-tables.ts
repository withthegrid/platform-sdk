import {
  Translations,
  Translation,
  PluralizedTranslation,
  isSimpleTranslation,
} from '../translations';
import {
  AggregatedColumn,
  Field,
  isTimeGroupColumn,
  isUnaggregatedColumn,
  TimeGroupColumn,
  UnaggregatedColumn,
} from '../analytics-query';

type L10nKeys = Record<
  keyof Translations,
  {
    expression: PluralizedTranslation,
    granularities: Record<string, Translation>,
    aggregations: Record<string, Translation>,
  }
>;

const t: L10nKeys = {
  en: {
    expression: { singular: 'Calculation', plural: 'Calculations' },
    granularities: {
      hour: { singular: 'Hour', plural: 'Hours' },
      day: { singular: 'Day', plural: 'Days' },
      week: { singular: 'Week', plural: 'Weeks' },
      month: { singular: 'Month', plural: 'Months' },
      year: { singular: 'Year', plural: 'Years' },
      hourOfTheDay: 'HourOfDay',
      dayOfTheWeek: 'DayOfWeek',
      monthOfTheYear: 'MonthOfYear',
    },
    aggregations: {
      count: { singular: 'Count', plural: 'Counts' },
      share: { singular: 'Percentage', plural: 'Percentages' },
      sum: 'Sum',
      mean: 'Mean',
      min: 'Min',
      max: 'Max',
      any: 'Any',
    },
  },
  nl: {
    expression: { singular: 'Berekening', plural: 'Berekeningen' },
    granularities: {
      hour: { singular: 'Uur', plural: 'Uren' },
      day: { singular: 'Dag', plural: 'Dagen' },
      week: { singular: 'Week', plural: 'Weken' },
      month: { singular: 'Maand', plural: 'Maanden' },
      year: { singular: 'Jaar', plural: 'Jaren' },
      hourOfTheDay: 'UurVanDag',
      dayOfTheWeek: 'DagVanJaar',
      monthOfTheYear: 'MaandVanJaar',
    },
    aggregations: {
      count: { singular: 'Aantal', plural: 'Aantallen' },
      share: { singular: 'Percentage', plural: 'Percentages' },
      sum: 'Som',
      mean: 'Gemiddelde',
      min: 'Min',
      max: 'Max',
      any: 'Een',
    },
  },
};

type AnalyticsTable = {
  fields: string[];
  fieldsWithTranslations: Record<
    keyof Translations,
    Record<string, Translation>
  >;
  tableKey: Translation;
  tableText: Record<keyof Translations, PluralizedTranslation>;
}

type FormatterFn<R> = (tableText: Record<keyof Translations, Translation>) => R;
type Tuple<T, U> = [T, U];

interface AnalyticsTableHelpers {
  getTableName: (tableKey: TableKeys) =>
    Record<keyof Translations, PluralizedTranslation> & {
      format: <R>(formatter: FormatterFn<R>) => R
      getField: (fieldKey: string) => Record<keyof Translations, Translation> & {
        format: <R>(formatter: FormatterFn<R>) => R
      }
    };
  getTableNameAndField: (key: `${TableKeys}.${string}`) => Tuple<
    Record<keyof Translations, PluralizedTranslation>,
    Record<keyof Translations, Translation>
  >;
  getTranslationString: (tr: Translation, opts?: { plural?: boolean }) => string;
}

type TableKeys =
  | 'clientReportType'
  | 'command'
  | 'commandType'
  | 'device'
  | 'deviceLink'
  | 'deviceInstallationUser'
  | 'deviceType'
  | 'edge'
  | 'grid'
  | 'pinGrid'
  | 'pinGroupGrid'
  | 'gridPinGroup'
  | 'gridPin'
  | 'issue'
  | 'issueAssignedUser'
  | 'measurement'
  | 'performanceMonth'
  | 'pin'
  | 'pinGroup'
  | 'quantity'
  | 'report'
  | 'measurementThreshold'
  | 'user';

function defaultThresholdValue(
  condition: string,
  { locale, isDefault }: { locale: 'en' | 'nl'; isDefault: boolean },
) {
  const value = isDefault
    ? { en: 'default value', nl: 'standaard waarde' }
    : { en: 'value', nl: 'waarde' };

  return {
    singular: `Issue Trigger ${value[locale]} (${condition})`,
    plural: `Issue Trigger ${value[locale]} (${condition})`,
  };
}

function getTranslationString(tr: Translation, opts?: { plural?: boolean }): string {
  const pluralization = opts !== undefined
    && opts.plural === true ? 'plural' : 'singular';

  return isSimpleTranslation(tr)
    ? tr
    : tr[pluralization];
}

const analyticsTablesL10n: Record<TableKeys, AnalyticsTable> = {
  clientReportType: {
    fields: ['hashId', 'name', 'createdAt', 'deletedAt'],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        name: { singular: 'Name', plural: 'Names' },
        createdAt: 'Created at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        name: { singular: 'Naam', plural: 'Namen' },
        createdAt: 'Aangemaakt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'clientReportType',
    tableText: {
      en: { singular: 'Report type', plural: 'Report types' },
      nl: { singular: 'Rapportsoort', plural: 'Rapportsoorten' },
    },
  },
  command: {
    fields: ['hashId', 'createdAt', 'deletedAt'],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        createdAt: 'Created at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        createdAt: 'Aangemaakt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'command',
    tableText: {
      en: { singular: 'Command', plural: 'Commands' },
      nl: { singular: 'Opdracht', plural: 'Opdrachten' },
    },
  },
  commandType: {
    fields: ['hashId', 'name', 'createdAt', 'updatedAt', 'deletedAt'],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        name: { singular: 'Name', plural: 'Names' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        name: { singular: 'Naam', plural: 'Namen' },
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'commandType',
    tableText: {
      en: { singular: 'Command type', plural: 'Command types' },
      nl: { singular: 'Opdracht-soort', plural: 'Opdracht-soorten' },
    },
  },
  device: {
    fields: [
      'hashId',
      'fields',
      'nextReportBefore',
      'lastOnlineAt',
      'missedReports',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        fields: { singular: 'Form field', plural: 'Form fields' },
        nextReportBefore: 'Next report before',
        lastOnlineAt: 'Last online at',
        missedReports: { singular: 'Missed report', plural: 'Missed reports' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        fields: { singular: 'Formulierveld', plural: 'Formuliervelden' },
        nextReportBefore: 'Volgend rapport voor',
        lastOnlineAt: 'Laatst online op',
        missedReports: {
          singular: 'Gemiste rapport',
          plural: 'Gemiste rapporten',
        },
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'device',
    tableText: {
      en: { singular: 'Device', plural: 'Devices' },
      nl: { singular: 'Device', plural: 'Devices' },
    },
  },
  deviceLink: {
    fields: ['hashId', 'linkUpdatedAt', 'createdAt', 'updatedAt', 'deletedAt'],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        linkUpdatedAt: 'Device channel configuration updated at',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        linkUpdatedAt: 'Device kanaal configuratie bijgewerkt op',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'deviceLink',
    tableText: {
      en: { singular: 'Device link', plural: 'Device links' },
      nl: { singular: 'Device koppeling', plural: 'Device koppelingen' },
    },
  },
  deviceInstallationUser: {
    fields: ['hashId', 'name', 'createdAt', 'updatedAt', 'deletedAt'],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        name: { singular: 'Name', plural: 'Names' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        name: { singular: 'Naam', plural: 'Namen' },
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'deviceInstallationUser',
    tableText: {
      en: { singular: 'Device installation/configuration user', plural: 'Device installation/configuration users' },
      nl: { singular: 'Device installatie/configuratie gebruiker', plural: 'Device installatie/configuratie gebruikers' },
    },
  },
  deviceType: {
    fields: ['hashId', 'name', 'createdAt', 'updatedAt', 'deletedAt'],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        name: { singular: 'Name', plural: 'Names' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        name: { singular: 'Naam', plural: 'Namen' },
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'deviceType',
    tableText: {
      en: { singular: 'Device type', plural: 'Device types' },
      nl: { singular: 'Device-soort', plural: 'Device-soorten' },
    },
  },
  edge: {
    fields: [
      'hashId',
      'level',
      'mapLayer',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        level: { singular: 'Condition', plural: 'Conditions' },
        mapLayer: { singular: 'Map layer', plural: 'Map layers' },
        fields: { singular: 'Form field', plural: 'Form fields' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        level: { singular: 'Conditie', plural: 'Condities' },
        mapLayer: { singular: 'Kaartlaag', plural: 'Kaartlagen' },
        fields: { singular: 'Formulierveld', plural: 'Formuliervelden' },
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'edge',
    tableText: {
      en: { singular: 'Line', plural: 'Lines' },
      nl: { singular: 'Lijn', plural: 'Lijnen' },
    },
  },
  grid: {
    fields: ['hashId', 'createdAt', 'updatedAt', 'deletedAt'],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        fields: { singular: 'Form field', plural: 'Form fields' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        fields: { singular: 'Formulierveld', plural: 'Formuliervelden' },
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'grid',
    tableText: {
      en: { singular: 'Group', plural: 'Groups' },
      nl: { singular: 'Groep', plural: 'Groepen' },
    },
  },
  pinGroupGrid: {
    fields: ['hashId', 'createdAt', 'updatedAt', 'deletedAt'],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        fields: { singular: 'Form field', plural: 'Form fields' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        fields: { singular: 'Formulierveld', plural: 'Formuliervelden' },
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'pinGroupGrid',
    tableText: {
      en: { singular: 'Group', plural: 'Groups' },
      nl: { singular: 'Groep', plural: 'Groepen' },
      // TODO gabriel: replace the naming above after the release and migration with the following
      // en: { singular: 'Location Group', plural: 'Location Groups' },
      // nl: { singular: 'Locatie Groep', plural: 'Locatie Groepen' },
    },
  },
  pinGrid: {
    fields: ['hashId', 'createdAt', 'updatedAt', 'deletedAt'],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        fields: { singular: 'Form field', plural: 'Form fields' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        fields: { singular: 'Formulierveld', plural: 'Formuliervelden' },
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'pinGrid',
    tableText: {
      en: { singular: 'Port group', plural: 'Port groups' },
      nl: { singular: 'Poort groep', plural: 'Poort groepen' },
    },
  },
  gridPinGroup: {
    fields: ['hashId', 'sort', 'createdAt', 'updatedAt', 'deletedAt'],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        sort: { singular: 'Sort', plural: 'Sorts' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        sort: { singular: 'Sortering', plural: 'Sorteringen' },
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'gridPinGroup',
    tableText: {
      en: { singular: 'Group-Location', plural: 'Group-Locations' },
      nl: { singular: 'Groep-Locatie', plural: 'Groep-Locaties' },
    },
  },
  gridPin: {
    fields: ['hashId', 'sort', 'createdAt', 'updatedAt', 'deletedAt'],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        sort: { singular: 'Sort', plural: 'Sorts' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        sort: { singular: 'Sortering', plural: 'Sorteringen' },
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'gridPin',
    tableText: {
      en: { singular: 'Group-Port', plural: 'Group-Ports' },
      nl: { singular: 'Groep-Poort', plural: 'Groep-Poorten' },
    },
  },
  issue: {
    fields: [
      'hashId',
      'title',
      'level',
      'automation',
      'assignedUserId',
      'closedAt',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        title: { singular: 'Title', plural: 'Titles' },
        level: { singular: 'Priority', plural: 'Priorities' },
        automation: { singular: 'Automation type', plural: 'Automation types' },
        assignedUserId: { singular: 'Assigned user ID', plural: 'Assigned user IDs' },
        closedAt: 'Closed at',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        title: { singular: 'Titel', plural: 'Titels' },
        level: { singular: 'Prioriteit', plural: 'Prioriteiten' },
        typeKey: { singular: 'Type', plural: 'Types' },
        startAt: 'Begon op',
        endAt: 'Eindigde op',
        automation: { singular: 'Automatisering type', plural: 'Automatisering types' },
        assignedUserId: { singular: 'Toegewezen aan ID', plural: 'Toegewezen aan IDs' },
        closedAt: 'Gesloten op',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'issue',
    tableText: {
      en: { singular: 'Issue', plural: 'Issues' },
      nl: { singular: 'Issue', plural: 'Issues' },
    },
  },
  issueAssignedUser: {
    fields: ['hashId', 'name'],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        name: { singular: 'Name', plural: 'Names' },
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        name: { singular: 'Naam', plural: 'Namen' },
      },
    },
    tableKey: 'issueAssignedUser',
    tableText: {
      en: { singular: 'Issue assigned user', plural: 'Issue assigned users' },
      nl: { singular: 'Issue toegewezen aan gebruiker', plural: 'Issue toegewezen aan gebruikers' },
    },
  },
  measurement: {
    fields: [
      'hashId',
      'channelIndex',
      'orderOfMagnitude',
      'significand',
      'performance',
      'value',
      'generatedAt',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        channelIndex: { singular: 'Sensor channel', plural: 'Sensor channels' },
        orderOfMagnitude: { singular: 'Exponent', plural: 'Exponents' },
        significand: { singular: 'Significand', plural: 'Significands' },
        performance: { singular: 'Condition', plural: 'Conditions' },
        value: { singular: 'Value', plural: 'Values' },
        generatedAt: 'Measured at',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        channelIndex: { singular: 'Sensorkanaal', plural: 'Sensorkanaalen' },
        orderOfMagnitude: { singular: 'Exponent', plural: 'Exponents' },
        significand: { singular: 'Significant', plural: 'Significands' },
        performance: { singular: 'Conditie', plural: 'Condities' },
        value: { singular: 'Waarde', plural: 'Waarden' },
        generatedAt: 'Gemeten op',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'measurement',
    tableText: {
      en: { singular: 'Measurement', plural: 'Measurements' },
      nl: { singular: 'Meting', plural: 'Metingen' },
    },
  },
  performanceMonth: {
    fields: [
      'hashId',
      'month',
      'expected',
      'received',
      'good',
      'serious',
      'critical',
      'createdAt',
      'updatedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        month: t.en.granularities.month as Translation,
        expected: { singular: 'Expected report', plural: 'Expected reports' },
        received: { singular: 'Received report', plural: 'Received reports' },
        good: {
          singular: 'Healthy measurement',
          plural: 'Healthy measurements',
        },
        serious: {
          singular: 'Serious measurement',
          plural: 'Serious measurements',
        },
        critical: {
          singular: 'Critical measurement',
          plural: 'Critical measurements',
        },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        month: t.nl.granularities.month as Translation,
        expected: {
          singular: 'Verwachte rapport',
          plural: 'Verwachte rapporten',
        },
        received: {
          singular: 'Ontvangen rapport',
          plural: 'Ontvangen rapporten',
        },
        good: { singular: 'Gezonde meting', plural: 'Gezonde metingen' },
        serious: { singular: 'Serieuze meting', plural: 'Serieuze metingen' },
        critical: { singular: 'Kritieke meting', plural: 'Kritieke metingen' },
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
      },
    },
    tableKey: 'performanceMonth',
    tableText: {
      en: { singular: 'Condition', plural: 'Conditions' },
      nl: { singular: 'Conditie', plural: 'Condities' },
    },
  },
  pin: {
    fields: [
      'hashId',
      'level',
      'deviceFields',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        level: { singular: 'Condition', plural: 'Conditions' },
        deviceFields: {
          singular: 'Device form field',
          plural: 'Device form fields',
        },
        fields: { singular: 'Form field', plural: 'Form fields' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        level: { singular: 'Conditie', plural: 'Condities' },
        deviceFields: {
          singular: 'Device formulierveld',
          plural: 'Device formuliervelden',
        },
        fields: { singular: 'Formulierveld', plural: 'Formuliervelden' },
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'pin',
    tableText: {
      en: { singular: 'Port', plural: 'Ports' },
      nl: { singular: 'Poort', plural: 'Poorten' },
    },
  },
  pinGroup: {
    fields: [
      'hashId',
      'latitude',
      'longitude',
      'level',
      'mapLayer',
      'deviceFields',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        latitude: { singular: 'Latitude', plural: 'Latitudes' },
        longitude: { singular: 'Longitude', plural: 'Longitudes' },
        level: { singular: 'Condition', plural: 'Conditions' },
        mapLayer: { singular: 'Map layer', plural: 'Map layers' },
        deviceFields: {
          singular: 'Device form field',
          plural: 'Device form fields',
        },
        fields: { singular: 'Form field', plural: 'Form fields' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        latitude: { singular: 'Breedtegraad', plural: 'Breedtegraden' },
        longitude: { singular: 'Lengtegraad', plural: 'Lengtegraden' },
        level: { singular: 'Conditie', plural: 'Condities' },
        mapLayer: { singular: 'Kaartlaag', plural: 'Kaartlagen' },
        deviceFields: {
          singular: 'Device formulierveld',
          plural: 'Device formuliervelden',
        },
        fields: { singular: 'Formulierveld', plural: 'Formuliervelden' },
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'pinGroup',
    tableText: {
      en: { singular: 'Location', plural: 'Locations' },
      nl: { singular: 'Locatie', plural: 'Locaties' },
    },
  },
  quantity: {
    fields: [
      'hashId',
      'name',
      'color',
      'unit',
      'defaultCriticallyLowThresholdValue',
      'defaultLowThresholdValue',
      'defaultHighThresholdValue',
      'defaultCriticallyHighThresholdValue',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        name: { singular: 'Name', plural: 'Names' },
        color: { singular: 'Color', plural: 'Colors' },
        unit: { singular: 'Unit', plural: 'Units' },
        defaultCriticallyLowThresholdValue: defaultThresholdValue(
          'critically low',
          { locale: 'en', isDefault: true },
        ),
        defaultLowThresholdValue: defaultThresholdValue('low', {
          locale: 'en',
          isDefault: true,
        }),
        defaultHighThresholdValue: defaultThresholdValue('high', {
          locale: 'en',
          isDefault: true,
        }),
        defaultCriticallyHighThresholdValue: defaultThresholdValue(
          'critically high',
          { locale: 'en', isDefault: true },
        ),
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        name: { singular: 'Naam', plural: 'Namen' },
        color: { singular: 'Kleur', plural: 'Kleuren' },
        unit: { singular: 'Eenheid', plural: 'Eenheden' },
        defaultCriticallyLowThresholdValue: defaultThresholdValue(
          'kritiek laag',
          { locale: 'nl', isDefault: true },
        ),
        defaultLowThresholdValue: defaultThresholdValue('laag', {
          locale: 'nl',
          isDefault: true,
        }),
        defaultHighThresholdValue: defaultThresholdValue('hoog', {
          locale: 'nl',
          isDefault: true,
        }),
        defaultCriticallyHighThresholdValue: defaultThresholdValue(
          'kritiek hoog',
          { locale: 'nl', isDefault: true },
        ),
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'quantity',
    tableText: {
      en: { singular: 'Quantity', plural: 'Quantities' },
      nl: { singular: 'Kwantiteit', plural: 'Kwantiteiten' },
    },
  },
  report: {
    fields: [
      'hashId',
      'userHashId',
      'fields',
      'generatedAt',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        userHashId: { singular: 'User ID', plural: 'User IDs' },
        fields: { singular: 'Form field', plural: 'Form fields' },
        generatedAt: 'Measured at',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        userHashId: { singular: 'Gebruikers ID', plural: 'Gebruikers IDs' },
        fields: { singular: 'Formulierveld', plural: 'Formuliervelden' },
        generatedAt: 'Gemeten op',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'report',
    tableText: {
      en: { singular: 'Report', plural: 'Reports' },
      nl: { singular: 'Rapport', plural: 'Rapporten' },
    },
  },
  measurementThreshold: {
    fields: [
      'hashId',
      'criticallyLowValue',
      'lowValue',
      'highValue',
      'criticallyHighValue',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        criticallyLowValue: defaultThresholdValue('critically low', {
          locale: 'en',
          isDefault: false,
        }),
        lowValue: defaultThresholdValue('low', {
          locale: 'en',
          isDefault: false,
        }),
        highValue: defaultThresholdValue('high', {
          locale: 'en',
          isDefault: false,
        }),
        criticallyHighValue: defaultThresholdValue('critically high', {
          locale: 'en',
          isDefault: false,
        }),
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        criticallyLowValue: defaultThresholdValue('kritiek laag', {
          locale: 'nl',
          isDefault: false,
        }),
        lowValue: defaultThresholdValue('laag', {
          locale: 'nl',
          isDefault: false,
        }),
        highValue: defaultThresholdValue('hoog', {
          locale: 'nl',
          isDefault: false,
        }),
        criticallyHighValue: defaultThresholdValue('kritiek hoog', {
          locale: 'nl',
          isDefault: false,
        }),
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'measurementThreshold',
    tableText: {
      en: { singular: 'Port issue trigger', plural: 'Port issue triggers' },
      nl: { singular: 'Poort issue trigger', plural: 'Poort issue triggers' },
    },
  },
  user: {
    fields: ['hashId', 'name', 'createdAt', 'updatedAt', 'deletedAt'],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        name: { singular: 'Name', plural: 'Names' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        name: { singular: 'Naam', plural: 'Namen' },
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'user',
    tableText: {
      en: { singular: 'User', plural: 'Users' },
      nl: { singular: 'Gebruiker', plural: 'Gebruikers' },
    },
  },
};

const analyticsTables: Record<TableKeys, AnalyticsTable> & AnalyticsTableHelpers = {
  ...analyticsTablesL10n,
  getTableName: (tableKey) => ({
    ...analyticsTablesL10n[tableKey].tableText,
    format: (formatter) => formatter(analyticsTables[tableKey].tableText),
    getField: (field) => {
      const result: Record<keyof Translations, Translation> = Object.create({});
      const fieldWithTranslations = analyticsTables[tableKey].fieldsWithTranslations;

      Object.entries(fieldWithTranslations).forEach((
        [locale, translations]: [keyof Translations, Record<string, Translation>],
      ) => {
        result[locale] = translations[field];
      });

      return {
        ...result,
        format: (formatter) => formatter(result),
      };
    },
  }),
  getTableNameAndField: (key) => {
    const [tableKey, fieldKey] = key.split('.', 2) as [TableKeys, string];
    const table = analyticsTables.getTableName(tableKey);
    const field = analyticsTables.getTableName(tableKey).getField(fieldKey);

    return [table, field];
  },
  getTranslationString,
};

function matchColumn<R>(
  column: UnaggregatedColumn | AggregatedColumn | TimeGroupColumn,
  fns: {
    onUnaggregatedColumn: (unaggregatedColumn: UnaggregatedColumn) => R,
    onAggregatedColumnWithField: (
      aggregatedColumn: AggregatedColumn,
      field: Field,
    ) => R,
    onAggregatedColumnWithoutField: (aggregatedColumn: AggregatedColumn) => R,
    onTimeGroupColumn: (timeGroupColumn: TimeGroupColumn) => R,
  },
): R {
  if (isUnaggregatedColumn(column)) {
    return fns.onUnaggregatedColumn(column);
  }

  if (isTimeGroupColumn(column)) {
    return fns.onTimeGroupColumn(column);
  }

  if ('field' in column) {
    return fns.onAggregatedColumnWithField(column, column.field);
  }

  return fns.onAggregatedColumnWithoutField(column);
}

function getColumnPlaceholder(
  column: UnaggregatedColumn | AggregatedColumn | TimeGroupColumn,
  userLocale: keyof Translations,
): string {
  const tl = t[userLocale];

  const parseField = (field: string): {
    tableName: TableKeys,
    remainder: string,
    tableText: string,
  } => {
    const tableName = field.split('.', 1)[0] as TableKeys;
    const remainder = field.slice(tableName.length + 1);
    const tableText = analyticsTables[tableName].tableText[userLocale];

    return { tableName, remainder, tableText: getTranslationString(tableText) };
  };

  const parseFormField = (field: string): { name: string, key: string } => {
    const name = field.slice(0, field.indexOf('.'));
    const key = field.slice(field.indexOf('.') + 1);
    return { name, key };
  };

  const placeholderFromField = (field: string): string => {
    const { tableName, remainder, tableText } = parseField(field);

    if (remainder.includes('.')) {
      const { name, key } = parseFormField(remainder);

      return key === 'id'
        ? `${tableText}:${key}`
        : `${tableText}:${getTranslationString(
          analyticsTables[tableName].fieldsWithTranslations[userLocale][name],
        ).toLowerCase()
        } "${key}"`;
    }

    return `${tableText}:${getTranslationString(
      analyticsTables[tableName].fieldsWithTranslations[userLocale][remainder],
    ).toLowerCase()}`;
  };

  return matchColumn<string>(column, {
    onUnaggregatedColumn: (unaggregatedColumn) => {
      if (typeof unaggregatedColumn.field === 'object') {
        return tl.expression.singular;
      }
      return placeholderFromField(unaggregatedColumn.field);
    },
    onTimeGroupColumn: (timeGroupColumn) => {
      const aggregateText = getTranslationString(tl.granularities[timeGroupColumn.granularity]);
      const placeholder = placeholderFromField(timeGroupColumn.field);
      return `${aggregateText}(${placeholder})`;
    },
    onAggregatedColumnWithField: (aggregatedColumn, field) => {
      const aggregateText = getTranslationString(tl.aggregations[aggregatedColumn.type]);
      const placeholder = typeof field === 'string'
        ? placeholderFromField(field)
        : field.expression;
      return `${aggregateText}(${placeholder})`;
    },
    onAggregatedColumnWithoutField: (aggregatedColumn) => {
      const aggregateText = getTranslationString(tl.aggregations[aggregatedColumn.type]);
      return `${aggregateText}`;
    },
  });
}

export {
  AnalyticsTable,
  analyticsTables,
  TableKeys,
  getColumnPlaceholder,
  getTranslationString,
  FormatterFn,
};
