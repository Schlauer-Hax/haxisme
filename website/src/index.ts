import {View, WebGen} from '@lucsoft/webgen';
import {renderCards} from './components/cards';
import {renderFooter} from './components/footer';
import {renderNavigation} from './components/navigation';
import {renderOpener} from './components/opener';
import {renderDevices} from './components/devices';
import {renderActivites} from './components/activities';
import { renderSocialmedia } from './components/socialmedia';
import {startConnection} from './data/init';
import { renderAudio } from './components/audio';

WebGen();


View(({draw}) => {
    draw(renderNavigation())
    draw(renderOpener())
    draw(renderSocialmedia())
    draw(renderCards())
    draw(renderActivites())
    draw(renderDevices())
    draw(renderAudio())
    draw(renderFooter())
})
    .setMaxWidth('80rem')
    .appendOn(document.body)
startConnection();