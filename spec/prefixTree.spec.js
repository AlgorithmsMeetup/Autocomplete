describe('The addWord method', function(){
  var prefixTree;

  beforeEach(function(){
    prefixTree = new PrefixTree();
  })

  it('should be able to add one letter words', function(){
    prefixTree.addWord('a');
    expect(prefixTree.children.a).to.not.be(undefined);
  });
  it('should be able to add two letter words', function(){
    prefixTree.addWord('be');
    expect(prefixTree.children.b).to.not.be(undefined);
    expect(prefixTree.children.b.children.e).to.not.be(undefined);
  });
  it('should be able to add three letter words', function(){
    prefixTree.addWord('sea');
    expect(prefixTree.children.s).to.not.be(undefined);
    expect(prefixTree.children.s.children.e).to.not.be(undefined);
    expect(prefixTree.children.s.children.e.children.a).to.not.be(undefined);
  });
  it('should be able to add words in succession', function(){
    prefixTree.addWord('cat');
    prefixTree.addWord('cart');
    expect(prefixTree.children.c).to.not.be(undefined);
    expect(prefixTree.children.c.children.a).to.not.be(undefined);
    expect(prefixTree.children.c.children.a.children.t).to.not.be(undefined);
    expect(prefixTree.children.c.children.a.children.r).to.not.be(undefined);
    expect(prefixTree.children.c.children.a.children.r.children.t).to.not.be(undefined);
  });
});

describe('The retrieveWords method', function(){
  var prefixTree;
  var testWords = ['cabbage', 'carrot', 'cart', 'cat', 'cut', 'java', 'javascript'];
  var testSets = {
    'ca': {'cat': true, 'cart': true, 'carrot': true, 'cabbage': true},
    'java': ['java', 'javascript'],
  }

  beforeEach(function(){
    prefixTree = new PrefixTree();
    testWords.forEach(function(word){
      prefixTree.addWord(word);
    });
  });

  it('should be able to retrieve all words from the prefix tree when no prefix is input', function(){
    var retrievedWords = prefixTree.getWords();
    retrievedWords.sort();
    var deepEquals = sinon.deepEqual(retrievedWords, testWords)
    expect(deepEquals).to.be(true);
  });
  it('should be able to retrieve all words that start with an input prefix', function(){
    var retrievedWords = prefixTree.getWords('ca');
    var words = {};
    retrievedWords.forEach(function(word){
      words[word] = true;
    });
    for(var word in testSets['ca']){
      expect(word in retrievedWords);
    }
  });
  it('should retrieve only words containing the given prefix', function(){
    var retrievedWords = prefixTree.getWords('ca');
    var words = {};
    retrievedWords.forEach(function(word){
      words[word] = true;
    });
    var deepEquals = sinon.deepEqual(words, testSets['ca']);
    expect(deepEquals).to.be(true);
  });
  it('should retrieve a word that is exactly the prefix', function(){
    var retrievedWord = prefixTree.getWords('javascript');
    expect(retrievedWord[0]).to.equal('javascript');
  });
  it('should not return any words when the input prefix is not found in the tree', function(){
    var retrievedWords = prefixTree.getWords('nothing');
    var deepEquals = sinon.deepEqual(retrievedWords, []);
    expect(deepEquals).to.be(true);
  });
  it('should retrieve words even when they are also a part of a longer word', function(){
    var retrievedWords = prefixTree.getWords('java');
    retrievedWords.sort();
    var deepEquals = sinon.deepEqual(retrievedWords, testSets['java']);
    expect(deepEquals).to.be(true);
  })
});

describe('The removeWord method', function(){
  var prefixTree;

  beforeEach(function(){
    prefixTree = new PrefixTree();
    prefixTree.addWord('car');
    prefixTree.addWord('cart');
    prefixTree.addWord('carton');
  });

  it('should remove the input word', function(){
    prefixTree.removeWord('carton');
    var retrievedWords = prefixTree.getWords('carton');
    expect(retrievedWords.length).to.be(0);
  });
  it('should not remove words other than the input word', function(){
    prefixTree.removeWord('car');
    var retrievedWords = prefixTree.getWords('car');
    var deepEqual = sinon.deepEqual(retrievedWords, ['cart', 'carton']);
    expect(deepEqual).to.be(true);
  });
  it('should not remove anything when the given word is not contained in the tree', function(){
    prefixTree.removeWord('dog');
    var retrievedWords = prefixTree.getWords();
    expect(retrievedWords.length).to.be(3);
  });
  it('should remove letters that are not contained in any word', function(){
    prefixTree.removeWord('carton');
    expect(prefixTree.children.c.children.a.children.r.children.t.children.o).to.be(undefined);
  });
});
