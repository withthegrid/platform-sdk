import {
  Translations,
  Translation,
  PluralizedTranslation,
  isSimpleTranslation,
} from '../translations';
import {
  AggregatedColumn,
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
  tableText: Record<keyof Translations, Translation>;
};

type TableKeys =
  | 'clientReportType'
  | 'command'
  | 'commandType'
  | 'device'
  | 'deviceType'
  | 'edge'
  | 'grid'
  | 'gridPinGroup'
  | 'issue'
  | 'measurement'
  | 'performanceMonth'
  | 'pin'
  | 'pinGroup'
  | 'quantity'
  | 'report'
  | 'threshold'
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
const analyticsTables: Record<TableKeys, AnalyticsTable> = {
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
        field: { singular: 'Form field', plural: 'Form fields' },
        nextReportBefore: 'Next report before',
        lastOnlineAt: 'Last online at',
        missedReports: { singular: 'Missed report', plural: 'Missed reports' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        field: { singular: 'Formulierveld', plural: 'Formuliervelden' },
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
        field: { singular: 'Form field', plural: 'Form fields' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        level: { singular: 'Conditie', plural: 'Condities' },
        mapLayer: { singular: 'Kaartlaag', plural: 'Kaartlagen' },
        field: { singular: 'Formulierveld', plural: 'Formuliervelden' },
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
        field: { singular: 'Form field', plural: 'Form fields' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        field: { singular: 'Formulierveld', plural: 'Formuliervelden' },
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
  issue: {
    fields: [
      'hashId',
      'title',
      'level',
      'typeKey',
      'startAt',
      'endAt',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: { singular: 'ID', plural: 'IDs' },
        title: { singular: 'Title', plural: 'Titles' },
        level: { singular: 'Priority', plural: 'Priorities' },
        typeKey: { singular: 'Type', plural: 'Types' },
        startAt: 'Started at',
        endAt: 'Ended at',
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
        deviceField: {
          singular: 'Device form field',
          plural: 'Device form fields',
        },
        field: { singular: 'Form field', plural: 'Form fields' },
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        level: { singular: 'Conditie', plural: 'Condities' },
        deviceField: {
          singular: 'Device formulierveld',
          plural: 'Device formuliervelden',
        },
        field: { singular: 'Formulierveld', plural: 'Formuliervelden' },
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
        deviceField: {
          singular: 'Device form field',
          plural: 'Device form fields',
        },
        field: { singular: 'Form field', plural: 'Form fields' },
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
        deviceField: {
          singular: 'Device formulierveld',
          plural: 'Device formuliervelden',
        },
        field: { singular: 'Formulierveld', plural: 'Formuliervelden' },
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
        field: { singular: 'Form field', plural: 'Form fields' },
        generatedAt: 'Measured at',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: { singular: 'ID', plural: 'IDs' },
        userHashId: { singular: 'Gebruikers ID', plural: 'Gebruikers IDs' },
        field: { singular: 'Formulierveld', plural: 'Formuliervelden' },
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
  threshold: {
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
    tableKey: 'threshold',
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

function getTranslationString(tr: Translation, opts?: { plural?: boolean }): string {
  const pluralization = opts !== undefined
    && opts.plural === true ? 'plural' : 'singular';

  return isSimpleTranslation(tr)
    ? tr
    : tr[pluralization];
}

function getColumnPlaceholder(
  column: UnaggregatedColumn | AggregatedColumn | TimeGroupColumn,
  userLocale: keyof Translations,
): string {
  const tl = t[userLocale];

  if (column.type === undefined) {
    if (typeof column.field === 'object') {
      return tl.expression.singular;
    }
    const tableName: TableKeys = column.field.split('.', 1)[0] as TableKeys;
    const remainder = column.field.slice(tableName.length + 1);
    const tableText = analyticsTables[tableName].tableText[userLocale];

    if (remainder.indexOf('.') !== -1) {
      const formFieldName = remainder.slice(0, remainder.indexOf('.') - 1);
      const formFieldKey = remainder.slice(remainder.indexOf('.') + 1);
      if (formFieldKey === 'id') {
        return `${getTranslationString(tableText)}:${formFieldKey}`;
      }
      const field = analyticsTables[tableName].fieldsWithTranslations[userLocale][
        formFieldName
      ];
      return `${
        getTranslationString(tableText)
      }:${getTranslationString(field)?.toLowerCase()} "${formFieldKey}"`;
    }
    const fieldRemainder = analyticsTables[tableName].fieldsWithTranslations[userLocale][
      remainder
    ];
    return `${
      getTranslationString(tableText)
    }:${getTranslationString(fieldRemainder)?.toLowerCase()}`;
  }

  const aggregateText = getTranslationString(column.type === 'timeGroup'
    ? tl.granularities[column.granularity]
    : tl.aggregations[column.type]);

  const conditionMarker = 'condition' in column ? '*' : '';
  if ('field' in column) {
    if (typeof column.field === 'string') {
      const tableName: TableKeys = column.field.split('.', 1)[0] as TableKeys;
      const remainder = column.field.slice(tableName.length + 1);
      const tableText = analyticsTables[tableName].tableText[userLocale];
      if (remainder.indexOf('.') !== -1) {
        const formFieldName = remainder.slice(0, remainder.indexOf('.') - 1);
        const formFieldKey = remainder.slice(remainder.indexOf('.') + 1);
        if (formFieldKey === 'id') {
          return `${aggregateText}${conditionMarker}(${getTranslationString(tableText)}:${formFieldKey})`;
        }
        const formField = analyticsTables[tableName].fieldsWithTranslations[userLocale][
          formFieldName
        ];
        return `${aggregateText}${conditionMarker}(${
          getTranslationString(tableText)
        }:${getTranslationString(formField)?.toLowerCase()} "${formFieldKey}")`;
      }
      const formFieldRemainder = analyticsTables[tableName].fieldsWithTranslations[userLocale][
        remainder
      ];
      return `${aggregateText}${conditionMarker}(${
        getTranslationString(tableText)
      }:${getTranslationString(formFieldRemainder)?.toLowerCase()})`;
    }
    return `${aggregateText}${conditionMarker}(${column.field.expression})`;
  }
  return `${aggregateText}${conditionMarker}`;
}

export {
  AnalyticsTable, analyticsTables, TableKeys, getColumnPlaceholder,
};
