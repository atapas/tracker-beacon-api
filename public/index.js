
let startTime = performance.now();

window.addEventListener('load', function() {
    startTime = performance.now();
    console.log('Start time logged at', startTime);
});

window.addEventListener('unload', function() {
    sendAdHoc('unloading the app');
});

const sendAdHoc = function (msg) {
    if (!msg) {
        msg = 'Sending an ad-hoc call';
    }
    if (navigator.sendBeacon) {
         // Data to send
        let data = new FormData();
        data.append('start', startTime);
        data.append('end', performance.now());
        data.append('msg', msg);
        
        navigator.sendBeacon('/log-tracking', data);
    } else {
        // We can send normal xhr or fetch
    }
}