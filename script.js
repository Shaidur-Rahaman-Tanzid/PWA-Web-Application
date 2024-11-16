// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Service Worker Registered:', reg))
        .catch(err => console.error('Service Worker Registration Failed:', err));
}

// Handle Notifications
function notifyMe() {
    if (!('Notification' in window)) {
        alert('This browser does not support notifications.');
        return;
    }

    if (Notification.permission === 'default' || Notification.permission === 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotification();
            } else {
                console.log('Notifications permission denied.');
            }
        });
    } else if (Notification.permission === 'granted') {
        showNotification();
    }
}

function showNotification() {
    new Notification('Hello from My PWA!', {
        body: 'This is a sample notification.',
        icon: 'images/icon.png'
    });
}

// Handle Install Prompt
let deferredPrompt;
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.style.display = 'block';

    installButton.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
                installButton.style.display = 'none';
            });
        }
    });
});
