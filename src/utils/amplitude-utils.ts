import amplitude from './amplitudeInstance';
import { LogReturn } from 'amplitude-js';

const miljo = process.env.NODE_ENV ? 'p-' : 'dev-';
const defaultkey = '#tiltak-landingside-'.concat(miljo);

export const registrerBesokside = (): LogReturn => amplitude.logEvent(defaultkey.concat('besok'));

export const registrerMenyvalg = (key: string) => amplitude.logEvent(defaultkey.concat(key));
