# Cheese MVC React SPA Walkthrough

Walkthrough for a Cheese MVC React SPA + REST API build.

## Walkthrough Order
- [`intro.md`](./0-intro.md): introduction, reference, and background
  - Cheese REST API reference
  - background on SPAs, AJAX, and Web APIs
- [`config.md`](./1-config.md): base configuration of the project
  - topics
    - Create React App
    - installing dependencies
    - React Router configuration
  - components
    - `<CheeseNav>`
    - `<Footer>`
- [`categories-view.md`](./2-categories-view.md): developing the first view for categories
  - topics
    - registering React Router routes
    - view and child components
    - the declarative cycle approach
    - stateful components
    - form validation
    - the Axios library
    - making AJAX requests
    - prop types
  - components
    - `<Route>`s
    - `<CategoriesView>`
    - `<CategoryForm>`
    - `<CategoriesList>`

# Concepts Covered

## Conceptual
- What is a Single Page Application
- How do SPAs differ from Server Side Rendering
- What is an AJAX request
- What is JSON
- What is a Web API
- What is a REST API
- What roles does a SPA play as a consumer of a REST API
- How does separating a SPA and an API support modern web development

## Practical
- How to design a site with view components and constituent components
- How to write stateful and stateless components
- How to manage the state of a React component
- How to add prop-types to components for "type safety" and readability
- How to perform client-side validation in a React form
- How to make AJAX requests to a Web API
- How to manage routing in a SPA using React Router
- How to deploy a SPA on Netlify
- How to deploy a Web API on AWS

# API Reference for the Cheese REST API

## Entity reference

```js
// CheeseEntity
{
  id: Number;
  name: String;
  description: String;
  category: CategoryEntity;
}

// CategoryEntity
{
  id: Number;
  name: String;
}

// MenuEntity
{
  id: Number;
  name: String;
}
```

## Endpoint reference

- Cheese
  - cheeses collection: `/cheeses/`
    - `GET`: get all the cheeses
      - response: `[CheeseEntity]`
    - `POST`: create a new cheese entity
      - request data: `{ name: String, description: String, categoryID: Number }`
      - response: `CheeseEntity`
  - cheese entity: `/cheeses/:cheeseID`
    - `GET`: get the cheese details
      - response: `CheeseEntity`
    - `DELETE`: delete the cheese
      - response status: `204`
  - cheeses collection by category: `/cheeses/category/:categoryID`
    - `GET`: get all the cheeses for the category
      - response: `[CheeseEntity]`
- Category
  - categories collection: `/categories/`
    - `GET`: get all the categories
      - response: `[CategoryEntity]`
    - `POST`: create a new category entity
      - request data: `{ name: String }`
      - response: `CategoryEntity`
- Menu
  - menus collection: `/menus/`
    - `GET`: get all the menus
      - response: `[MenuEntity]`
    - `POST`: create a new menu entity
      - request data: `{ name: String }`
      - response: `MenuEntity`
  - menu entity: `/menus/:menuID`
    - `GET`: get the menu details
      - response: `MenuEntity`
  - menu cheeses sub-collection: `/menus/:menuID/cheeses`
    - `GET`: get all the cheeses in the menu
      - response: `[CheeseEntity]`
    - `POST`: add a cheese to the menu
      - request data: `{ cheeseID }`
      - response: `CheeseEntity`
    - `DELETE`: remove a cheese from the menu
      - request data: `{ cheeseID }`
      - response status: `204`

# Background
Up until now we have built all of our client-facing frontends using server side rendering [SSR] with templates. Recall that dynamic websites use SSR to render a template according to the context of the request. The context carried information about the path and method, requesting user, what they wanted to see, and other details that affected what we rendered in response. When views are rendered according to context they are referred to as dynamic sites rather than static, hard-coded, HTML.

Today we will begin exploring an increasingly popular alternative to developing a frontend - the single page application [SPA]. SPAs are web applications that require no reloading from traditional navigation across views in the browser. They are hosted on a web server that supplies the two minimum requirements of a SPA - a base HTML file and a JavaScript "bundle" file. This bundle file uses a frontend framework to render views client-side, in the user's browser, rather than server-side using SSR.

A SPA by itself is considered a static site. This may seem counter-intuitive because its content is generated programatically using JavaScript. However, the only content that the bundle may ever generate has been "hard coded" like an HTML file and can only change if a developer intervenes.

SPAs can be made dynamic by providing an external data source. Incoming data can change how and what is rendered by the SPA code. Since all of the rendering is done client-side that data must be interacted with remotely through HTTP requests. This remote interaction between a SPA and a data source is supported by two web technologies - AJAX requests and Web APIs.

## AJAX Requests
Instead of relying on a server to manage and inject persisted data into templates with SSR, a SPA receives its data remotely through a special type of request called AJAX. An AJAX request stands for asynchronous JavaScript XML request. It is a special kind of HTTP request sent from the browser to a server. The server the AJAX requests are sent to are often a special kind of server known as a Web API. As the name suggests, AJAX calls are asynchronous meaning they do not block the browser or cause page reloading like a synchronous request. 

When a network request is made it takes some time for the response to come back. This request and response speed is dependent on a number of factors like server upload and client download speeds or heavy traffic slowing down the sever. This is why pages "load" at different speeds depending on your internet connection and how popular the site is at the time.  

Since JavaScript is a single-threaded language it uses asynchronous operations to prevent "blocking" that thread. A blocked thread in a browser means the page freezes - not acceptable for modern web applications! 

AJAX requests are also special because they do not require a page reload to receive a response. Because of their asynchronous nature AJAX requests let us make requests _in the background_ to provide a better user experience.

Imagine if every time you _liked_ a post on FaceBook that the entire page reloaded. Or while uploading a video you were forced to stare only at a loading bar, that guessed its status, rather than being able to continue using the rest of the site or seeing real-time loading information.

The solution to both of these examples of bad UX are to use AJAX requests. We instruct our JavaScript to make an asychronous request on behalf of the user and update us when the results (or error) are returned. We then use this response data to update the page for a seamless user experience.

Back when the term was coined the primary encoding format used was for transmitting data over HTTP was XML. This is the same format used to configure parts of Spring applications. In modern JavaScript, and many other web-facing languages, nearly all communication of data uses the newer encoding standard called JSON.

JSON stands for JavaScript Object Notation and is a way to share JavaScript-styled objects, key-value data structures, over HTTP. Because HTTP needs to be agnostic of the implementing language (Java, Python, JavaScript, etc.) it can only transmit simple data like strings, numbers, booleans, and null. JSON encoding lets us send and receive complex objects of data by converting them into a String format accepted by the HTTP.

Modern JavaScript usage of AJAX requests communicate primarily through JSON but the term has been ubiquitous for so long that it hasn't, and likely never will, be renamed to AJAJ(SON)!

How does JSON get transmitted across the web? Through the use of the other main technology - Web APIs.

## Web APIs
While a SPA can be developed without any communication with external servers, most modern web applications require data persistence. A SPA with no backend is considered a static page - whatever is available when the page loads is all that will ever be available. In order to make a SPA dynamic, like our SSR views, a Web Application Programming Interface [API] is used. In the world of web development the term API is used since the context of it being web-based is implied.

An API is a backend server made up of a Model and Controller layer that responds with data rather than HTML. In simple terms it is a standalone service that manages and communicates its data to a consumer application, typically a View layer like our standalone SPA. Instead of the server responding with static or rendered HTML views it sends and receives data - most often through use of JSON encoded strings.

An API is accessible via **endpoints** which are URL paths that provide access and management of the data in its underlying database. By separating the frontend (SPA) from the backend (API) we are able to provide a lightning fast user experience while also managing and protecting our data separately.

Protection is administered by the design of the API through the same means we learned - authentication, authorization, validation, and sanitization. An API's endpoints are protected depending on the use case and business requirements. Its endpoints fall along a spectrum or being completely public, private, or a mixture. 

There are many design patterns used to write robust and extendable APIs. The two most popular specifications are [OpenAPI REST](https://swagger.io/specification/) and, most recently, GraphQL. RESTful APIs are very common and will likely remain for many years to come. But GraphQL is quickly becoming a big player in the world of API design. Many major companies have already, or are in the process of, converting their legacy REST APIs to GraphQL. In this course we will not be covering GraphQL but it is a fascinating specification that is worth looking into [on your own time](https://graphql.org/).

There are numerous aspects of RESTful design that depend on which specification is being followed. For this guide we will be focusing on the information relevant to consuming a REST API rather than writing one. 

At its core a REST API operates under the concept of _state transfer_ which is where the name **RE**presentational **S**tate **T**ransfer comes from. This API design revolves around CRUD operations on the state of the data it exposes, referred to as its resources.  

Each resource can be represented as a collection or an individual entity within the resource's collection. For example, a `users` collection would be made up of individual `user` data. Where `users` would be a list of `user` entries in a database. The state of the collection would all of the user entries it holds. The state of one entity would be the current data in its fields like `id`, `username`, etc.

A REST API _exposes_ (makes available) endpoints to the states of these resources through URLs. An endpoint is the `/resource/path` that the server will handle requests for. These URL endpoints rely on HTTP methods to describe the actions the API consumer would like to take on the respective state. Like creating, reading, upating, and deleting - CRUD!

In RESTful design endpoints are (almost) always named as nouns while the HTTP method used to access the endpoint are the verbs. With a combination of a URL and the HTTP method an API consumer can perform CRUD operations on data without having to manage it directly. Like 

## How SPAs Work

In traditional static or SSR dynamic websites the HTML is served according to the requested path from the browser. Each time a new path is entered or routed (by clicking a link) a request is made to the host server to render and respond with the respective view. In contrast, SPAs contain all of the views and navigation logic in a single JavaScript file called a **bundle**. When the address of the SPA site is requested the host server only needs to provide two pieces of data - a base HTML file and a JavaScript bundle. Once the bundle has been received and processed by the browser no other server requests are needed for rendering in the browser. Future network requests are only used to manage external data from a web API.

The base HTML file is very simple and serves to provide a header (for meta information, style sheets, and optional third party JavaScript) and a body with a single `<div>` which serves as the **root div**. This root div is what the JavaScript bundle will attach to and render the web application. You might be asking - how can a single JavaScript file manage to build an entire navigable website? The answer is in modern technologies called **front end frameworks**.

A frontend framework operates similar to the backend frameworks we have explored - such as Flask and Spring. They provide a basis for building a SPA through the use of reusable **components**. Each component represents some single or collective HTML tags that the browser uses to render the view. Rather than hard-coding this HTML we rely on JavaScript to convert our component instructions _on the fly_ (at runtime).

The most popular frontend framework is React but two other notable frameworks are Angular and Vue. Frontend frameworks differ in how they convert JavaScript instructions into components and manage efficient rendering into HTML. But all of them operate under the same base concept. You write JavaScript that instructs the framework on how you want the site to appear, you bundle these instructions into a single file, and the framework manages the creation and updating of that content once the bundle has loaded.

## Benefits of the SPA + API design
We have learned that encapsulation of the layers in our web applications is beneficial. The MVC design that we use in a SSR application is similar in the SPA + API combination. In the case of the SPA this means we can "physically" separate our UI code (View) from our backend code (Model/Controller).

This separation of the view from the controller and data allows teams across the stack to operate mostly independently of each other. The frontend team can spend its time designing and implementing the user interface. The backend team can focus on secure and consistent data management. 

They can work separate from each other through the "contract" that is formed by the backend web API and its frontend consumer. The teams only need to communicate when changes or additions to the API endpoints need to be made. The backend does not have to be re-packaged and deployed when user interface changes are introduced.

This sort of design supports the dynamic nature of modern web-based businesses that require fast turnaround on changes to the visualization and management of its data.