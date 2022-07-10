import { HttpHeaders } from "@angular/common/http";
import * as moment from "moment";

import { IList } from "../types/user";

export const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const DEFAULT_LIST_PARAM: IList = {
  sort: '',
  order: '',
  page: 1,
  perPage: 10,
  search: '',
};

export const PREFIX_ROUTE = 'admin';

export const isEmptyValue = (value: any, condition: any) => 
  [undefined, null, ''].includes(value) ? condition : value;

export const formatUTCToLocal = (date: Date) => {
  return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');
};