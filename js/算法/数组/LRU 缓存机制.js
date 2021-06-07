class LRUCache {
  constructor(max = 4) {
    this.max = max;
    this.cache = new Map();
  }
  put(key, value) {
    if (this.cache.size > this.max - 1) {
      const lastKey = this.cache.keys().next().value;
      this.cache.delete(lastKey);
    }
    this.cache.set(key, value);
  }
  get(key) {
    let value = -1;
    if (this.cache.has(key)) {
      value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    console.log(value);
    return value;
  }
}

let cache = new LRUCache(2 /* 缓存容量 */);

cache.put(1, 1);
cache.put(2, 2);
cache.get(1); // 返回  1
cache.put(3, 3); // 该操作会使得密钥 2 作废
cache.get(2); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使得密钥 1 作废
cache.get(1); // 返回 -1 (未找到)
cache.get(3); // 返回  3
cache.get(4); // 返回  4
