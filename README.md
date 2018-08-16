# Boilerplate for WordPress Theme (Tailwind)
A boilerplate to get started for WordPress theme projects using Tailwind CSS.

## Installation

1. Clone the Git repo using the following command.

`git clone https://gitlab.com/alphaweblab/phoenix-laser-solutions.git`

2. Change to project's root directory to continue installation. All commands from this point should be run from project root folder unless mentioned otherwise.

`cd phoenix-laser-solutions`

3. Checkout to `dev` to continue development.

`git checkout dev`

4. Run composer to install dependencies.

`composer install`

5. Run yarn or npm to install front-end dependencies.

`yarn` or `npm install`

6. Create an empty database in local mysql server and update the credentials in `.env` file.

7. Open `http://localhost/phoenix-laser-solutions` in browser to continue the installation.

8. Use the settings and credentials sent over Slack and complete the installation.

9. After the installation is complete, login to WordPress dashboard, go to Appearance -> Themes and activate "Boilerplate Theme"

10. Run gulp task to start the build process

`gulp watch`