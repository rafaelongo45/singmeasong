# :clipboard: Description
 ***This is a project that implements e2e, integration and unit tests!*** 

<hr style="border:2px solid gray">

# :rocket: Routes
```
POST /recommendations
    - Route to add a new recommendation
    - headers: {}
    - body:{
        "name": "Falamanssa - Xote dos Milagssres",
	      "youtubeLink": "https://www.youtube.com/watch?v=chwyjJbcs1Y"
} 
```

```
POST /recommendations/:recommendationId/upvote
    - Route to upvote a recommendation
    - headers: {}
    - body:{} 
```

```
POST /recommendations/:recommendationId/downvote
    - Route to downvote a recommendation
    - headers: {}
    - body:{} 
```

```
GET /recommendations
    - Route to get last 10 recommendations
    - headers: {}
    - body:{} 
```

```
GET /recommendations/:recommendationId
    - Route to get a recommendation by id
    - headers: {}
    - body:{} 
```

```
GET /recommendations/random
    - Route to get a random recommendation
    - headers: {}
    - body:{} 
```
```
GET /recommendations/top/:amount
    - Route to get the top "amount" of recommendations
    - headers: {}
    - body:{} 
```
