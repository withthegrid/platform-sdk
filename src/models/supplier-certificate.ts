import Joi from '@hapi/joi';

const identifierExample = `function (command) {
  return JSON.stringify({
    hashId: command.hashId,
    commandTypeHashId: command.commandTypeHashId,
    startAt: command.startAt,
    endAt: command.endAt,
    settings: command.settings,
  });
}`;


const schema = Joi.object().keys({
  hashId: Joi.string().required().example('v19a12'),
  name: Joi.string().required().example('My certificate'),
  certificate: Joi.string().required()
    .example(`-----BEGIN CERTIFICATE-----
    MIIBNzCB3gIBATAKBggqhkjOPQQDAjAkMREwDwYDVQQKDAhzdXBwbGllcjEPMA0G
    A1UEAwwGeGQycmQ0MB4XDTIwMDIyNDEzNTQwOVoXDTIxMDIyMzEzNTQwOVowLDEP
    MA0GA1UECgwGZGV2aWNlMRkwFwYDVQQDDBB1bnFpZSBpZGVudGlmaWVyMFkwEwYH
    KoZIzj0CAQYIKoZIzj0DAQcDQgAEUPyQwLuDlKw7CA41ADhxXRvD3n9ZFF0XCeI9
    OAgRIgl2mGmnO31wX1DD4weZoB2pswCBrC39FpyHgIz6LK10PzAKBggqhkjOPQQD
    AgNIADBFAiEAyz0Ha4eFfebqSoES4vxguipSHmR/zN8KjEEie7xpqo8CICFS5NWG
    iaT6xhGfChGbQjpmQQYYabau8Ons8F2JNyLu
    -----END CERTIFICATE-----
    `)
    .description('A Base64 encoded intermediate certificate. Should be used to create device certificates.'),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
})
  .tag('supplierCertificate')
  .description('Information about a suppier certificate that can be used to create device certificates');


interface SupplierCertificate {
  hashId: string;
  name: string;
  certificate: string;
  createdAt: Date;
}

export { schema, SupplierCertificate, identifierExample };
