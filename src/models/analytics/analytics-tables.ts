import { Translations } from '../translations';
import { AggregatedColumn, TimeGroupColumn, UnaggregatedColumn } from '../analytics-query';

const t = {
  en: {
    expression: 'Calculation',
    granularities: {
      hour: 'Hour',
      day: 'Day',
      week: 'Week',
      month: 'Month',
      year: 'Year',
      hourOfTheDay: 'HourOfDay',
      dayOfTheWeek: 'DayOfWeek',
      monthOfTheYear: 'MonthOfYear',
    },
    aggregations: {
      count: 'Count',
      share: 'Percentage',
      sum: 'Sum',
      mean: 'Mean',
      min: 'Min',
      max: 'Max',
      any: 'Any',
    },
  },
  nl: {
    expression: 'Berekening',
    granularities: {
      hour: 'Uur',
      day: 'Dag',
      week: 'Week',
      month: 'Maand',
      year: 'Jaar',
      hourOfTheDay: 'UurVanDag',
      dayOfTheWeek: 'DagVanJaar',
      monthOfTheYear: 'MaandVanJaar',
    },
    aggregations: {
      count: 'Aantal',
      share: 'Percentage',
      sum: 'Som',
      mean: 'Gemiddelde',
      min: 'Min',
      max: 'Max',
      any: 'Een',
    },
  },
};

type AnalyticsTable = {
  fields: string[]
  fieldsWithTranslations: Record<keyof Translations, Record<string, string>>
  tableKey: string,
  tableText: Record<keyof Translations, string>,
};

type TableKeys =
  'clientReportType'
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

const analyticsTables: Record<TableKeys, AnalyticsTable> = {
  clientReportType: {
    fields: [
      'hashId',
      'name',
      'createdAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        name: 'Naam',
        createdAt: 'Aangemaakt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'clientReportType',
    tableText: {
      en: 'Report type',
      nl: 'Rapportsoort',
    },
  },
  command: {
    fields: [
      'hashId',
      'createdAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: 'ID',
        createdAt: 'Created at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        createdAt: 'Aangemaakt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'command',
    tableText: {
      en: 'Command',
      nl: 'Opdracht',
    },
  },
  commandType: {
    fields: [
      'hashId',
      'name',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        name: 'Naam',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'commandType',
    tableText: {
      en: 'Command type',
      nl: 'Opdracht-soort',
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
        hashId: 'ID',
        fields: 'Form fields',
        field: 'Form field',
        nextReportBefore: 'Next report before',
        lastOnlineAt: 'Last online at',
        missedReports: 'Missed reports',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        fields: 'Formuliervelden',
        field: 'Formulierveld',
        nextReportBefore: 'Volgend rapport voor',
        lastOnlineAt: 'Laatst online op',
        missedReports: 'Gemiste rapporten',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'device',
    tableText: {
      en: 'Device',
      nl: 'Device',
    },
  },
  deviceType: {
    fields: [
      'hashId',
      'name',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        name: 'Naam',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'deviceType',
    tableText: {
      en: 'Device type',
      nl: 'Device-soort',
    },
  },
  edge: {
    fields: [
      'hashId',
      'level',
      'mapLayer',
      'createdAt',
      'updatedAt',
      'deletedAt'],
    fieldsWithTranslations: {
      en: {
        hashId: 'ID',
        level: 'Condition',
        mapLayer: 'Map layer',
        fields: 'Form fields',
        field: 'Form field',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        level: 'Conditie',
        mapLayer: 'Kaartlaag',
        fields: 'Formuliervelden',
        field: 'Formulierveld',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'edge',
    tableText: {
      en: 'Line',
      nl: 'Lijn',
    },
  },
  grid: {
    fields: [
      'hashId',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: 'ID',
        fields: 'Form fields',
        field: 'Form field',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        fields: 'Formuliervelden',
        field: 'Formulierveld',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'grid',
    tableText: {
      en: 'Group',
      nl: 'Groep',
    },
  },
  gridPinGroup: {
    fields: [
      'hashId',
      'sort',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: 'ID',
        sort: 'Sort',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        sort: 'Sortering',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'gridPinGroup',
    tableText: {
      en: 'Group-Location',
      nl: 'Groep-Locatie',
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
        hashId: 'ID',
        title: 'Title',
        level: 'Priority',
        typeKey: 'Type',
        startAt: 'Started at',
        endAt: 'Ended at',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        title: 'Titel',
        level: 'Prioriteit',
        typeKey: 'Type',
        startAt: 'Begon op',
        endAt: 'Eindigde op',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'issue',
    tableText: {
      en: 'Issue',
      nl: 'Issue',
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
        hashId: 'ID',
        channelIndex: 'Sensor channel',
        orderOfMagnitude: 'Exponent',
        significand: 'Significand',
        performance: 'Condition',
        value: 'Value',
        generatedAt: 'Measured at',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        channelIndex: 'Sensorkanaal',
        orderOfMagnitude: 'Exponent',
        significand: 'Significant',
        performance: 'Conditie',
        value: 'Waarde',
        generatedAt: 'Gemeten op',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'measurement',
    tableText: {
      en: 'Measurement',
      nl: 'Meting',
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
        hashId: 'ID',
        month: 'Month',
        expected: 'Expected reports',
        received: 'Received reports',
        good: 'Healthy measurements',
        serious: 'Serious measurements',
        critical: 'Critical measurements',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
      },
      nl: {
        hashId: 'ID',
        month: 'Maand',
        expected: 'Verwachte rapporten',
        received: 'Ontvangen rapporten',
        good: 'Gezonde metingen',
        serious: 'Serieuze metingen',
        critical: 'Kritieke metingen',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
      },
    },
    tableKey: 'performanceMonth',
    tableText: {
      en: 'Condition',
      nl: 'Conditie',
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
        hashId: 'ID',
        level: 'Condition',
        deviceFields: 'Device form fields',
        deviceField: 'Device form field',
        field: 'Form field',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        level: 'Conditie',
        deviceFields: 'Device formuliervelden',
        deviceField: 'Device formulierveld',
        field: 'Formulierveld',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'pin',
    tableText: {
      en: 'Port',
      nl: 'Poort',
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
        hashId: 'ID',
        latitude: 'Latitude',
        longitude: 'Longitude',
        level: 'Condition',
        mapLayer: 'Map layer',
        deviceFields: 'Device form fields',
        deviceField: 'Device form field',
        fields: 'Form fields',
        field: 'Form field',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        latitude: 'Breedtegraad',
        longitude: 'Lengtegraad',
        level: 'Conditie',
        mapLayer: 'Kaartlaag',
        deviceFields: 'Device formuliervelden',
        deviceField: 'Device formulierveld',
        fields: 'Formuliervelden',
        field: 'Formulierveld',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'pinGroup',
    tableText: {
      en: 'Location',
      nl: 'Locatie',
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
        hashId: 'ID',
        name: 'Name',
        color: 'Color',
        unit: 'Unit',
        defaultCriticallyLowThresholdValue: 'Issue trigger default value (critically low)',
        defaultLowThresholdValue: 'Issue trigger default value (low)',
        defaultHighThresholdValue: 'Issue trigger default value (high)',
        defaultCriticallyHighThresholdValue: 'Issue trigger default value (critically high)',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        name: 'Naam',
        color: 'Kleur',
        unit: 'Eenheid',
        defaultCriticallyLowThresholdValue: 'Issue trigger standaard waarde (kritiek laag)',
        defaultLowThresholdValue: 'Issue trigger standaard waarde (laag)',
        defaultHighThresholdValue: 'Issue trigger standaard waarde (hoog)',
        defaultCriticallyHighThresholdValue: 'Issue trigger standaard waarde (kritiek hoog)',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'quantity',
    tableText: {
      en: 'Quantity',
      nl: 'Kwantiteit',
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
        hashId: 'ID',
        userHashId: 'User ID',
        fields: 'Form fields',
        field: 'Form field',
        generatedAt: 'Measured at',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        userHashId: 'Gebruikers ID',
        fields: 'Formuliervelden',
        field: 'Formulierveld',
        generatedAt: 'Gemeten op',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'report',
    tableText: {
      en: 'Report',
      nl: 'Rapport',
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
        hashId: 'ID',
        criticallyLowValue: 'Issue trigger value (critically low)',
        lowValue: 'Issue trigger value (low)',
        highValue: 'Issue trigger value (high)',
        criticallyHighValue: 'Issue trigger value (critically high)',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        criticallyLowValue: 'Issue trigger waarde (kritiek laag)',
        lowValue: 'Issue trigger waarde (laag)',
        highValue: 'Issue trigger waarde (hoog)',
        criticallyHighValue: 'Issue trigger waarde (kritiek hoog)',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'threshold',
    tableText: {
      en: 'Port issue trigger',
      nl: 'Poort issue trigger',
    },
  },
  user: {
    fields: [
      'hashId',
      'name',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    fieldsWithTranslations: {
      en: {
        hashId: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        deletedAt: 'Deleted at',
      },
      nl: {
        hashId: 'ID',
        name: 'Naam',
        createdAt: 'Aangemaakt op',
        updatedAt: 'Bijgewerkt op',
        deletedAt: 'Verwijderd op',
      },
    },
    tableKey: 'user',
    tableText: {
      en: 'User',
      nl: 'Gebruiker',
    },
  },
};

function getColumnPlaceholder(
  column: UnaggregatedColumn | AggregatedColumn | TimeGroupColumn,
  userLocale: keyof Translations,
): string {
  if (column.type === undefined) {
    if (typeof column.field === 'object') {
      return t[userLocale].expression;
    }
    const tableName: TableKeys = (column.field.split('.', 1)[0] as TableKeys);
    const remainder = column.field.slice(tableName.length + 1);
    if (remainder.indexOf('.') !== -1) {
      const formFieldName = remainder.slice(0, remainder.indexOf('.') - 1);
      const formFieldKey = remainder.slice(remainder.indexOf('.') + 1);
      if (formFieldKey === 'id') {
        return `${analyticsTables[tableName].tableText[userLocale]}:${formFieldKey}`;
      }
      return `${analyticsTables[tableName].tableText[userLocale]}:${analyticsTables[tableName].fieldsWithTranslations[userLocale][formFieldName]?.toLowerCase()} "${formFieldKey}"`;
    }
    return `${analyticsTables[tableName].tableText[userLocale]}:${analyticsTables[tableName].fieldsWithTranslations[userLocale][remainder]?.toLowerCase()}`;
  }

  let aggregateText;
  if (column.type === 'timeGroup') {
    aggregateText = t[userLocale].granularities[column.granularity];
  } else {
    aggregateText = t[userLocale].aggregations[column.type];
  }
  const conditionMarker = 'condition' in column ? '*' : '';
  if ('field' in column) {
    if (typeof column.field === 'string') {
      const tableName: TableKeys = (column.field.split('.', 1)[0] as TableKeys);
      const remainder = column.field.slice(tableName.length + 1);
      if (remainder.indexOf('.') !== -1) {
        const formFieldName = remainder.slice(0, remainder.indexOf('.') - 1);
        const formFieldKey = remainder.slice(remainder.indexOf('.') + 1);
        if (formFieldKey === 'id') {
          return `${aggregateText}${conditionMarker}(${analyticsTables[tableName].tableText[userLocale]}:${formFieldKey})`;
        }
        return `${aggregateText}${conditionMarker}(${analyticsTables[tableName].tableText[userLocale]}:${analyticsTables[tableName].fieldsWithTranslations[userLocale][formFieldName]?.toLowerCase()} "${formFieldKey}")`;
      }
      return `${aggregateText}${conditionMarker}(${analyticsTables[tableName].tableText[userLocale]}:${analyticsTables[tableName].fieldsWithTranslations[userLocale][remainder]?.toLowerCase()})`;
    }
    return `${aggregateText}${conditionMarker}(${column.field.expression})`;
  }
  return `${aggregateText}${conditionMarker}`;
}

export {
  AnalyticsTable, analyticsTables, TableKeys, getColumnPlaceholder,
};
