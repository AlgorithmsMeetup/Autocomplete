var PrefixTree = function(){
  this.children = {};
}

PrefixTree.prototype.addWord = function(word){
  if(word){
    var firstLetter = word[0];
    var remainder = word.slice(1);
    if(!this.children[firstLetter]){
      this.children[firstLetter] = new PrefixTree();
    }
    this.children[firstLetter].addWord(remainder);
  } else {
    this.children['end'] = '*'
  }

  return word;
}

PrefixTree.prototype.getWords = function(prefix){
  var words = [];
  var suffixes;
  if(prefix){
    var letter = prefix[0];
    if(this.children[letter]){
      suffixes = this.children[letter].getWords(prefix.slice(1));
      suffixes.forEach(function(suffix){
        words.push(letter + suffix);
      });
    }
  } else{
    for(var letter in this.children){
      if(letter === 'end'){
        words.push('');
      } else {
        suffixes = this.children[letter].getWords();
        suffixes.forEach(function(suffix){
          words.push(letter + suffix);
        });
      }
    }
  }

  return words;
}

PrefixTree.prototype.removeWord = function(word){
  if(word){
    if(word[0] in this.children){
      this.children[word[0]].removeWord(word.slice(1));
      if(Object.keys(this.children[word[0]].children).length === 0) {
        delete this.children[word[0]];
      }
    }
  } else {
    delete this.children['end'];
  }
}
