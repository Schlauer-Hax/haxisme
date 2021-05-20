import { WebGen } from '@lucsoft/webgen';
import { renderCards } from './components/cards';
import { renderFooter } from './components/footer';
import { renderNavigation } from './components/navigation';
import { renderOpener } from './components/opener';
import { renderDevices } from './components/devices';
import { renderActivites } from './components/activities';
import { startConnection } from './data/init';

const web = WebGen();

web.render.toBody({ maxWidth: '80rem' }, {}, () => [
    renderNavigation(),
    renderOpener(),
    renderCards(),
    renderActivites(),
    renderDevices(),
    renderFooter()
])
startConnection();