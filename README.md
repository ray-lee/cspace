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

[Node.js](http://nodejs.org/) and [grunt](http://gruntjs.com/) are required for building and deploying the client code. Client resources are installed to the `cspace/ui` directory, within the CollectionSpace server's tomcat directory. The cspace servlet serves these resources to a browser, which runs the application.

To build and deploy in development:

```
cd client
grunt
```

For production, use the prod flag:
```
grunt --prod
```

To build only, use the build target. 

```
grunt build
```

To build/deploy specific tenants only, use the tenant option:

```
grunt --tenant=core,lifesci
```


# Accessing the Application

The prototype application consists of an editor for collection object records. Once installed, it may be accessed using Chrome or Firefox, at http://[hostname:port]/cspace/core/record/collectionobject. A live prototype is installed at http://173.255.228.202:8180/cspace/core/record/collectionobject.