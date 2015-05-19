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
        words.push('*');
      } else {
        suffixes = this.children[letter].getWords();
        suffixes.forEach(function(suffix){
          words.push(letter + suffix);
        });
      }
    }
  }

  words = words.map(function(word){
    return word.replace('*','');
  });
  return words;
}

PrefixTree.prototype.removeWord = function(word){
  if(word){
    if(word[0] in this.children){
      this.children[word[0]].removeWord(word.slice(1));
    }
  }

  if(!word || Object.keys(this.children).length === 1){
    delete this.children['end'];
  }

  return word;
}
