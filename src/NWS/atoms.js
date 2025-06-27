import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

import { isEmpty } from 'lodash';

const locationsValues = [
    {
        id: "vicky",
        name: "Vicky",
        category: "Summit",
        lat: 39.553,
        lon: -106.115,
    },
    {
        id: "golden",
        name: "Golden",
        category: "Cities",
        lat: 39.755,
        lon: -105.221,
    },
    {
        id: "lookout",
        name: "Lookout",
        category: "Front range",
        lat: 39.7448,
        lon: -105.241,
    },
    {
        "name": "Copper",
        "lat": 39.48,
        "lon": -106.115,
        category: "Summit",
        "id": "copper",
    },
    {
        "name": "Aspen",
        "lat": 39.1655,
        "lon": -106.8269,
        category: "Mountain",
        "id": "aspen",
    },
    {
        "name": "Sniktau",
        "lat": 39.679,
        "lon": -105.858,
        "id": "loveland-pass",
        category: "Summit",
    },
    {
        "name": "Wolcott",
        "lat": 39.7,
        "lon": -106.634,
        "id": "wolcott",
        category: "Vail",
    },
    {
        "name": "Buffalo",
        "lat": 39.617,
        "lon": -106.1427,
        "id": "buffalo",
        category: "Summit",
    },
    {
        "name": "JB",
        "lat": 40.029,
        "lon": -106.352,
        "id": "jb",
        category: "Kremmling",
    },
    {
        "name": "Ottos",
        "lat": 39.272,
        "lon": -108.998,
        "id": "ottos",
        category: "Desert",
    },
    {
        "name": "Peak6",
        "lat": 39.493,
        "lon": -106.111,
        "id": "peak6",
        category: "Summit",
    },
    {
        "name": "Duck",
        "lat": 39.585,
        "lon": -106.038,
        "id": "duck",
        category: "Summit",
    },
    {
        "name": "Indy",
        "lat": 39.582,
        "lon": -105.911,
        "id": "indy",
        category: "Summit",
    },
    {
        "name": "Ptarmigan",
        "lat": 39.69,
        "lon": -106.025,
        "id": "ptarmigan",
        category: "Summit",
    },
    {
        "name": "Boulder",
        "lat": 40.056,
        "lon": -105.3,
        "id": "boulder",
        category: "Front range",
    },
    {
        "name": "Ute",
        "lat": 39.786,
        "lon": -106.077,
        "id": "ute",
        category: "Summit",
    },
    {
        "name": "Williams",
        "lat": 39.915,
        "lon": -106.257,
        "id": "williams",
        category: "Kremmling",
    },
    {
        "name": "Carl's Corner",
        "lat": 39.979,
        "lon": -106.475,
        "id": "carls-corner",
        category: "Kremmling",
    },
    {
        "name": "Yarmony",
        "lat": 39.914,
        "lon": -106.641,
        "id": "yarmony",
        category: "Vail",
    },
    {
        "name": "Bellyache",
        "lat": 39.665,
        "lon": -106.659,
        "id": "bellyache",
        category: "Vail",
    },
    {
        "name": "Quandary",
        "id": "quandary",
        "lat": 39.3974,
        "lon": -106.105,
        category: "Summit",
    },
    {
        "name": "Morgan",
        "lat": 39.588,
        "lon": -105.845,
        "id": "morgan",
        category: "Summit",
    },
    {
        "name": "Boreas Pass",
        "id": "boreas",
        "lat": 39.414623,
        "lon": -105.952029,
        category: "Summit",
    },
    {
        "name": "North Side",
        "id": "northside",
        "lat": 40.47327,
        "lon": -111.891928,
        category: "Utah",
    },
    {
        "name": "South Side",
        "id": "southside",
        "lat": 40.456711,
        "lon": -111.902774,
        category: "Utah",
    },
    {
        "name": "Inspo",
        "id": "inspo",
        "lat": 40.3011,
        "lon": -111.6252,
        category: "Utah",
    },
    {
        "name": "Cherry",
        "id": "cherry",
        "lat": 40.5144,
        "lon": -111.8084,
        category: "Utah",
    },
    {
        "name": "Cove",
        "id": "cove",
        "lat": 38.637282,
        "lon": -112.07008,
        category: "Utah",
    },
    {
        "name": "Monroe Peak",
        "id": "monroe",
        "lat": 38.538278,
        "lon": -112.072888,
        category: "Utah",
    }
]


export const locationsAtom = atomWithStorage('locations', locationsValues);
export const locationAtom = atomWithStorage('location', {})

export const nwsDataAtom = atomWithStorage('nws-data', {})

export const recentVisitsAtom = atomWithStorage('nws-recent-locations', [])
export const nwsDataTimeAtom = atomWithStorage('nws-data-time', {})
export const nwsHorizontalExpandAtom = atomWithStorage('nws-horizontal-expand', false)
export const refreshAtom = atom(false)

