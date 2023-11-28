import { HttpHeaders } from '@angular/common/http';

export const corsHeaders = new HttpHeaders({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  Accept: 'application/json',
  withCredentials: 'true',
});
