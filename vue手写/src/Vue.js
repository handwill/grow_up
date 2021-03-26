export default class Vue {
  constructor(options) {
    this._data = options.data || undefined;
    this._initData();
  }

  _initData() {}
}
