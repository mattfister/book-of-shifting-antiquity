import tracery from '../utilities/tracery'
import { alea } from 'seedrandom';


export function generateIcon(page) {

    tracery.setRandom(new alea(page));

    var grammar = tracery.createGrammar({
        "zeroone" : ["","1"],
        "smallDigit" : ["1","2","3","4","5"],
        "smallNegDigit" : ["-1","-2","-0","0","1","2","3","4"],
        "largeNegDigit" : ["-1","-2","-3","-4","-0","0","1","2"],
        "midDigit" : ["3","4","5","6"],
        "largeDigit" : ["5","6","7","8","9"],
        "digit" : ["1","2","3","4","5","1","2","3","4","5","6","7","8","9","0"],
        "num" : ["#smallDigit##digit#"],
        "num2" : ["#digit##digit#"],
        "num3" : ["#midDigit##digit#"],
        "r255Start" : ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"],
        "r255" : ["#r255Start##digit#"],
        "svgColor" : ["hsl(#r255#, #largeDigit##digit#%, #largeDigit##digit#%)"],
        "darkColor" : ["hsl(#r255#, #smallDigit##digit#%, #digit##digit#%)"],
        "svgStyle" : ["fill=\"url(\\##gradID#)\" fill-opacity=\"0.7\""],
        "bg" : ["<rect fill='#darkColor#'  x='0' y='0' width='300' height='300'/>#circleField#", "<rect fill='#darkColor#'  x='0' y='0' width='300' height='300'/>#lineField#", "<rect fill='#darkColor#'  x='0' y='0' width='300' height='300'/>#lineField##circleField#"],
        "line" : ["<line x1='#r255#' y1='#r255#' x2='#r255#' y2='#r255#' stroke='#svgColor#' stroke-width='#smallDigit#' />"],
        "circle" : ["<circle fill='#svgColor#' fill-opacity='0.4' cx='#r255#' cy='#r255#' r='#digit##digit#.#digit#'/>"],
        "circleField" : ["#circle#", "#circle#",  "#circle#circle#", "#circle#circle#circle#"],
        "lineField" : ["#line#", "#line#line#", "#line##line##line#"],
        "svgImg" : ["<svg viewBox=\"0 0 18rem 18rem\" width=\"18rem\" height=\"18rem\" style=\"border-radius: 45%\">#bg#</svg>"],
        "origin" : "{svg #svgImg#}"
    });

    grammar.addModifiers(tracery.baseEngModifiers);
    
    let content = grammar.flatten("#svgImg#");
    
    return content;
}