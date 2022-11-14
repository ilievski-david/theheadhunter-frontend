
## Frontend task
### Tasks
1. User React and Typescript.
<br />
`The project was created with vite create React Typescript.`
2. Do not use any 3rd party component or CSS library.
<br />
`No 3rd party component or CSS library was used.`
3. Add async mock function CREATE, READ, DELETE colors.
<br/>
`Real async functions were added as i created the backend as well.`
4. There is no need for authentication related functionality.
<br/>
`No authentication was used. I implemented a token system. On first run the app creates a token to track your session. The token is saved in localStorage to persist your session.`
5. Please send a Github link with your solution.
<br/>
`Project is developed with github.`

### For extra points
1. The mock calls save the data into localStorage and the Color collection is initialized with the saved data on browser refresh.
<br/>
`The backend server saves the data in a postgres database stated in the backend task.`
2. Install the app somewhere(and share its URL).
`The app is hosted on digital ocean app platform. The app is built automatically on every github push and published. SSL is also implemented for the frontend and backend server calls. `
[https://theheadhunter.davidilievski.dev/](https://theheadhunter.davidilievski.dev/)
3. Implement the exact appearance of the design.
<br/>
`I've done my best.`
4. Your solution looks exacly the same on both Chrome and Firefox.
<br/>
`The app was tested on Chrome and Firefox. They look indentical.`
5. Create a README in your repo and add notes about installation, implementation details or any important info about your solution.
<br/>
`This is a WIP.`
6. Add validation: a color name should not be an empty string, color names and color codes must be unique. Too long color names are not allowed.
<br/>
`All of these validation cases were implement in the backend server. As stated in the backend task. On color add you get a snackbar informing you if you have submited an invalid request or if the request was valid.`
7. Handle overflow: if a color name is long it should not overlap with the Remove color button. If the color list is long use scrollbar.
<br/>
`Overflow is only handled by the long name validation. Scroll is implemented.`

