# The Coding Challenge

Rise allows customers to create responsive single page, vertically scrolling lessons which include a variety of modular elements called Blocks. These Blocks can be as simple as text and image layouts, videos, image galleries, to more complex components like interactive flash cards, tabbed modules and accordions.

Your goal is to implement one of Rise's interactive blocks (see [this Rise lesson](https://rise.articulate.com/share/YaZWnWdc2El8-M-4gcZ9eQD0lB9iRXDn#/lessons/lZ0qX7FvbGICXnk-30conqfR_JAFagbh) for an example).

At a minimum, your implementation should:

- [x] Decorate the knowledge block returned from [`getKnowledgeCheckBlocks`](/server/src/index.ts) with `questions`, `answers`, and `media` from the Postgress Database.
- [x] Populate your interactive block's configuration from the provided REST API (see [`/server`](/server/src/))
- [x] Use `react` and TypeScript to create a UI that replicates [the knowledge check block from this sample lesson](https://rise.articulate.com/share/YaZWnWdc2El8-M-4gcZ9eQD0lB9iRXDn#/lessons/lZ0qX7FvbGICXnk-30conqfR_JAFagbh)
  - You must use React for your UI components
- [x] Please stick to the visual styles we have in place. It's important that you implement the feature in full, so pay close attention to the details including how your block behaves across screen sizes. Responsiveness is a core component of Rise.
- [x] In addition to implementing the knowledge check block, your solution must also maintain its visual state across page refreshes. I.e., if you interact with your block and then refresh the page, the UI state of your interactive block should be the same. Extend the provided REST API to achieve this
  - Your interactive block's UI state must be persisted via the REST API (no storing it in localStorage, cookies, etc.)

# Setup

## Frontend

1. `cd client`
1. `yarn`
1. `yarn start`

The client will be available at port 3000

## Backend

1. `cd server`
1. `docker compose up`

The server will be available at port 5001 and the database will be available at port 7482

### Rebuilding Docker Containers

If you install any new packages or add a new database migration file you'll want to rebuild the docker containers. To do so:

1. Stop your docker containers with `CMD + C` or `CTRL + C`
1. `docker compose down`
1. `docker compose up --build`

# Screenshots

![main](/assets/hover.png)

## Submit States

![right](/assets/right-answer.png)

![wrong](/assets/wrong-answer.png)
