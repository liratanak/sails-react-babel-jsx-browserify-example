# Sails application example

 > Sails.js + React + Babel + JSX + Browserify

## Start from Scratch

> Recommended steps for today, `2016-11-16`

1 - Install `nvm`

> see: https://github.com/creationix/nvm#install-script

```
    $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
```

2 - Install `node`

```
    $ nvm install v4.6.2
    $ nvm alias default v4.6.2
```

3 - Install `sails`

```
    $ npm install -g sails
```

4 - Generate new sails application

```
    $ sails new myAwesomeApp
    $ cd myAwesomeApp && npm install
```

5 - Adding grunt task for `babel` with `jsx` support

> Create a new file `tasks/config/babel.js`

```javascript
    /**
    * Babel
    * source in assets/babel
    */ 
    module.exports = function (grunt) {
        grunt.config.set('babel', {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            files: {
                expand: true,
                cwd: 'assets/babel',
                src: ['**/*.js'],
                dest: 'assets/js/'
            }
        });

        grunt.loadNpmTasks('grunt-babel');
    };
```

> Create new file `.babelrc`

```json
    {
        "presets": ["es2015"],
        "plugins": ["transform-react-jsx"]
    }
```

6 - Adding grunt task for `browserify`

> Create a new file `tasks/config/browserify.js`

```javascript
    /**
    * Browserify
    */
    module.exports = function (grunt) {
        grunt.config.set('browserify', {
            client: {
                src: ['assets/js/index.js'],
                dest: 'assets/js/bundle.js'
            }
        });

        grunt.loadNpmTasks('grunt-browserify');
    };
```

7 - Adjusting `syncAssets.js`, `compileAssets.js`, `pipeline.js`

> `tasks/register/syncAssets.js`

```javascript
    module.exports = function(grunt) {
    grunt.registerTask('syncAssets', [
        'jst:dev',
        'less:dev',
        'babel', // <== ADD HERE 
        'browserify:client', // <== AND HERE
        'sync:dev',
        'coffee:dev'
    ]);
    };
```

> `tasks/register/compileAssets.js`

```javascript
    module.exports = function(grunt) {
    grunt.registerTask('compileAssets', [
        'clean:dev',
        'jst:dev',
        'less:dev',
        'babel', // <== ADD HERE
        'browserify:client', // <== ALSO HERE
        'copy:dev',
        'coffee:dev'
    ]);
    };
```

> `tasks/pipeline.js`

```javascript
    var jsFilesToInject = [
    'js/dependencies/sails.io.js',
    'js/dependencies/**/*.js',

    'js/bundle.js' // <== HERE changed from 'js/**/*.js' to 'js/bundle.js' 
    ];

```

8 - Install dependencies

```
    $ npm install grunt-babel babel-preset-es2015 babel-plugin-transform-react-jsx grunt-browserify react react-dom --save
```

9 - Try out

> Edit `views/homepage.ejs`

```html
    <div id="root" class="default-page"></div>
```

> Create new file `assets/babel/index.js` adding some code

```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';

    class HelloMessage extends React.Component {
        render() {
            return <div>Hello {this.props.name}</div>;
        }
    }

    ReactDOM.render(
        <HelloMessage name="Jane" />, 
        document.getElementById('root')
    );
```

10 - [optional] Adding React Router

> Adjust Sails's route `config/routes.js`

```javascript
    module.exports.routes = {
        '/': {
            view: 'homepage'
        },

        // ADD below route for React Router
        '/app/*': {
            view: 'homepage'
        }
    };
```

> Adjust `assets/babel/index.js`

```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';

    import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
    import Main from './components/Main';
    import Home from './components/Home';
    import About from './components/About';

    import Error404 from './components/Error404';

    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Home} />

                <Route path="/app">
                    <Route path="about" component={About} />
                </Route>

                <Route path="*" component={Error404} />
            </Route>
        </Router>, 
        document.getElementById('root')
    );
```

> Adding new related components like:

- `assets/babel/components/Main.js`
- `assets/babel/components/Home.js`
- `assets/babel/components/About.js`
- `assets/babel/components/Error404.js`

11 - [optional development only] Adding auto reload

> Adjusting `tasks/config/watch.js`

```javascript
    module.exports = function (grunt) {

        grunt.config.set('watch', {
            assets: {
                files: ['src/**/*', 'assets/**/*', 'tasks/pipeline.js', '!**/node_modules/**'],
                tasks: ['syncAssets', 'linkAssets'],

                options: {
                    livereload: true, // <== ADD HERE
                },
            }
        });

        grunt.loadNpmTasks('grunt-contrib-watch');
    };
```
> Add reload script to bottom of `views/layout.ejs`

```html
    <script src="http://localhost:35729/livereload.js"></script>
```