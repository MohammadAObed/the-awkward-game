# The Awakward Game

# Online & Offline

- everything about the game is offline, might add functionality in a next update (release version) to read new persons and lines
  and images and everything frm an online api soruce, so user won't need to download an update each time i add new persons,
  i just add it to that online source, example: in every monday, 10 pm i tell the users (specific appointment) to watch
  for new persons or achievments for existing ones, whatever.

  complications: requiring an image or audio dynamically using uri, okay do i fetch them each time
  (is there any caching in react native, maybe store the data fetched and id in a variable and check if its required, or is there any other simpler built in way, whatever...)

## Naming:

1. Component: example: HandshakesComponent, The Component in the name tells us that this a component we made, Why? it lets us diferentiate between -custom made components- and -other components- (components from libraries, etc...)

2. When changing a screen name, check walkthroughSlice initial state

## Conventions:

## Folders:

### Whats libraries Folder?:

1. This Folder is just a wrapper for external librarires

### Whats constants Folder?

1. mostly enums and constant variables, etc..

### Whats global Folder?

1. Created for any state values that need to be accessed from a parent component to 3-4-5 deep nested child component, so we can access the state value from a property of the global state
2. global state works with useGlobalState hook

### Whats models Folder?:

1. This Folder contains classes
2. Works with data folder

### Whats data Folder?:

1. This Folder contains data (like data from tables in a database)
2. Works with model folder

### Whats controllers Folder?

1. Any Reducer Function is implemented here (similar to action method of a controller), just enhancing the idea of mvc:
   -View Calls Reducer Function, Then action method
   -action method communicate with reducer state (model) (reducer state might be from local storage
   )
   -action then goes back to reducer then to view if its get method, etc...
