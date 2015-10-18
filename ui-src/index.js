import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';

import {bind, bootstrap} from 'angular2/angular2';
import {ROUTER_BINDINGS, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import App from './components/app/app';

bootstrap(App, [
	ROUTER_BINDINGS,
	bind(ROUTER_PRIMARY_COMPONENT).toValue(App)
]);
