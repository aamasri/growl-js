<h1>Growl-js</h1>

<p>A classy notification system for the browser.</p>

<img src="https://auroraweb.ca/uploads/aurora/webpage/205/growl.png" width="400px" alt="">
<pre>
growl({ message: 'Excellent, Growl is working!', target: 'button' });
</pre>

<br>
<h2>Features</h2>
<ul>
    <li>Easy to use.</li>
    <li>Lazy loading (3kb initial page load).</li>
    <li>Usable as a webpack/ES6 module or a pre-built browser bundle.</li>
    <li>Auto-positioning based on the target element's position.</li>
    <li>Target element can be specified by standard css selector, DOM element, or jQuery object.</li>
    <li>Automatic duration based on message length & type.</li>
    <li>Implements the 'Promise' interface, allowing sequential notifications.</li> 
</ul>

<br><br>
<h2>Installation</h2>
Growl-js is a javascript package built for and using the ES6 module system, but it also provided as a pre-built, minified browser package (in this package's "dist" folder).

<br>
<h3>Browser</h3>

1. Download & copy this package's "dist" folder into your web server's public folder eg. ```public/js/dist/*```.
2. Rename "dist" to "growl" eg. ```public/js/growl```
3. Load the growl script at the end of your web page (before the closing `body` tag) like this:
```
<body>
    ...

    <script src="/js/growl/growl.js"></script>
</body>
</html>

```
4. When the browser loads growl will be attached to the browser's global window object. Use it anywhere in your scripts like this:
  
```
<button>Target</button>

<script>
    document.querySelector('button').onclick = function(event) {
        growl({ message: 'You clicked on me' target: event.target });
    });
</script>
```
    
<br>
<h3>ES6 module</h3>
ES6 modules are not supported natively by most browsers and must be transpiled into a browser bundle using the <strong>Webpack</strong> build system.
<br><br>
First, install the growl package into your project (from the terminal): 
<pre>
$ cd to/your/project
$ npm install growl-js
</pre>        

Then import and use it in your project's ES6 modules:
<h4>Static import</h4>
<pre>
import growl from 'growl';

function helloWorld() {
    growl({ message: 'Hello World' });
}
</pre>

<h4>Dynamic import</h4>
Leveraging Webpack's on-demand (lazy) loading and code-splitting:
<pre>
import(/* webpackChunkName: "growl" */ 'growl').then((module) => {
    const growl = module.default; 
    growl({ message: 'Hey, growl just loaded dynamically', type: 'success' });
});
</pre>

<br><br>
<h2>Growl Options</h2>
The growl function expects to be invoked with an options object. Eg.
<pre>growl({ message: 'Hi' });</pre>
<br><br>
Here's the full list of options:
<table>
<tr><th>Option</th><th>Type</th><th>Description</th><th>Default</th></tr>
<tr><td>message</td><td>(required) string</td><td>the message content to display (plain text or simple HTML)</td><td>[error] "Missing message content!"</td></tr>
<tr><td>type</td><td>(optional) string</td><td>the type of message ie. 'success', 'error', 'warning', or 'info'.</td><td>info</td></tr>
<tr><td>target</td><td>(optional) DOM element, CSS selector string, or jQuery object</td><td>(optional) element to associate the growl notification with.</td><td>#growlNoticeboard</td></tr>
<tr><td>duration</td><td>(optional) number</td><td>how long the message is displayed (in seconds). 0 => must be dismissed by the end-user.</td><td>automatic (based on message length/type)</td></tr>
<tr><td>overwrite</td><td>(optional) boolean</td><td>whether this growl message will replace any existing notification on the same target.</td><td>false</td></tr>
</table>

<br>
Eg. using all the options:
<pre>
    growl({
        message: 'You've selected "&lt;strong&gt;Delete my account&lt;/strong&gt;"!',
        type: 'warning',
        target: 'input[type=submit]',
        duration: 10,
        overwrite: true
    });
</pre>

<br>
<h2>Sequential Notifications</h2>
Since growl.js implements the 'Promise' interface, your scripts can build sequential interactions with users. Eg:

<pre>
    let clickCount = 0;
    
    document.getElementById('target').onclick = function(event) {
        growl({
            message: `You've clicked this button <strong>${++clickCount}</strong> times`,
            type: 'info',
            target: event.target,
            overwrite: true
        }).then(function() {
            if (clickCount === 3) {
                growl({
                    message: 'I hope you're enjoying our app!',
                    type: 'success',
                });
            }
        });
    };
</pre>

<br><br><br>


<h2>Package Management</h2>

Growl-js supports [npm](https://www.npmjs.com/package/growl-js) under the name `growl-js`.

<h3>NPM</h3>
<pre>$ npm install growl-js --save</pre>

<br>
<h3>Dependencies</h3>
Growl-js depends on 2 external packages:
<ol>
<li>jquery</li>
<li>animejs</li>
</ol>
These dependencies are bundled (as separate pre-built 'chunks') in this package's "dist" folder.  
<br>
Invoking the growl() function will dynamically load these dependencies at run-time (if these scripts don't already exist on the page) and they'll be added to the global window object.
<br>
If your page already uses jQuery or animejs, growl will use them instead.


<br><br>

## Manual release steps
<ol>
<li>Increment the "version" attribute of `package.json`.</li>
<li>Increment the version number in the `src/growl.js` file.</li>
<li>Re-build the browser output bundle...<pre>npm run build-production</pre>
...and observe that webpack completed with no errors.</li>
<li>Test the bundle by loading page: "dist/index.html" in a browser.</li>
<li>Git Commit (commit message should start with "Release version x.x.x").</li>
<li>Tag the commit with it's version number: "x.x.x".</li>
<li>Change the "latest" tag pointer to the latest commit & push:
    <pre>git tag -f latest
git push origin master :refs/tags/latest
git push origin master --tags</pre>
<li>Publish to npm registry:<pre>npm publish</pre></li>
</ol>

<br>
<h2>Authors</h2>

* [Ananda Masri](https://github.com/aamasri)
* And awesome [contributors](https://github.com/aamasri/growl-js/graphs/contributors)
