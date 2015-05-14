var Trie = function(){
  this.letter = '';
  this.nextLetters = {};
};

Trie.prototype.addWord = function(word) {
  if(word){
    if(!this.nextLetters[word[0]]){
      var newTrie = new Trie();
      newTrie.letter = word[0];
      this.nextLetters[word[0]] = newTrie;
    }
    this.nextLetters[word[0]].addWord(word.slice(1));
  } else {
    this.nextLetters['end'] = '\n';
  }
};

Trie.prototype.retrieveWords = function(partialWord) {
  // if(partialWord){
  //   this.nextLetters[partialWord[0]].retrieveWords(partialWord.slice(1));
  // }
  // var arrayOfSuffixes = [];
  // console.log( 'this.letter',this.letter);
  // return this.letter + this.nextLetters[Object.keys(this.nextLetters)[0].retrieveWords()];

  // for(var letter in this.nextLetters){
  //   console
  //   // return this.letter + this.nextLetters[letter] === 'end' ? '$' : this.nextLetters[letter].retrieveWords();
  //     // console.log('result',result,'thisLetter',this.letter,'arrayOfSuffixes',arrayOfSuffixes);
  //     // arrayOfSuffixes.concat(result);
  // }
  // console.log(arrayOfSuffixes);

  // for(var i = 0; i < arrayOfSuffixes.length; i++){
  //   arrayOfSuffixes[i] = this.letter + arrayOfSuffixes[i];
  // }

  // var b = arrayOfSuffixes.map(function(suffix){ return this.letter+suffix; }, this);
  // console.log(b);
  // return arrayOfSuffixes
};

var x = new Trie();
x.addWord('cat');
// x.addWord('cut');
// x.addWord('car');
// x.addWord('carrot');
console.log('x',x);
console.log('retrieveWords',x.retrieveWords());
