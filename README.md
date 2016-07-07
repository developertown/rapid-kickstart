# Rapid Prototyping Kickstart

This tool provides a "jumpstart" for creating web and mobile applications that fit a very particular use-case of needing to start extremely quickly, and do not have need of server side logic.  To this end, these templates are specifically designed to work with [Firebase](https://www.firebase.com/) out of the box for simplicity, although that could be ripped out without too much difficulty. A future iteration of this tool may provide an optional node backoffice as well.

## Setup

* **Node.js + NPM**: Testing is limited currently to 5.3.0+.  If you don't currently have node installed, we prefer to install via [nodenv](https://github.com/nodenv/nodenv) and the related [nodenv build](https://github.com/nodenv/node-build).  On MacOS, you can install both via [Homebrew](http://brew.sh/) by running:

    ```bash
    brew install nodenv node-build
    nodenv install 5.7.1
    ```
* **React Native** (Optional): Used for prototypes that select a mobile app option, kickstart requires the react-native-cli package to be installed.   You can install it and its dependencies by running:

    ```bash
    brew install watchman flow
    npm install -g react-native-cli
    ```
* **Kickstart!**: Just install the kickstart script with:

    ```bash
    npm install -g rapid-kickstart
    ```

## Getting Started


### Building the prototype

Simply run `kickstart` to start building your app template.  You'll be walked through a series of questions to help define the template to be generated:
 
![Kickstart Screenshot](docs/kickstart.png?raw=true)


### Configuring the prototype

Once the application has been built, you can open up the project in your favorite editor.   For web projects, be sure to edit `web/src/config.js`, as it contains some important configuration variables for your application.
 
### Starting a development server
 
To start the development server for the web application, from a terminal, change to the `web` directory, and run: `npm start`.  This will start a development server on port 5000.
