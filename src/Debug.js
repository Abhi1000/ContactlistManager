
let _debugEnabled = false;

let Debug = {
    setDebug(enabled) {
        _debugEnabled = enabled;
    },
    log: (msg) => {
        if (_debugEnabled) {
            console.log('[contalist_manager]');
            console.log(msg);
        }
    },
};

export default Debug;