# Boilerplate for WordPress Theme (Tailwind)
A boilerplate to get started for WordPress theme projects using Tailwind CSS.

## Installation

1. Clone the Git repo using the following command.

`git clone https://gitlab.com/alphaweblab/phoenix-laser-solutions.git`

2. Change to project's root directory to continue installation. All commands from this point should be run from project root folder unless mentioned otherwise.

`cd phoenix-laser-solutions`

3. Run composer to install dependencies.

`composer install`

4. Run yarn or npm to install front-end dependencies.

`yarn` or `npm install`

5. Create an empty database in local mysql server and update the credentials in `.env` file.

6. Open `http://localhost/phoenix-laser-solutions` in browser to continue the installation.

7. Use the settings and credentials sent over Slack and complete the installation.

8. After the installation is complete, login to WordPress dashboard, go to Appearance -> Themes and activate "Boilerplate Theme"

9. Run gulp task to start the build process

`gulp watch`