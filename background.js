
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./foreground_styles.css"]
        })
            .then(() => {
                console.log("INJECTED THE FOREGROUND STYLES.");

                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["./foreground.js"]
                })
                    .then(() => {
                        console.log("INJECTED THE FOREGROUND SCRIPT.");
                    });
            })
            .catch(err => console.log(err));
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'add_mess') {
        chrome.storage.local.set({
            messages: JSON.stringify({ date: request.date, name: request.name, mess: request.mess })
        }, () => {
            if (chrome.runtime.lastError) {
                sendResponse({ message: 'fail' });
                return;
            }

            sendResponse({ message: 'success' });
        })

        return true;
    }
    else if (request.message === 'get_mess') {
        chrome.storage.local.get('messages', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });

                return;
            }

            sendResponse({
                message: 'success',
                messages: data
            });
        });

        return true;
    }

})




// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.message === 'add_comment') {
//         chrome.storage.local.set({
//             messages: JSON.stringify({ date: request.date, name: request.name, message: request.mess })
//         }, () => {
//             if (chrome.runtime.lastError) {
//                 sendResponse({ message: 'fail' });
//                 return;
//             }

//             sendResponse({ message: 'success' });
//         })

//         return true;
//     }
//     else if (request.message === 'get_comments') {
//         chrome.storage.local.get('messages', data => {
//             if (chrome.runtime.lastError) {
//                 sendResponse({
//                     message: 'fail'
//                 });

//                 return;
//             }

//             sendResponse({
//                 message: 'success',
//                 messages: data
//             });
//         });

//         return true;
//     }
//     else if (request.message === 'get_name') {
//         chrome.storage.local.get('name', data => {
//             if (chrome.runtime.lastError) {
//                 sendResponse({
//                     message: 'fail'
//                 });

//                 return;
//             }

//             sendResponse({
//                 message: 'success',
//                 payload: data.name
//             });
//         });

//         return true;
//     } else if (request.message === 'add_date') {
//         let date = request.date
//         let nombrecomments = request.nombrecomments
//         console.log(date + nombrecomments)
//         chrome.storage.local.set({
//             date: request.payload
//         }, () => {
//             if (chrome.runtime.lastError) {
//                 sendResponse({ message: 'fail' });
//                 return;
//             }

//             sendResponse({ message: 'success' });
//         })

//         return true;
//     }
// });


