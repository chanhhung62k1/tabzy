function Tabzy(selector) {
  this.container = document.querySelector(selector);

  if (!this.container) {
    throw new Error(`Tabzy:  No container found for selector "${selector}"`);
  }

  this.tabs = Array.from(this.container.querySelectorAll("li a"));

  if (!this.tabs.length) {
    throw new Error(`Tabzy:  No tabs found inside for container "${selector}"`);
  }

  this.panels = this.tabs
    .map((tab) => {
      const panel = document.querySelector(tab.getAttribute("href"));
      return panel;
    })
    .filter(Boolean);

  if (this.tabs.length !== this.panels.length)
    return console.warn("Tabzy: Number of tabs and panels do not match.");
  this._init();
}

Tabzy.prototype._init = function () {
  const tabActive = this.tabs[0];
  tabActive.closest("li").classList.add("tabzy--active");

  this.panels.forEach((panel) => (panel.hidden = true));
  this.tabs.forEach(
    (tab) => (tab.onclick = (event) => this._handleTabClick(event, tab))
  );

  const panelActive = this.panels[0];
  panelActive.hidden = false;
};

Tabzy.prototype._handleTabClick = function (event, tab) {
  event.preventDefault();

  this.tabs.forEach((tab) => {
    tab.closest("li").classList.remove("tabzy--active");
  });
  tab.closest("li").classList.add("tabzy--active");

  this.panels.forEach((panel) => (panel.hidden = true));

  const panelActive = document.querySelector(tab.getAttribute("href"));
  panelActive.hidden = false;

  console.log(panelActive);
};
