[![Netlify Status](https://api.netlify.com/api/v1/badges/7ed1eeac-ab32-48f7-aaf6-44b87f57cecf/deploy-status)](https://app.netlify.com/sites/dalhousie-sight-words/deploys)
# Sight Words Flashcards

## Introduction

I built this website to help my daughter learn her 'sight words'. These are words that she should know immediately, without having to sound out or anything like that.

## Explanation

There are two types of cards: audio -> text and text -> audio. For the text, they should read it, and for the audio they should write it down. I found that a flip notebook works best for this in case they encounter the same word more than once in the same session. They can play the audio as many times as they want.

The next card is selected based on [Thompson sampling](https://en.wikipedia.org/wiki/Thompson_sampling). If you are curious, you can check the `Results` page to see the distribution of the probability of getting each card correct.

The data is stored in the browser's local storage, and so will persist when you close the browser. However, it does mean that at the moment only one person's activity can be tracked per computer (/ browser). It also means that clearing local storage will remove all data.

If you have any improvements or suggestions, feel free to create an issue!
