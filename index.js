var Queue = require('promise-queue');
var $ = require('jquery');

var maxConcurrent = 3;
var maxQueue = Infinity;
var queue = new Queue(maxConcurrent, maxQueue);


function processSomethingHeavy() {
    return new Promise(function (resolve) {
        setTimeout(() => {
            resolve('resolving');
        }, 1500);
    })
}


function status() {
    console.log('Pending ' + queue.pendingPromises + '/' + queue.maxPendingPromises + ' Queued ' + queue.queue.length + '/' + queue.maxQueuedPromises);
}

function addToQueue() {
    queue.add(processSomethingHeavy)
        .then(function () {
            status();
        }, function (err) {
            console.log('error:' + err);
        });
    // status();
}


addToQueue();
addToQueue();
addToQueue();
addToQueue();
addToQueue();
addToQueue();

status();
