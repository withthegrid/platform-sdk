import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';
import { identifierExample } from '../../models/supplier-certificate';

interface Request {
  body: {
    csr: string;
    identifier: string;
  };
}

interface Response {
  hashId: string;
  certificate: string;
  subscriptionHashId?: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    csr: Joi.string().required().example(`-----BEGIN CERTIFICATE REQUEST-----
MIHhMIGHAgEAMCUxEjAQBgNVBAoMCWRldmVsb3BlcjEPMA0GA1UEAwwGeGQycmQ0
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEyHDE7farWQdLw/HDgOcbt9BU8ba6
fEvEY79Z47ozYQ6LAt6wYEW/4Aq4Eir1kSCw/DtououtnpaQokZQkGYf2aAAMAoG
CCqGSM49BAMCA0kAMEYCIQCHf/bilJwxF+7V/0mifsXK4U0PUHDe0YNBorb2dBzc
KAIhAK59odu1i8oxIJg237EOLKbf0k/Rhub/CKPrsQ50t0lK
-----END CERTIFICATE REQUEST-----`).description('A Base64 encoded PKCS#10 certificate signing request'),
    identifier: Joi.string().required().example(identifierExample).description('A javascript function that returns deviceType and identifier. See the chapter "User defined code"'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('v19a12'),
    certificate: Joi.string().required().example(`-----BEGIN CERTIFICATE-----
MIIBNzCB3gIBATAKBggqhkjOPQQDAjAkMREwDwYDVQQKDAhzdXBwbGllcjEPMA0G
A1UEAwwGeGQycmQ0MB4XDTIwMDIyNDEzNTQwOVoXDTIxMDIyMzEzNTQwOVowLDEP
MA0GA1UECgwGZGV2aWNlMRkwFwYDVQQDDBB1bnFpZSBpZGVudGlmaWVyMFkwEwYH
KoZIzj0CAQYIKoZIzj0DAQcDQgAEUPyQwLuDlKw7CA41ADhxXRvD3n9ZFF0XCeI9
OAgRIgl2mGmnO31wX1DD4weZoB2pswCBrC39FpyHgIz6LK10PzAKBggqhkjOPQQD
AgNIADBFAiEAyz0Ha4eFfebqSoES4vxguipSHmR/zN8KjEEie7xpqo8CICFS5NWG
iaT6xhGfChGbQjpmQQYYabau8Ons8F2JNyLu
-----END CERTIFICATE-----
`).description('A Base64 encoded intermediate certificate. Should be used to create device certificates.'),
    subscriptionHashId: Joi.string().description('Right now the user gets automatically subscribed to alerts on this object. This hashId can be used to remove such an alert'),
  }).required(),
  description: 'Add a certificate to the connectivity environment that can be used to create device client certificates.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
