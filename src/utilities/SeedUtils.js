import seedrandom from "seedrandom";

export function getPageSeedFromPath() {
    return window.location.href.split('/').pop();
}

export function getRandom() {
    let rng = seedrandom('hello');
    return rng();
}

export function choice(rng, choices) {
    let index = Math.floor(rng() * choices.length);
    return choices[index]
}

export function getPageSeed(seed) {
    let rng = seedrandom(seed);
    var pageSeed = rng().toString(36).slice(2)
    pageSeed = choice(rng, ["a-", "h-"])+pageSeed;
    return pageSeed;
}

export function getPageLink(seed) {
    return '/page/' + getPageSeed(seed);
}