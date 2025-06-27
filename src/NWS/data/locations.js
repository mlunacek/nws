import _ from 'lodash'

import locations from './locations.json'

const groupList = [
    {
        "id": "summit",
        "name": "Summit",
        "ids": ["vicky", "copper", "peak6", "ptarmigan", "buffalo", "duck", "indy", "morgan", "loveland-pass"]
    },
    {
        "id": "vail",
        "name": "Vail",
        "ids": ["wolcott", "bellyache", "yarmony"]
    },
    {
        "id": "kremmling",
        "name": "Kremmling",
        "ids": ["jb", "williams", "carls-corner", "ute"]
    },
    {
        "id": "front-range",
        "name": "Front Range",
        "ids": ["boulder", "lookout"]
    },
    {
        "id": "highpeaks",
        "name": "High Peaks",
        "ids": ["quandary", "boreas", "aspen"]
    },
    {
        "id": "desert",
        "name": "Desert",
        "ids": ["ottos"]
    },
    {
        "id": "utah",
        "name": "Utah",
        "ids": ["northside", "southside", "monroe", "cove", "inspo", "cherry"]
    }
]

const groups = {}
groupList.forEach(d => groups[d.id] = d);

const locationsLookup = {};
locations.forEach(d => locationsLookup[d.id] = d);

export { locations, locationsLookup, groups }