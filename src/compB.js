/* 
    This import has a "wrong" order. the loader should fix it but it breaks with an error 
*/
import './compB.css';
import { CompA } from './compA';

export function CompB() {
  return `<div class="compB">CompB ${CompA()}<div>`;
}
