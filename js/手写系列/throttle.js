function throttle(func, wait, immediate) {
    let _lastTime = 0;
    return function () {
        let _nowTime = +new Date();
        if (_nowTime - _lastTime > wait) {
            func.apply(this, arguments)
            _lastTime = _nowTime;
        }
    }
}