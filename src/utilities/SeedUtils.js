import context from "react-bootstrap/esm/AccordionContext";
import seedrandom from "seedrandom";

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
    let rng = seedrandom('hello');
    return rng();
}

export function choice(rng, choices) {
    let index = Math.floor(rng() * choices.length);
    return choices[index]
}

function getSeed(rng) {
    var pageSeed = rng().toString(36).slice(2)
    pageSeed = choice(rng, ["a-", "h-", "f-", "c-", "r-"])+pageSeed;
    return pageSeed;
}

function getPrefixForType(type) {
    switch(type) {
        case 'artifact':
            return 'a';
        case 'horror':
            return 'h';
        case 'fable':
            return 'f';
        case 'city':
            return 'c';
        case 'road':
            return 'r';
        default:
            break;    
    }
    return;
}

export function getSeedForContentType(rng, type) {
    var pageSeed = rng().toString(36).slice(2)
    pageSeed = getPrefixForType(type)+'-'+pageSeed;
    return pageSeed;
}

export function getPageSeedAndContext(seed) {
    let rng = seedrandom(seed);
    var pageSeed = getSeed(rng);
    for (let i = 0; i < 3; i++) {
        var contextSeed = getSeed(rng);
        pageSeed = pageSeed + '_' + contextSeed;
    }
    return pageSeed;
}

export function getPageSeed(seed) {
    let rng = seedrandom(seed);
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
    var link ='/#/page/' + getPageSeedAndContext(Date.now());
    return link;
}

export function getContextLink(contextSeed, contexts = []) {
    var link ='/page/' + contextSeed;
    
    var newContexts = contexts;
    
    let rng = seedrandom(contextSeed);

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
