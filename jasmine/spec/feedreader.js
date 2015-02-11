/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test function ensures it has a URL defined
         * and that the URL is not empty.
         */
        function checkUrl(url) {
            it('Url is defined: ' + url, function() {
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0);
            });
            it('Url is a string', function() {
                expect(url).toEqual(jasmine.any(String));
            });
        }


        /* Test function ensures it has a name defined
         * and that the name is not empty.
         */

        function checkName(name) {
            it('Name is defined: ' + name, function() {
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            });
            it('Name is a string', function() {
                expect(name).toEqual(jasmine.any(String));
            });
        }

        //loop through all elements of allFeeds and validate the url and name.
        allFeeds.forEach(function(feed){
          checkUrl(feed.url);
          checkName(feed.name);
        });
    }); // close checkUrl


    describe('The Menu', function() {
        /* Added the jasmine-jquery script to add some extra funcnality and improve readability.
         * Mainly the haveClass method.  Could have done this look up with just jquery selectors.
         * The css attribute menu-hidden on the body tag is what hids the menu,
         */
        it('is hidden by default', function() {
            expect($('body')).toHaveClass('menu-hidden');
        });

         /*  The link just toggles the menu-hidden class attribte on the body node.
          *  the menu button is just toggling the menu-hidden class on the body tag
          */
        it('menu is visibility is toggled on click', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body')).not.toHaveClass('menu-hidden');
            $('.menu-icon-link').trigger('click');
            expect($('body')).toHaveClass('menu-hidden');
        });
    }); // close the The Menu


    describe('Initial Entries', function() {
        /* Since the loadFeed() is asynchronous we will call it and pass the jasmine
         * done function to the call back parameter of loadFeed().  This will "halt" the test till loadFeed
         * is complete.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // after loadfeed returns i will check to see if there are any .entry-link elements.
        it('there is at least one ', function() {
            var entryLinks = $('.feed').children('.entry-link');
            expect(entryLinks).toBeDefined();
            expect(entryLinks.length).toBeGreaterThan(0);
        });
    });// close Initial Entries


    describe('New Feed Selection', function() {
        // variable to hold the .feed elements for comparison later.
        var prevFeed, currentFeed;
        var feed = 0;

        beforeEach(function(done) {
            expect(allFeeds.length).toBeGreaterThan(1);
            loadFeed(feed, done);
        });

        it('get content', function() {
            // grabbing the html string for the element
            prevFeed =  $('.feed').prop('outerHTML');
            expect(prevFeed).toBeDefined();
            //incrementing the intger for the feed array to load a different feed.
            feed++;
        });

        it('content has changed', function() {
            // grabbing the html string for the element
            currentFeed = $('.feed').prop('outerHTML');
            expect(currentFeed).toBeDefined();
            /* using the html string to compare becasue I was having issues with the objects and didn't really want
             * to write a custome matcher.
             */
            expect(prevFeed).not.toEqual(currentFeed);
        });
    }); //close New Feed Selection
}); // Close toplevel
