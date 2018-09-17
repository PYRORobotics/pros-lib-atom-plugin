'use babel';

import ProsLibAtomPluginView from './pros-lib-atom-plugin-view';
import { CompositeDisposable } from 'atom';

export default {

  prosLibAtomPluginView: null,
  leftPanel: null,
  subscriptions: null,

  activate(state) {
    this.prosLibAtomPluginView = new ProsLibAtomPluginView(state.prosLibAtomPluginViewState);
    this.leftPanel = atom.workspace.addLeftPanel({
      item: this.prosLibAtomPluginView.getElement(),
      visible: false,
      priority: 0
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pros-lib-atom-plugin:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.leftPanel.destroy();
    this.subscriptions.dispose();
    this.prosLibAtomPluginView.destroy();
  },

  serialize() {
    return {
      prosLibAtomPluginViewState: this.prosLibAtomPluginView.serialize()
    };
  },

  toggle() {
    console.log('ProsLibAtomPlugin was toggled!');
    return (
      this.leftPanel.isVisible() ?
      this.leftPanel.hide() :
      this.leftPanel.show()
    );
  }

};
