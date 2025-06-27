import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

import { isEmpty } from 'lodash';

const locationsValues = [
    {
        id: "vicky",
        name: "Vicky",
        lat: 39.553,
        lon: -106.115,
    },
    {
        id: "golden",
        name: "Golden",
        lat: 39.755,
        lon: -105.221,
    },
    {
        id: "lookout",
        name: "Lookout",
        lat: 39.7448,
        lon: -105.241,
    },
    {
        "name": "Copper",
        "lat": 39.48,
        "lon": -106.115,
        "id": "copper",
    },
    {
        "name": "Aspen",
        "lat": 39.1655,
        "lon": -106.8269,
        "id": "aspen",
    },
    {
        "name": "Sniktau",
        "lat": 39.679,
        "lon": -105.858,
        "id": "loveland-pass",
    },
    {
        "name": "Wolcott",
        "lat": 39.7,
        "lon": -106.634,
        "id": "wolcott",
    },
    {
        "name": "Buffalo",
        "lat": 39.617,
        "lon": -106.1427,
        "id": "buffalo",
    },
    {
        "name": "JB",
        "lat": 40.029,
        "lon": -106.352,
        "id": "jb",
    },
    {
        "name": "Ottos",
        "lat": 39.272,
        "lon": -108.998,
        "id": "ottos",
    },
    {
        "name": "Peak6",
        "lat": 39.493,
        "lon": -106.111,
        "id": "peak6",
    },
    {
        "name": "Duck",
        "lat": 39.585,
        "lon": -106.038,
        "id": "duck",
    },
    {
        "name": "Indy",
        "lat": 39.582,
        "lon": -105.911,
        "id": "indy",
    },
    {
        "name": "Ptarmigan",
        "lat": 39.69,
        "lon": -106.025,
        "id": "ptarmigan",
    },
    {
        "name": "Boulder",
        "lat": 40.056,
        "lon": -105.3,
        "id": "boulder",
    },
    {
        "name": "Ute",
        "lat": 39.786,
        "lon": -106.077,
        "id": "ute",
    },
    {
        "name": "Williams",
        "lat": 39.915,
        "lon": -106.257,
        "id": "williams",
    },
    {
        "name": "Carl's Corner",
        "lat": 39.979,
        "lon": -106.475,
        "id": "carls-corner",
    },
    {
        "name": "Yarmony",
        "lat": 39.914,
        "lon": -106.641,
        "id": "yarmony",
    },
    {
        "name": "Bellyache",
        "lat": 39.665,
        "lon": -106.659,
        "id": "bellyache",
    },
    {
        "name": "Quandary",
        "id": "quandary",
        "lat": 39.3974,
        "lon": -106.105,
    },
    {
        "name": "Morgan",
        "lat": 39.588,
        "lon": -105.845,
        "id": "morgan",
    },
    {
        "name": "Boreas Pass",
        "id": "boreas",
        "lat": 39.414623,
        "lon": -105.952029,
    },
    {
        "name": "North Side",
        "id": "northside",
        "lat": 40.47327,
        "lon": -111.891928,
    },
    {
        "name": "South Side",
        "id": "southside",
        "lat": 40.456711,
        "lon": -111.902774,
    },
    {
        "name": "Inspo",
        "id": "inspo",
        "lat": 40.3011,
        "lon": -111.6252,
    },
    {
        "name": "Cherry",
        "id": "cherry",
        "lat": 40.5144,
        "lon": -111.8084,
    },
    {
        "name": "Cove",
        "id": "cove",
        "lat": 38.637282,
        "lon": -112.07008,
    },
    {
        "name": "Monroe Peak",
        "id": "monroe",
        "lat": 38.538278,
        "lon": -112.072888,
    }
]


export const locationsAtom = atomWithStorage('locations', locationsValues);
export const locationAtom = atomWithStorage('location', {})

export const nwsDataAtom = atomWithStorage('nws-data', {})

export const recentVisitsAtom = atomWithStorage('nws-recent-locations', [])
export const nwsDataTimeAtom = atomWithStorage('nws-data-time', {})
export const nwsHorizontalExpandAtom = atomWithStorage('nws-horizontal-expand', false)
export const refreshAtom = atom(false)

