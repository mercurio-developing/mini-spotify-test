#SPOTIFY SEARCH

Small fully-responsive app to search tracks in Spotify and see what is currently playing on your Spotify account.

How it works: Enter into localhost:3000 redirects to login page, click the button, redirects to spotify login, after login you recieve a callback code, with this in the routes auth you generate a token with the scopes to make the subsequent requests. After this the token is encoded and saved in localstorage. 

Search component: enter a track, album, or artist, and the first 10 results are displayed. If no result is found a message appears. 

Can only be accessed with token.

Currently playing component: click the 'on now' button, the track that is currently playing on your spotify account is displayed. 

Can only be accessed with token.

I kept the UI simple, added some validations, covered some errors and security, and also made it responsive. 

I used React, Redux, Bootstrap, SASS, Node.js, Express, and the Spotify API. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to have a Spotify account to use this app as well as an app registerd with Spotify for Developers. 

Node.js 8^

Please create your own .env or fill ./config/config with your api account information

```

git clone  https://github.com/mercurio-developing/mini-spotify-test.git

cd mini-spotify-test

npm install && npm install --prefix client

npm run dev

```

## Running the tests

no tests impelemented 



## Built With

https://reactjs.org/
https://getbootstrap.com/docs/4.0/getting-started/introduction/
https://sass-lang.com

https://developer.spotify.com/documentation/web-api/
https://developer.spotify.com/documentation/web-api/reference/search/search/
https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
Spotify API library in node.js
https://github.com/thelinmichael/spotify-web-api-node
## Authors

* ALEJANDRO M FIDANZA

## License

This project is licensed under the MIT License 
