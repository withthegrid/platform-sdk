import Joi from 'joi';

/**
  * XLSX MimeType as base 64
  * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  */
export type B64XLSXFile = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${string}`;

export const b64XLSXFile = Joi
  .string()
  .example('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,eGxzeCBhcyBiYXM2NAo=')
  .dataUri({ paddingRequired: true })
  .pattern(/application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet;base64,[=/+a-zA-Z0-9]+/, {
    name: 'paddedNonUrlSafeBase64XLSXFileMimeType',
  });
