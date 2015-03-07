A prototype CollectionSpace client application.

There are two parts:

1. A minimal server-side application to serve client resources, implemented as a Java servlet.
2. A client-side application (aka "the UI") written in JavaScript that runs in the browser.

# Server Installation

A CollectionSpace server must already be installed. One additional webapp, cspace, will be installed alongside the existing CollectionSpace webapps.

```
cd server
mvn clean install
```

# Client Installation

[Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/) are required for building and deploying the client code. Client resources are installed to the `cspace/ui` directory, within the CollectionSpace server's tomcat directory. The cspace servlet serves these resources to a browser, which runs the application.

```
cd client
npm run deploy:prod
```

# Accessing the Application

The prototype application consists of an editor for collectionobject records. Once installed, it may be accessed using Chrome or Firefox, at http://[hostname:port]/cspace/core/record/collectionobject. A live prototype is installed at http://qa.collectionspace.org:8180/cspace/core/record/collectionobject.