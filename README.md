###Autocomplete

Autocomplete is a feature that we’re all too familiar with.  But how does it actually work?  You can probably imagine an algorithm that will take the first few letters of a word, compare those with a list of known words, and generate a list of all words starting with the given letters.  This would work, but imagine we’re doing this for the entire english language-- that’s around 250 thousand words!  This would work, but ultimately be pretty slow.  So, how is it that our phones are so fast at autocompleting what we’re typing?  Although there is no way around comparing the input letters to all known words, there is a more efficient way to store the known words that will allow the retrieval of these words to be fast.  This data structure is called a prefix tree, or trie.

###Prefix Trees

A prefix tree (or [Trie](http://en.wikipedia.org/wiki/Trie)) is a tree structure where every point in the tree is a letter and contains a list of possible letters that can come immediately next.  This means that starting from the top of the tree, we can work our way down through the tree, constructing words as we go from the letter of each node.

Here’s a diagram:
```
      c
      |\
      a u
     /|  \
   r  t   t
  /|  |   |
 * r  *   *
   |
   o
   |
   t
   |
   *
```
Starting from the ‘c’ at the top of that tree, you can follow the path down to create words-- in this case: 'car', 'carrot', 'cat', and 'cut'.  Notice the ‘\*’ at the end of every word.  We must somehow mark the end of each word, otherwise we’ll never know when to stop!  Imagine if we didn’t mark the end of the word:  we could probably find that the tree contains 'carrot', but how would we know that 'car' is a valid word?

Alright, hopefully makes some sense now... But how do we actually add or retrieve words from it?  


####Recursion in Prefix Trees

One of the most important things to understand about a prefix tree is that it’s a [recursive structure](http://en.wikipedia.org/wiki/Recursive_data_type).  That means that every node within the tree is itself another prefix tree.  Once we understand this, it allows us to write fairly simple code to control the entire tree.  When adding a word, instead of accessing each node, its children, their children [... so on], we can count on each node taking care of itself if we use recursive methods.

####Word addition

To add a word, we’ll start by adding the first letter of the word to a list of possible starting letters.  For each of those possible letters, we’ll construct a prefix tree to represent it, which allows us to simply feed the remainder of the word (after the first letter) to the child prefix tree for that start letter.  At this point, we see that what remains of the problem of word addition is the same as what we started with-- we can just repeat the step we just took to add each of the following letters to the tree.

####Word retrieval

Retrieving words from a prefix tree uses an algorithm called a [depth first search](http://en.wikipedia.org/wiki/Depth-first_search).  This allows us to traverse every branch of the tree until it ends, then continue on to the subsequent branches.  As we traverse, we can keep a list of the letters that we pass by to help us construct a list of words contained in the tree.
