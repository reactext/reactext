# Reactext
Reactext allows for easy state management in applications using React's Context API. 

## Set up

1. Install from Chrome Store: Install [Reactext](https://chrome.google.com/webstore/detail/reactext/dhadgcdngabjfldgcpdmdldpmhfkmbpj) from the Chrome web store.

2. Make sure you've added [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) from the Chrome web store. 

## How to track Consumer / Provider relationships

<a href='https://libraries.io/npm/reactext-devtool' target="_blank"> TEST</a>

1. Install npm ['reactext-devtool'](https://libraries.io/npm/reactext-devtool){:target = "_blank"} into your application:
      npm install --save reactex-devtool

2. Next import Reactext into your React application before using React Context: 
      import Reactext from 'reactext-devtool'
      
3. Pass React variable into Reactext and call the function to initiate tracking:
      Reactext(React);
