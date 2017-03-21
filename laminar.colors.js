/**
 * @author Travis Colbert trav.colbert@gmail.com
 */

"use strict";

var Laminar = Laminar || {};


/* General Idea: An object that simulates a typing effect.
 * In the constructor give:
 * - the element that will contain the typed text
 * - the text to type
 * - the time between typed keys
 * ... maybe other stuff like frequency of errors (mistypes)
 */

Laminar.Colors = (function() {
  function Colors() {
    this.saturationConstant = "25%";
    this.hueConstant = 360;
    this.phi = 1.618;
    this.phiInverse = 0.6180340;

    this.v0 = 100 * this.phiInverse;
    this.v1 = this.v0 * this.phiInverse;
    this.v2 = this.v1 * this.phiInverse;
    this.v3 = 100 * this.phi;

  }
  Colors.prototype.calcColorsFromPrimary = function (val) {
    var that = this;
    var colors = [];
    var percentageCalc = function(val) {
      if(val>100) val=100;
      colors[0] = that.hueConstant * (val/100);
      colors[1] = colors[0] * that.phiInverse;
      colors[2] = colors[1] * that.phiInverse;
      return colors;
    }
    var rotateVal = function(val,modifier,counterclockwise) {
      var v;
      if(counterclockwise) {
        if(modifier>val) {
          v = that.hueConstant-Math.abs(modifier-val);
        } else {
          v = val-modifier;
        }
      } else {
        v = val+modifier;
        if(v>360) v = v-360;
      }
      return v;
    }
    var circularCalc = function(val) {
      colors.push(val*that.hueConstant);
      colors.push(rotateVal(colors[0],that.v0,true));
      colors.push(rotateVal(colors[1],that.v1,true));
      colors.push(rotateVal(colors[2],that.v2,false));
      colors.push(rotateVal(colors[0],that.v3,true));
      return colors;
    }
    // return percentageCalc(val);
    return circularCalc(val);
  }
  Colors.prototype.generateGradient = function(color1,color2,saturation,lightness) {
      color1 = Math.floor(color1);
      color2 = Math.floor(color2);
      var browserPrefixes = [
        "-webkit-linear-gradient",
        "-moz-linear-gradient",
        "-o-linear-gradient"
      ];
      var returnString = "";
      var saturation = saturation || "50%";
      var lightness = lightness || "50%";
      /*
      for(var c=0;c<browserPrefixes.length;c++) {
        returnString += browserPrefixes[c] + "(right, hsl(" + color1 + "," + saturation + "," + lightness + "), hsl(" + color2 + "," + saturation + "," + lightness + ")); \n";
      }
      */
      returnString += "linear-gradient(to right, hsl(" + color1 + "," + saturation + "," + lightness + "), hsl(" + color2 + "," + saturation + "," + lightness + "))";
      return returnString;
    }
  return Colors;
})();