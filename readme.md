# Twitter Backend

Simple overview of use/purpose.

## Description

An in-depth paragraph about your project and overview of use.

## Getting Started

### Dependencies

* Describe any prerequisites, libraries, OS version, etc., needed before installing program.
* ex. Windows 10

### Installing
* Installing dependencies : 
```yarn install```
* Start the server in:
    > Dev Mode  
    ```yarn run dev```

    > Production Mode  
    ```yarn start```

### Executing program

* How to run the program
* Step-by-step bullets
```
code blocks for commands
```

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Contributors names and contact info

ex. Dominique Pizzie  
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)

Custom validator message syntax
https://mongoosejs.com/docs/validation.html#custom-error-messages

## References:  

### JWT  
- https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
- https://www.simplilearn.com/tutorials/nodejs-tutorial/jwt-in-express-js
- https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6

### Validation  
- https://auth0.com/blog/express-validator-tutorial/
- https://as510891328.medium.com/the-validator-in-express-js-and-error-handling-36809e10c7ec

### Mongoose Schema  
- ChatGPT
- 

### Postman  
- [Set JWT Header as Variable](https://stackoverflow.com/questions/42372488/saving-a-postman-header-value-into-a-variable-throughout-requests-in-a-collectio)
- [Automatically set JWT Header received in response as Authorization for subsequent requests](https://community.postman.com/t/how-to-automatically-set-new-tokens-value-as-a-dynamic-variable-and-use-this-variable-in-my-collection-of-requests/19163/4)
- https://www.softwaretestingmaterial.com/how-to-send-jwt-token-as-header/

### git  
#### Merge Conflicts  
- [using GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github)
- https://www.datacamp.com/tutorial/how-to-resolve-merge-conflicts-in-git-tutorial#commands-for-resolving-git-merge-conflicts


↓ MOVE TO DIFFERENT FILE ↓
## Insights regarding routes:
> a single route could only handle 5 types of requests (i.e GET, POST, PUT, PATCH, DELETE) ==> express cannot differentiate between requests of same type (eg. POST) meant for different purposes
	eg. URL: `api/route/login`
		we are making both login and signup POST requests to this url
			How do we know which one is meant for Login or which is Signup?
				a clever approach could be to compare the length of JSON object passed in body
				for login: No. of fields == 2
				for signup: No. of fields > 2
			BUT IS THIS VIABLE IN LONG TERM??
				Nope.
				we can't always manage to spin up some login to differentiate between two POST request to same url
					=> Use different URL for different Contexts
						eg. using `api/login` & 'api/signup' as two different routes

> in a URL there are 3 Components
	Type:				URL's:							Part:
	constant part :		`api/users/`, `api/tweets/`		[api/users/, api/tweets/]
	variable part : 	`api/:id`						[:id]
	query part 	  :		`api/user?name=Harsh`			[?name=Harsh]

> Suppose the following routes are already in place:
		Route:					Type of requests:
		`api/signup`			POST
		`api/login`				POST
		`api/tweets`			GET (Read all tweets), POST (Create single new tweet)
		`api/tweets/:id`		GET, PATCH, DELETE	(Read, Update, Detele a specific tweet)
	We need to find(GET) all tweets by a single user. What are possible routes you can make?
        