import { DeviceType } from '../models/device-type';


const defaultLoopThresholds = {
  resistanceLoop: {
    criticallyLow: null,
    low: null,
    high: { significand: 100, orderOfMagnitude: 0 },
    criticallyHigh: { significand: 400, orderOfMagnitude: 0 },
  },
  resistanceInsulation: {
    criticallyLow: { significand: 100, orderOfMagnitude: 3 },
    low: { significand: 500, orderOfMagnitude: 3 },
    high: null,
    criticallyHigh: null,
  },
};

const defaultSensorThresholds = {
  deviceInclination: {
    criticallyLow: null,
    low: null,
    high: { significand: 10, orderOfMagnitude: 0 },
    criticallyHigh: { significand: 20, orderOfMagnitude: 0 },
  },
  deviceBatteryVoltage: {
    criticallyLow: { significand: 3000, orderOfMagnitude: -3 },
    low: { significand: 3300, orderOfMagnitude: -3 },
    high: { significand: 4000, orderOfMagnitude: -3 },
    criticallyHigh: { significand: 4500, orderOfMagnitude: -3 },
  },
};

const defaultCpGridThresholds = {
  voltageDC: {
    criticallyLow: { significand: -1700, orderOfMagnitude: -3 },
    low: { significand: -1500, orderOfMagnitude: -3 },
    high: { significand: -1400, orderOfMagnitude: -3 },
    criticallyHigh: { significand: -1200, orderOfMagnitude: -3 },
  },
};

const dhLeakChannels = [
  {
    name: { en: 'Loop 1 wire 1', nl: 'Lus 1 draad 1' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 1 wire 2', nl: 'Lus 1 draad 2' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 2 wire 1', nl: 'Lus 2 draad 1' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 2 wire 2', nl: 'Lus 2 draad 2' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 3 wire 1', nl: 'Lus 3 draad 1' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 3 wire 2', nl: 'Lus 3 draad 2' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 4 wire 1', nl: 'Lus 4 draad 1' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 4 wire 2', nl: 'Lus 4 draad 2' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 5 wire 1', nl: 'Lus 5 draad 1' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 5 wire 2', nl: 'Lus 5 draad 2' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 6 wire 1', nl: 'Lus 6 draad 1' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 6 wire 2', nl: 'Lus 6 draad 2' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 7 wire 1', nl: 'Lus 7 draad 1' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 7 wire 2', nl: 'Lus 7 draad 2' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 8 wire 1', nl: 'Lus 8 draad 1' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Loop 8 wire 2', nl: 'Lus 8 draad 2' },
    typeKey: null,
    defaultThresholds: {},
    linkable: false,
    properties: [],
  },
  {
    name: { en: 'Sensor', nl: 'Sensor' },
    typeKey: 'sensor',
    defaultThresholds: defaultSensorThresholds,
    defaultPinName: { en: 'Sensor', nl: 'Sensor' },
    linkable: true,
    properties: [],
  },
  {
    name: { en: 'Wire 1', nl: 'Draad 1' },
    defaultThresholds: defaultLoopThresholds,
    defaultPinName: { en: 'Supply in A', nl: 'Aanvoer inkomend A' },
    typeKey: null,
    linkable: true,
    properties: [],
  },
  {
    name: { en: 'Wire 2', nl: 'Draad 2' },
    defaultThresholds: defaultLoopThresholds,
    defaultPinName: { en: 'Supply in B', nl: 'Aanvoer inkomend B' },
    typeKey: null,
    linkable: true,
    properties: [],
  },
  {
    name: { en: 'Wire 3', nl: 'Draad 3' },
    defaultThresholds: defaultLoopThresholds,
    defaultPinName: { en: 'Supply out A', nl: 'Aanvoer uitgaand A' },
    typeKey: null,
    linkable: true,
    properties: [],
  },
  {
    name: { en: 'Wire 4', nl: 'Draad 4' },
    defaultThresholds: defaultLoopThresholds,
    defaultPinName: { en: 'Supply out B', nl: 'Aanvoer uitgaand B' },
    typeKey: null,
    linkable: true,
    properties: [],
  },
  {
    name: { en: 'Wire 5', nl: 'Draad 5' },
    defaultThresholds: defaultLoopThresholds,
    defaultPinName: { en: 'Return in A', nl: 'Retour inkomend A' },
    typeKey: null,
    linkable: true,
    properties: [],
  },
  {
    name: { en: 'Wire 6', nl: 'Draad 6' },
    defaultThresholds: defaultLoopThresholds,
    defaultPinName: { en: 'Return in B', nl: 'Retour inkomend B' },
    typeKey: null,
    linkable: true,
    properties: [],
  },
  {
    name: { en: 'Wire 7', nl: 'Draad 7' },
    defaultThresholds: defaultLoopThresholds,
    defaultPinName: { en: 'Return out A', nl: 'Retour uitgaand A' },
    typeKey: null,
    linkable: true,
    properties: [],
  },
  {
    name: { en: 'Wire 8', nl: 'Draad 8' },
    defaultThresholds: defaultLoopThresholds,
    defaultPinName: { en: 'Return out B', nl: 'Retour uitgaand B' },
    typeKey: null,
    linkable: true,
    properties: [],
  },
];

interface DeviceTypes {
  [key: string]: DeviceType;
}

const deviceTypes: DeviceTypes = {
  'cp-pole': {
    name: {
      en: 'Corrosion monitoring sensor',
      nl: 'Sensor voor corrosiebewaking',
    },
    defaultMeasurementInterval: 60 * 60 * 24 * 7, // 1x/week
    batteryPowered: true,
    channels: [
      {
        name: { en: 'Red', nl: 'Rood' },
        defaultThresholds: defaultCpGridThresholds,
        defaultPinName: { en: '1.1', nl: '1.1' },
        linkable: true,
        typeKey: null,
        properties: ['referenceVoltage'],
      },
      {
        name: { en: 'Yellow', nl: 'Geel' },
        defaultThresholds: defaultCpGridThresholds,
        defaultPinName: { en: '1.2', nl: '1.2' },
        linkable: true,
        typeKey: null,
        properties: ['referenceVoltage'],
      },
      {
        name: { en: 'Blue', nl: 'Blauw' },
        defaultThresholds: defaultCpGridThresholds,
        defaultPinName: { en: '1.3', nl: '1.3' },
        linkable: true,
        typeKey: null,
        properties: ['referenceVoltage'],
      },
      {
        name: { en: 'Black', nl: 'Zwart' },
        defaultThresholds: defaultCpGridThresholds,
        defaultPinName: { en: '1.4', nl: '1.4' },
        linkable: true,
        typeKey: null,
        properties: ['referenceVoltage'],
      },
      {
        name: { en: 'White', nl: 'Wit' },
        defaultThresholds: defaultCpGridThresholds,
        defaultPinName: { en: '1.5', nl: '1.5' },
        linkable: true,
        typeKey: null,
        properties: ['referenceVoltage'],
      },
      {
        name: { en: 'Sensor', nl: 'Sensor' },
        typeKey: 'sensor',
        defaultThresholds: defaultSensorThresholds,
        defaultPinName: { en: 'Sensor', nl: 'Sensor' },
        linkable: true,
        properties: [],
      },
    ],
    properties: [],
    minimumMeasurementInterval: 300,
  },
  'cp-pole-2': {
    name: {
      en: 'Corrosion monitoring sensor',
      nl: 'Sensor voor corrosiebewaking',
    },
    defaultMeasurementInterval: 60 * 60 * 24 * 7, // 1x/week
    batteryPowered: true,
    channels: [
      {
        name: { en: 'Red', nl: 'Rood' },
        defaultThresholds: defaultCpGridThresholds,
        defaultPinName: { en: '1.1', nl: '1.1' },
        linkable: true,
        typeKey: null,
        properties: ['referenceVoltage'],
      },
      {
        name: { en: 'Yellow', nl: 'Geel' },
        defaultThresholds: defaultCpGridThresholds,
        defaultPinName: { en: '1.2', nl: '1.2' },
        linkable: true,
        typeKey: null,
        properties: ['referenceVoltage'],
      },
      {
        name: { en: 'Blue', nl: 'Blauw' },
        defaultThresholds: defaultCpGridThresholds,
        defaultPinName: { en: '1.3', nl: '1.3' },
        linkable: true,
        typeKey: null,
        properties: ['referenceVoltage'],
      },
      {
        name: { en: 'Sensor', nl: 'Sensor' },
        typeKey: 'sensor',
        defaultThresholds: defaultSensorThresholds,
        defaultPinName: { en: 'Sensor', nl: 'Sensor' },
        linkable: true,
        properties: [],
      },
    ],
    properties: [],
    minimumMeasurementInterval: 300,
  },
  'cp-pole-coupon': {
    name: {
      en: 'Corrosion monitoring sensor',
      nl: 'Sensor voor corrosiebewaking',
    },
    defaultMeasurementInterval: 60 * 60 * 24 * 7, // 1x/week
    batteryPowered: true,
    channels: [
      {
        name: { en: 'Red (grid 1)', nl: 'Rood (net 1)' },
        defaultThresholds: defaultCpGridThresholds,
        defaultPinName: { en: '1.1', nl: '1.1' },
        linkable: true,
        typeKey: null,
        properties: ['referenceVoltage'],
      },
      {
        name: { en: 'Yellow (grid 2)', nl: 'Geel (net 2)' },
        defaultThresholds: defaultCpGridThresholds,
        defaultPinName: { en: '1.2', nl: '1.2' },
        linkable: true,
        typeKey: null,
        properties: ['referenceVoltage'],
      },
      {
        name: { en: 'Blue (coupon)', nl: 'Blauw (coupon)' },
        typeKey: 'coupon',
        defaultThresholds: {
          voltageDC: {
            criticallyLow: { significand: -1200, orderOfMagnitude: -3 },
            low: { significand: -1000, orderOfMagnitude: -3 },
            high: { significand: -850, orderOfMagnitude: -3 },
            criticallyHigh: { significand: -800, orderOfMagnitude: -3 },
          },
        },
        defaultPinName: { en: 'Coupon', nl: 'Coupon' },
        linkable: true,
        properties: ['referenceVoltage', 'shuntResistance'],
      },
      {
        name: { en: 'Sensor', nl: 'Sensor' },
        typeKey: 'sensor',
        defaultThresholds: defaultSensorThresholds,
        defaultPinName: { en: 'Sensor', nl: 'Sensor' },
        linkable: true,
        properties: [],
      },
      {
        name: { en: 'Black (shunt)', nl: 'Zwart (shunt)' },
        typeKey: null,
        linkable: false,
        defaultThresholds: {},
        properties: [],
      },
    ],
    properties: ['shuntVoltageDCOffset'],
    minimumMeasurementInterval: 300,
  },
  'cp-rect-modbus': {
    name: {
      en: 'Controller for Amstel rectifier',
      nl: 'Regelaar voor Amstel gelijkrichter',
    },
    defaultMeasurementInterval: 3600, // 1x/hour
    batteryPowered: false,
    channels: [
      {
        name: { en: 'Grid', nl: 'Net' },
        defaultThresholds: defaultCpGridThresholds,
        defaultPinName: { en: 'Grid', nl: 'Net' },
        linkable: true,
        typeKey: null,
        properties: ['referenceVoltage'],
      },
      {
        name: { en: 'Anode', nl: 'Anode' },
        typeKey: 'anode',
        defaultThresholds: {},
        defaultPinName: { en: 'Anode', nl: 'Anode' },
        linkable: true,
        properties: [],
      },
      {
        name: { en: 'Sensor', nl: 'Sensor' },
        typeKey: 'sensor',
        defaultThresholds: defaultSensorThresholds,
        defaultPinName: { en: 'Sensor', nl: 'Sensor' },
        linkable: true,
        properties: [],
      },
    ],
    properties: [],
    minimumMeasurementInterval: 300,
  },
  'cp-rect-analog': {
    name: {
      en: 'Controller for analog rectifier',
      nl: 'Regelaar voor analoge gelijkrichter',
    },
    defaultMeasurementInterval: 3600, // 1x/hour
    batteryPowered: false,
    channels: [
      {
        name: { en: 'Grid', nl: 'Net' },
        defaultThresholds: defaultCpGridThresholds,
        defaultPinName: { en: 'Grid', nl: 'Net' },
        linkable: true,
        typeKey: null,
        properties: ['referenceVoltage'],
      },
      {
        name: { en: 'Anode', nl: 'Anode' },
        typeKey: 'anode',
        defaultThresholds: {},
        defaultPinName: { en: 'Anode', nl: 'Anode' },
        linkable: true,
        properties: ['shuntResistance'],
      },
      {
        name: { en: 'Sensor', nl: 'Sensor' },
        typeKey: 'sensor',
        defaultThresholds: defaultSensorThresholds,
        defaultPinName: { en: 'Sensor', nl: 'Sensor' },
        linkable: true,
        properties: [],
      },
    ],
    properties: ['shuntVoltageDCOffset'],
    minimumMeasurementInterval: 300,
  },
  'cp-rect': {
    name: {
      en: 'Controller for rectifier',
      nl: 'Regelaar voor gelijkrichter',
    },
    defaultMeasurementInterval: 3600, // 1x/hour
    batteryPowered: false,
    channels: [
      {
        name: { en: 'Grid 1', nl: 'Net 1' },
        defaultThresholds: defaultCpGridThresholds,
        defaultPinName: { en: 'Grid 1', nl: 'Net 1' },
        linkable: true,
        typeKey: null,
        properties: [],
      },
      {
        name: { en: 'Grid 2', nl: 'Net 2' },
        defaultThresholds: defaultCpGridThresholds,
        defaultPinName: { en: 'Grid 2', nl: 'Net 2' },
        linkable: true,
        typeKey: null,
        properties: [],
      },
      {
        name: { en: 'Potential control', nl: 'Potentiaalsturing' },
        typeKey: 'potential-control',
        defaultThresholds: {},
        defaultPinName: { en: 'Potential control', nl: 'Potentiaalsturing' },
        linkable: true,
        properties: [],
      },
      {
        name: { en: 'Anode', nl: 'Anode' },
        typeKey: 'anode',
        defaultThresholds: {},
        defaultPinName: { en: 'Anode', nl: 'Anode' },
        linkable: true,
        properties: [],
      },
      {
        name: { en: 'Sensor', nl: 'Sensor' },
        typeKey: 'sensor',
        defaultThresholds: defaultSensorThresholds,
        defaultPinName: { en: 'Sensor', nl: 'Sensor' },
        linkable: true,
        properties: [],
      },
    ],
    properties: [],
    minimumMeasurementInterval: 300,
  },
  'dh-home': {
    name: {
      en: 'Temperature and pressure sensor',
      nl: 'Temperatuur en druk sensor',
    },
    defaultMeasurementInterval: 3600, // 1x/hour
    minimumMeasurementInterval: 60,
    batteryPowered: false,
    channels: [
      {
        name: { en: 'Supply', nl: 'Aanvoer' },
        defaultThresholds: {},
        defaultPinName: { en: 'Supply', nl: 'Aanvoer' },
        linkable: true,
        typeKey: null,
        properties: [],
      },
      {
        name: { en: 'Return', nl: 'Retour' },
        defaultThresholds: {},
        defaultPinName: { en: 'Return', nl: 'Retour' },
        linkable: true,
        typeKey: null,
        properties: [],
      },
      {
        name: { en: 'Sensor', nl: 'Sensor' },
        typeKey: 'sensor',
        defaultThresholds: defaultSensorThresholds,
        defaultPinName: { en: 'Sensor', nl: 'Sensor' },
        linkable: true,
        properties: [],
      },
    ],
    properties: [],
  },
  'dh-leak-1': {
    name: {
      en: 'Leak detection device',
      nl: 'Lekdetectie sensor',
    },
    defaultMeasurementInterval: 60 * 60 * 24 * 7, // 1x/week
    batteryPowered: true,
    channels: dhLeakChannels,
    properties: [],
    minimumMeasurementInterval: 300,
  },
  'dh-leak-2': {
    name: {
      en: 'Leak detection device',
      nl: 'Lekdetectie sensor',
    },
    batteryPowered: false,
    channels: dhLeakChannels,
    defaultMeasurementInterval: 21600,
    properties: [],
    minimumMeasurementInterval: 300,
  },
  'dh-station': {
    name: {
      en: 'Temperature device',
      nl: 'Temperatuur sensor',
    },
    defaultMeasurementInterval: 3600, // 1x/hour
    batteryPowered: false,
    channels: [
      {
        name: { en: 'Supply', nl: 'Aanvoer' },
        defaultPinName: { en: 'Supply', nl: 'Aanvoer' },
        defaultThresholds: {},
        typeKey: null,
        linkable: true,
        properties: [],
      },
      {
        name: { en: 'Return 1', nl: 'Retour 1' },
        defaultPinName: { en: 'Return 1', nl: 'Retour 1' },
        defaultThresholds: {},
        typeKey: null,
        linkable: true,
        properties: [],
      },
      {
        name: { en: 'Return 2', nl: 'Retour 2' },
        defaultPinName: { en: 'Return 2', nl: 'Retour 2' },
        defaultThresholds: {},
        typeKey: null,
        linkable: true,
        properties: [],
      },
      {
        name: { en: 'Return 3', nl: 'Retour 3' },
        defaultPinName: { en: 'Return 3', nl: 'Retour 3' },
        defaultThresholds: {},
        typeKey: null,
        linkable: true,
        properties: [],
      },
      {
        name: { en: 'Return 4', nl: 'Retour 4' },
        defaultPinName: { en: 'Return 4', nl: 'Retour 4' },
        defaultThresholds: {},
        typeKey: null,
        linkable: true,
        properties: [],
      },
      {
        name: { en: 'Sensor', nl: 'Sensor' },
        typeKey: 'sensor',
        defaultThresholds: defaultSensorThresholds,
        defaultPinName: { en: 'Sensor', nl: 'Sensor' },
        linkable: true,
        properties: [],
      },
    ],
    properties: [],
    minimumMeasurementInterval: 300,
  },
};

export default deviceTypes;
export { DeviceTypes };
