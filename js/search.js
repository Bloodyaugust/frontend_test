function start () {
    var collection = new textCollection(document.getElementById('search-text')),
        resultMessage = document.getElementById('result-message');

    document.getElementById('search-input').addEventListener('keydown', function (e) { resultMessage.innerHTML = 'Word/phrase found: ' + collection.searchText(e.target.value) + ' times'; });
}

// Nice and easy here. Still used an OOP pattern because I'm an addict. There are literally tens of us!
function textCollection (rootElement) {
    var me = this;
    me.text = rootElement.innerText;

    me.searchText = function (searchFor) {
        return me.text.match(new RegExp(searchFor, 'g')) !== null ? me.text.match(new RegExp(searchFor, 'g')).length : 0;
    }
}