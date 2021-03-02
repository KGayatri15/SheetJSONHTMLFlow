const APP = {
    init() {
      //check the state or hash value or both
      APP.checkState(); //when the page loads
      //add listeners for nav bar
      APP.addListeners();
      //APP.updateLayout('earth');
    },
    addListeners() {
      document.querySelector('nav').addEventListener('click', APP.nav);
      window.addEventListener('popstate', APP.checkState);
    },
    checkState() {
      //called when page loads AND after a popstate event
      console.log(location);
      console.log(history);
      if (!location.hash) {
        //default first load
        history.replaceState(
          { home: 'Earth', name: 'James Holden' },
          '',
          '#earth'
        );
        document.title = 'Earth';
      } else {
        let hash = location.hash.replace('#', '');
      }
    },
    nav(ev) {
      ev.preventDefault();
      let anchor = ev.target;
      let home = anchor.getAttribute('data-home');
      let name = anchor.getAttribute('data-name');
      let state = {
        home,
        name,
      };
      history.pushState(state, '', home);
      document.title = home;
    },
};
document.addEventListener('DOMContentLoaded', APP.init);