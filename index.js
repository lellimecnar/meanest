import Path from 'path';
import {name, config} from 'load-pkg';
import {address} from 'ip';

import App from '~/config/app';

let server = App.listen(config.port, config.hostname || address(), () => {
		let addr = server.address();
		console.log(`Listening at http://${addr.address}:${addr.port}`);
	});
