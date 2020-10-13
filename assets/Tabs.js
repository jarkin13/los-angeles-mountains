(() => {
  class Tabs {
    constructor() {
      this.nav = document.querySelector('.Tabs__nav');
    }

    init() {
      this.nav.addEventListener('click', (e) => {
        if (e.target && e.target.matches('li')) {
          this.onTabClick(e.target);
        }
      });
    }

    onTabClick(currentTab) {
      let activeTab = document.querySelector('.Tabs__navItem.active');
      let activeTabContent = document.querySelector('.Tabs__pane.active');
      activeTab.classList.remove('active');
      activeTabContent.classList.remove('active');

      currentTab.className += ' active';
      document.getElementById(currentTab.getAttribute('data-tab')).className +=
        ' active';
    }
  }

  let tabs = new Tabs();
  tabs.init();
})();
