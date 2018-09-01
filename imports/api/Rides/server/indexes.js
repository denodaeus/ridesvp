import createIndex from '../../../modules/server/create-index';
import Rides from '../Rides';

createIndex(Rides, { owner: 1 });
