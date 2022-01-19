import { alea }  from "seedrandom";

export const CONTENT_TYPES = ["artifact", "horror", "fable", "city", "road", "plant", "region"]

export function getPageSeedFromPath() {
    return window.location.href.split('/').pop().split('_')[0];
}

export function getContextSeedsFromPath() {
    return window.location.href.split('/').pop().split('_').slice(1);
}

export function getPageSeedFromPageString(seedString) {
    return seedString.split('/').pop().split('_')[0];
}

export function getContextSeedsFromSeedString(seedString) {
    return seedString.split('/').pop().split('_').slice(1);
}

export function getRandom() {
    let rng = alea('hello');
    return rng();
}

export function choice(rng, choices) {
    let index = Math.floor(rng() * choices.length);
    return choices[index]
}

function getSeed(rng) {
    var pageSeed = rng().toString(36).slice(2)
    pageSeed = choice(rng, CONTENT_TYPES)+'-'+pageSeed;
    return pageSeed;
}

function getPrefixForType(type) {
    return type;
}

export function getSeedForContentType(rng, type) {
    var pageSeed = rng().toString(36).slice(2)
    pageSeed = getPrefixForType(type)+'-'+pageSeed;
    return pageSeed;
}

export function getPageSeedAndContext(seed) {
    let rng = alea(seed);
    var pageSeed = getSeed(rng);
    for (let i = 0; i < 3; i++) {
        var contextSeed = getSeed(rng);
        pageSeed = pageSeed + '_' + contextSeed;
    }
    return pageSeed;
}

export function getPageSeedAndContextForType(seed, type) {
    let rng = alea(seed);
    var pageSeed = getSeedForContentType(rng, type);
    for (let i = 0; i < 3; i++) {
        var contextSeed = getSeed(rng);
        pageSeed = pageSeed + '_' + contextSeed;
    }
    return pageSeed;
}

export function getPageSeed(seed) {
    let rng = alea(seed);
    return getSeed(rng);
}

export function getPageLink(seed, contexts = []) {
    var link ='/page/' + getPageSeedAndContext(seed);
    contexts.forEach(context => {
        link += '_' + context;
    });
    return link;
}

export function getRandomPageLink() {
    var link ='/book-of-shifting-antiquity/#/page/' + getPageSeedAndContext(Date.now());
    return link;
}

export function getRandomPageLinkForType(type) {
    console.log('get random for type ' + type)
    var link ='/book-of-shifting-antiquity/#/page/' + getPageSeedAndContextForType(Date.now(), type);
    return link;
}

export function getContextLink(contextSeed, contexts = []) {
    var link ='/page/' + contextSeed;
    
    var newContexts = contexts;
    
    let rng = alea(contextSeed);

    var contextsLength = newContexts.length;
    while (contextsLength < 3) {
        var contextSeed = getSeed(rng);
        newContexts.push(contextSeed);
        contextsLength = newContexts.length;
    }

    newContexts.forEach(context => {
        link += '_' + context;
    });

    return link;
}
