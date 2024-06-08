## Email Engine

### Prerequisites

- Create a google-application and get the credentials associated with the application & pass the credentials into the docker-compose file.

```sh
 - CLIENT_ID=
 - CLIENT_SECRET=
```

- You need to install the docker & docker-compose in your system

### Run

- To run the application start docker-compose with the following command

```sh
docker-compose up
```

### Components

1. Client: React application to interact with the backend and database

- Login mechanism with oauth implementation
- List of user details

2. Server: NodeJS server mainly managed the oauth & elasticsearch db operations

- Oauth implementation for google as of now only
- Elasticsearch implementation
- IMAP implementation (not implemented yet)

## The below functionalities not implemented yet due to time restrictions. These below pointers are enhancement and missing functionality from existing systems

### What we can do more

- Complete the entire the functionality using IMAP or APIs for email engine.
- Implement a kind of factory-design interface to support the google-cloud & microsoft and other services.
- Implement the redux state management in client side to prevent unnecessary calls to backend and store all data at client side.
- Implement the search, query and update functionality with Elasticsearch.
