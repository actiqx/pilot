import { IStores } from './stores';

// import { IStores } from './stores';
// import { IRoute } from './route';
// export interface IRouter {
//   route_id?: IRoute[];
//   sequence: number;
//   store_id?: IStores[];
//   type: string;
// }
export interface IRouter {
  id: number;
  route_id: number;
  sequence: number;
  route_type_id: number;
  routename_id: number;
  site_id: number;
  store_id: number;
  store?: IStores[];
}
