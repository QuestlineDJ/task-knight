# TaskKnight

1. Project Name: Task Knight
   Task Knight is a web-based software meant to help with task management. It display's tasks, due dates, and more. It's formated in a way to feel like a game rather than just a task management system. When you complete a task you damage the boss enemy. When you kill the boss enemy you get gold so you can buy new upgrades in the shop.
2. Installation and Setup
   1. Prerequisits: You need to make sure you have a code editior (VSCode is recommended) as well as having react, node, bootstrap, and gh-pages on your computer
   2. Installation Setup
      1. GitHub Desktop Version
         a. Download GitHub Desktop onto your computer and link it to your GitHub account
         b. Visit the projects GitHub Webpage at : https://github.com/QuestlineDJ/task-knight
         c. Click the green Code button then under the local path click Open with GitHub Desktop
         d. Select the pathing you want the project to be in your computer files
         f. Open the project in your code editor
      2. Git Command Line
         a. Run the command : git clone https://github.com/QuestlineDJ/task-knight.git
         b. Navigate to the project files in your computer files
         c. Open the project in your code editior
   3. Make sure you project has the following packages installed :
      1. React
      2. Node
      3. Bootstrap
      4. gh-pages
3. Codebase structure
   src
   | assets\Task Knight Assets/ #used to store images used in the project
   | Components/ #used to place reusable React Components
   | main.tsx #runs the instance of the website
   | TaskSystem.tsx #where most of the website logic is
   | index.css #main css style sheet
4. Usage Instructions
   1. To view the base website on your computer visit: https://questlinedj.github.io/task-knight/
   2. To view a local copy of your branch make sure you have the node package and run the command : npm run deploy : in your code editiors cmd and follow the link vite provides you

## Running

### Visual Studio Code

1. Open a VSCode terminal and make sure you have the packages react, node, bootstrap, and gh-pages installed.
2. Run the following commands:

```
npm install # install dependancies
npm run build # compile the project
npm run deploy # run localhost webserver
```

After running the above command open your browser and enter the url outputed by `npm run deploy`.

### Other IDEs

1. Open a terminal
2. Build the project
3. Run the IDE's native localhost command
4. Refresh the pages until the changes take effect.

### Deployment on GitHub Pages

> [!NOTE]
> The final website will be stored on the gh-pages branch of our project.
> This branch should not be updated until we finalize our changes in working

1.  Update working with changes.
2.  Copy working to main.
3.  Copy main to gh-pages.
4.  Go to https://questlinedj.github.io/task-knight/ and refresh the page until your changes appear.
