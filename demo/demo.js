trie = new PrefixTree();

var addWord = function(word){
  trie.addWord(word);
  updateWordList('contained')
}

var getWords = function(prefix){
  updateWordList('retrieved', prefix)
}

var updateWordList = function(type, prefix){
  words = trie.getWords(prefix);
  var ul = document.getElementsByClassName(type)[0];
  ul.innerHTML = '';
  list = ''
  words.forEach(function(word){
    var li = document.createElement('li');
    li.innerText = word;
    ul.appendChild(li);
  });
}
