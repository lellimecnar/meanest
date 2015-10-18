import {name} from 'load-pkg';
import {snakeCase} from 'change-case';
import Mongoose from 'mongoose';

Mongoose.connect('mongodb://localhost:27017/' + snakeCase(name));

export default Mongoose.connection;
