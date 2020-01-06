import { Property } from '../models/property';


interface Properties {
  [key: string]: Property;
}

const properties: Properties = {
  shuntVoltageDCOffset: {
    name: {
      en: 'Shunt offset',
      nl: 'Shunt offset',
    },
    valueOptions: null,
    suffix: 'mV',
    hint: {
      en: 'Will be subtracted from voltage DC measurements of the shunt',
      nl: 'Zal worden afgetrokken van gelijkspanning metingen op de shunt',
    },
  },
  referenceVoltage: {
    name: {
      en: 'Reference potential',
      nl: 'Referentie potentiaal',
    },
    valueOptions: null,
    suffix: 'mV',
    hint: {
      en: 'Will be added to voltage DC measurements',
      nl: 'Wordt toegevoegd aan gelijkspanningsmetingen',
    },
  },
  shuntResistance: {
    name: {
      en: 'Shunt resistance',
      nl: 'Shuntweerstand',
    },
    valueOptions: null,
    suffix: 'Ohm',
    hint: {
      en: 'Resistance of shunt (for current measurements)',
      nl: 'Shuntweerstand (voor stroommetingen)',
    },
  },
};

export default properties;
export { Properties };
