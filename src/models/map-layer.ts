import Joi from 'joi';

const schema = Joi.object().keys({
  name: Joi.string().required().example('My map layer'),
  key: Joi.string().invalid('nodes').required().example('myLayer'),
  style: Joi.any().example({
    layers: [
      {
        id: 'pdok-layer',
        type: 'raster',
        source: 'pdok-source',
        paint: {},
      },
    ],
    sources: {
      'pdok-source': {
        type: 'raster',
        tiles: [
          'https://service.pdok.nl/hwh/luchtfotorgb/wms/v1_0?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=2017_ortho25',
        ],
        bounds: [
          3.1706551165717776,
          50.5788239246427,
          7.4887369433036834,
          53.637607600687694,
        ],
      },
    },
  }).description('If provided, the layer renders from an external source. See https://docs.mapbox.com/mapbox-gl-js/style-spec/ for the Mapbox Style Specification. Only the layers and sources keys are currently supported.'),
  namedStyle: Joi.string().example('pdok-bodemkaart').description('If provided, a style predefined by withthegrid is used. Style is ignored if it is also provided.'),
})
  .description('A vector or raster layer on the map.')
  .tag('mapLayer');

interface MapLayer {
  name: string;
  key: string;
  style?: any;
  namedStyle?: string;
}

export { schema, MapLayer };
