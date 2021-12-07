# task-manager (WIP)
Organize your work with projects and tasks

# Starting the app locally
Requirements:
* `Node` Currently using v14.16
* `Mongo DB`
* `React`

Initializing in the terminal:
* run `Mongod`, or however you want to start the DB instance
* run `nodemon server.js`
* `cd` into the `client` folder and run `npm start`

# Features:
* User Authentication (login/signup/authorization)
* Persisted data with MongoDB
* Chakra-UI
* Task KanBan within project view
** Swimlanes for status (object status property determines placement in swimlane)
** Task card color to denote priority (color switcher based off object priority property)
* Public view of other users' projects and their tasks
* Ability to comment on other yours and other users' tasks

# Feature Backlog:
* Project comments under the kanban view
* Drag and drop tasks to different swimlane
* Markdown text editor for forms
* Menu drawer that gives a view of users' own projects anywhere in the app
* Assigning users to tasks
* Need to refactor and make smaller components!
* Delete and edit tasks in kanban view
* Edit project in project view

# Bugs/defects:
* Comment edit function on front-end currently not working in `EditTaskForm` component (working on the back end)
* Status drop-down in the `TaskPage` currently doesn't edit the status of the task (just for show right now)
* Task creator username is just showing the user ID. Been working on this but set it aside for now.
* Project cards show _all_ tasks, rather than tasks associated with project, should be a quick fix
* Project "created by" is pointing to the property in the project model that I previously defaulted to "Old User
