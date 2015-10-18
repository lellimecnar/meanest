import Path from 'path';

var PATHS = {};

PATHS.ROOT = Path.resolve(__dirname, '../');
PATHS.API = Path.join(PATHS.ROOT, 'api');
PATHS.API_ROUTE = '/api';

PATHS.SRC = Path.join(PATHS.ROOT, 'ui-src');
PATHS.DEST = Path.join(PATHS.ROOT, 'pub');


export default PATHS;
