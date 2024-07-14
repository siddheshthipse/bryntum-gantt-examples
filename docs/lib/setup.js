import * as Bundle from '../../build/gantt.module.js';
import '../data/docs_gantt.js';
import '../data/navigation.js';

window.product = 'gantt';
window.productName = 'Gantt';
window.bryntum.silenceBundleException = true;

for (const clsName in Bundle) {
    window[clsName] = Bundle[clsName];
}
