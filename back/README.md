## Node version: 20.4.0

## .env file:
There's a .env.example file in the root directory with the variables needed to run the app.

`REACT_PUBLIC_TMDB_KEY = ''`

API key from TMDB (The Movie DataBase) API. You can get and account and the key here: https://developer.themoviedb.org/docs


`MONGO_URI='mongodb+srv://[YOUR-MONGODB-URI]'`

Implemented MongoDB Atlas.


`TOKEN_SECRET='[YOUR-TOKEN-SECRET-HEX-16-STRING]'`

It's used to sign the JWT tokens. I used a random hex string here running this command in a terminal: 
`openssl rand -hex 16`


#API

## Users + users list
### POST /auth/login (Login)
    ```
    //Payload
    {
        email: 'USER-EMAIL',
        password: 'USER-PASSWORD',
    }
	```

### POST /auth/logout (Logout)

### POST /auth/signup (Register user)

### GET /auth/verifyuser (Verify user)

### PUT /list (put new item in the list)
```
	{
		api: '',
		api_id: '',
		extra_info: { data: null },
		image: '',
		title: '',
		type: '',
		overview: '',
	}
```

### GET /list


## TMDB (The Movie Database API) custom endpoints

### GET /TMDB/trendingmovies (Get trending movies)

### GET /TMDB/trendingtv (Get trending TV shows)

### GET /TMDB/movie (Get Movie details)

### GET /TMDB/show (Get TV show details)

### GET /TMDB/searchmovie (Search movie)

### GET /TMDB/searchtv (Search TV show)
