# The Awakward Game

Awkward Game is where you have a list of popular people contacts 📒, like Cristiano Ronaldo or the Rock. You call 📱 one to hang out, and what's the first thing you do when you meet someone? you handshake 🤝. Try to match your handshake so you can get to be friends with them.

The best thing is while you handshake you may get an achievement (with a sticker) because you chose to handshake in a specific way.

bruh! you've read all this, just install, smh 🤦‍♂️

## Online & Offline
- everything about the game is offline

## Conventions:

## Folders:

### Whats libraries Folder?:

1. This Folder is just a wrapper for external librarires

### Whats constants Folder?

1. mostly enums and constant variables, etc..

### Whats global Folder?

1. Just tried a small new approach in react for managing state
2. Created for any state values that need to be accessed from a parent component to 3-4-5 deep nested child component, so we can access the state value from a property of the global state
3. global state works with useGlobalState hook

### Whats models Folder?:

1. This Folder contains classes
2. Works with data folder

### Whats data Folder?:

1. This Folder contains data (like data from tables in a database)
2. Works with model folder

### Whats controllers Folder?

1. Any Reducer Function is implemented here (similar to action method of a controller), just enhancing the idea of mvc:
   -View Calls Reducer Function, Then action method
   -action method communicate with reducer state (model) (reducer state might be from local storage)
   -action then goes back to reducer then to view if its get method, etc...

## Naming:

1. Component: example: HandshakesComponent, The Component in the name tells us that this a component we made, Why? it lets us diferentiate between -custom made components- and -other components- (components from libraries, etc...)

2. When changing a screen name, check walkthroughSlice initial state

