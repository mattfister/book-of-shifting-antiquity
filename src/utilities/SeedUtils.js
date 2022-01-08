import seedrandom from "seedrandom";

export function getPageSeedFromPath() {
    return window.location.href.split('/')[6]
}

export function getRandom() {
    let rng = seedrandom('hello');
    return rng();
}

export function getPageSeed(seed) {
    let rng = seedrandom(seed);
    return rng().toString(36).slice(2)
}

export function getPageLink(seed) {
    return '/page/' + getPageSeed(seed);
}