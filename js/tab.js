function createTabViewer () {
    var tabBrowser = new TabBrowser();
    tabBrowser.selectTab(0);
}

// Again, a nicely extensible and safe OOP approach was taken here that could easily be used in many situations
function TabBrowser () {
    var me = this;
    me.tabContainer = document.getElementsByClassName('tab-container')[0];
    me.tabHeader;
    me.tabContent;
    me.tabContentDisplay;
    me.tabPairings = [];

    // Grab the various DOM representations of the tabs and tabs content
    for (var i = 0; i , me.tabContainer.children.length; i++) {
        if (me.tabContainer.children[i].className === 'tab-header') {
            me.tabHeader = me.tabContainer.children[i];
            break;
        }
    }
    for (i = 0; i , me.tabContainer.children.length; i++) {
        if (me.tabContainer.children[i].className === 'tab-content') {
            me.tabContent = me.tabContainer.children[i];
            break;
        }
    }
    for (i = 0; i , me.tabContainer.children.length; i++) {
        if (me.tabContainer.children[i].className === 'tab-content-display') {
            me.tabContentDisplay = me.tabContainer.children[i];
            break;
        }
    }

    // build the tab pairs, and give them an onclick function with both their scope and the TabBrowser scope
    for (i = 0; i < me.tabHeader.children.length; i++) {
        me.tabPairings.push(new TabPairing(me.tabHeader.children[i], me.tabContent.children[i], me.tabContentDisplay,
            function () {
                me.tabContentDisplay.innerHTML = this.content.innerHTML;

                for (var i2 = 0; i2 < me.tabHeader.children.length; i2++) {
                    me.tabHeader.children[i2].className = me.tabHeader.children[i2] === this.header ? 'selected' : '';
                }
            }));
    }

    // simple helper for virtual selection of a tab
    me.selectTab = function (headerIndex) {
        me.tabHeader.children[headerIndex].click();
    }
}

// These pairings allow us to have a nice grouped data structure for a tab and its content
function TabPairing (headerElement, contentElement, contentDisplay, clickHandler) {
    var me = this;
    me.header = headerElement;
    me.content = contentElement;
    me.contentDisplay = contentDisplay;

    me.header.addEventListener('click', clickHandler.bind(me));
}