// Enum dinamic
//


// requirements
if (typeof window === 'undefined') {
  p = require ('./prelude');
  logfn = p.logfn;
  log = p.log;
  var Enum = require('./enum').Enum;
  var Enumlinear = require('./enumlinear').Enumlinear;
  var Enumcycle = require('./enumcycle').Enumcycle;
}



function Enumdinamic (array, initializer, callback) {
  this.enumclass = new Enum (array);
  this.array = this.enumclass.array;
  this.initializer = initializer;
  this.callback = callback || function (x) { };
  callback = callback || function (x) { };
  var self = this;
  this.enumlinear = new Enumlinear
                  ( array
                  , initializer
                  , (function (f) {
                      return function (value, self) {
                        logfn ('this.enumlinear callback');
                        log ('value: ' + value);
                        self.index = self.enumlinear.index;
                        self.value = value;
                        self.history = self.history.concat (self.value);
                        self.array = self.enumlinear.array;
                        self.enumclass = self.enumlinear.enumclass;
                        f (self.value);
                      };
                  } (callback)), this);
  this.repeat = new Enumcycle ( ['false', 'true', 'one'], 'false'
              , function (repeat) {
                console.log ('repeat:' + repeat);
              });
  this.shuffle = new Enumcycle ( ['false', 'true']
               , 'false'
               , function (shuffle) {
                console.log ('shuffle:' + shuffle);
                if (!self.orderedarray) {
                  self.orderedarray = self.array || self.enumlinear.array || self.enumlinear.enumclass.array || [];
                }
                switch (shuffle) {
                  case 'true':
                    var arr = [self.value].concat (self.orderedarray.shuffle ().drop (self.value));
                    self.changeArray (arr);
                    break;
                  default:
                    self.changeArray (self.orderedarray);
                    delete self.orderedarray;
                    break;
                }
               }, this);
  this.repeat.init ();
  this.shuffle.init ();
  this.enumlinear.init ();
  for (var x in this.enumlinear) {
    if (this.enumlinear.hasOwnProperty (x)) {
      this[x] = this.enumlinear[x]; 
    }
  }
}

Enumdinamic.prototype = new Enumlinear ();
Enumdinamic.prototype.at = function (index) {
logfn ('Enumdinamic.prototype.at');
  if (this.nonvalidIndex (index)) {
    index = this.index;
  }
  return this.enumlinear.at (index);
};
Enumdinamic.prototype.next = function (j) {
logfn ('Enumdinamic.prototype.next');
  // console.log ('Enumdinamic next:' + this.index);
  // console.log ('Enumdinamic next:' + this.array);
  /*! when goes out of the array:
   *                |                               repeat                            |
   *                |   false                        |   true     |    one            |
   * ---------------+--------------------------------+------------+-------------------+
   *         false  | undefined                      |     %      | always same index |
   * shuffle -------+--------------------------------+------------+-------------------+
   *          true  | shuffle array again, undefined | shuffle, % | always same index |
   * ---------------+--------------------------------+------------+-------------------+
   */
  if (j === undefined || isNaN (j)) {
    j = 1;
  }
  var index = this.index === undefined ? 0 : (this.index + j);
  switch (this.repeat.value) {
    case 'one': index = this.index; break;
    case 'true':
      var value = this.enumclass.toEnum (index);
      if (value === undefined) {
        switch (this.shuffle.value) {
          case 'true':
            this.shuffleOn ();
            index++;
          default:
            var length = this.array.length;
            index = ((index % length) + length) % length;
        }
      }
      break;
    default:
      var value = this.enumclass.toEnum (index);
      if (value === undefined) {
        switch (this.shuffle.value) {
          case 'true':
            this.shuffleOn ();
            index++;
            var length = this.array.length;
            index = ((index % length) + length) % length;
          default:
            return undefined;
        }
      }
  }
  this.at (index);
  return this.value;
};
Enumdinamic.prototype.concat = function (arr) {
logfn ('Enumdinamic.prototype.concat');
  var basearray = this.array || [];
  return this.changeArray (basearray.concat (arr));
};
Enumdinamic.prototype.changeArray = function (array) {
logfn ('Enumdinamic.prototype.changeArray');
log (this.value);
  this.enumlinear.changeArray (array);
  this.array = this.enumlinear.array;
log ("this.array: " + this.array.join (','));
log ("this.value: " + this.value);
  this.enumclass = this.enumlinear.enumclass;
  this.atfromEnum (this.value);
  for (var x in this.enumlinear) {
    if (this.enumlinear.hasOwnProperty (x)) {
      this[x] = this.enumlinear[x]; 
    }
  }
  return this;
};

Enumdinamic.prototype.setRepeat = function (repeat) { this.repeat.atfromEnum (repeat); };
Enumdinamic.prototype.repeatOff = function (repeat) { this.repeat.atfromEnum ('false'); };
Enumdinamic.prototype.repeatOn = function (repeat) { this.repeat.atfromEnum ('true'); };
Enumdinamic.prototype.repeatOne = function (repeat) { this.repeat.atfromEnum ('one'); };
Enumdinamic.prototype.repeatToggle = function (repeat) { this.repeat.next (); };
Enumdinamic.prototype.repeatToggleOnOff = function (repeat) { this.repeat.atfromEnum (this.repeat.value === 'false' ? 'true' : 'false'); };

Enumdinamic.prototype.setShuffle = function (shuffle) { this.shuffle.atfromEnum (shuffle); };
Enumdinamic.prototype.shuffleOff = function (shuffle) { this.shuffle.atfromEnum ('false'); };
Enumdinamic.prototype.shuffleOn = function (shuffle) { this.shuffle.atfromEnum ('true'); };
Enumdinamic.prototype.shuffleToggle = function (shuffle) { this.shuffle.next (); };
Enumdinamic.prototype.shuffleToggleOnOff = function (shuffle) { this.shuffle.atfromEnum (this.shuffle.value === 'false' ? 'true' : 'false'); };






// export Enumdinamic
this.Enumdinamic = Enumdinamic;




var x = new Enumdinamic ([]);
x.repeatOn ();
x.shuffleOn ();
x.concat ([1]);
console.log(x.next ());
console.log(x.next ());
console.log(x.next ());
console.log(x.next ());
console.log(x.next ());
console.log(x.next ());
console.log(x.next ());
console.log(x.next ());
x.concat ([2]);
console.log(x.next ());
console.log(x.next ());
console.log(x.next ());
console.log(x.next ());
console.log(x.next ());
console.log(x.next ());
