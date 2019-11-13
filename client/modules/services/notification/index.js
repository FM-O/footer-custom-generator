class Notification {
    constructor(identifier = null) {
        this.rootElement = document.querySelector('#notification-container') === null ? document.querySelector('body') : document.querySelector('#notification-container');
        this.notificationElement = null;
        this.textArea = null;
        this.notifNumber = 0;
        this.activeTO = null;
        this.identifier = identifier === null ? Math.random().toString(36).substring(7) : identifier;
    }

    add() {
        if (this.rootElement.hasChildNodes()) {
            clearTimeout(this.activeTO);
            this.remove(this.rootElement.firstElementChild);
        }

        this.textArea = document.createElement('span');
        this.notificationElement = document.createElement('div');
        this.notificationElement.className = "notification";
        this.notificationElement.id = 'notif-' + this.identifier + '-' + this.notifNumber;

        this.notificationElement.appendChild(this.textArea);
        this.rootElement.appendChild(this.notificationElement);

        this.notifNumber ++;
    }

    display(status, message) {
        this.textArea.innerHTML = message;

        if (this.notificationElement.classList.contains(status)) {
            return false;
        }

        this.notificationElement.classList.add(status);

        this.activeTO = setTimeout(() => {
            this.notificationElement.classList.toggle('active');
        }, 200);

        this.activeTO = setTimeout(() => {
            this.notificationElement.classList.toggle('active');
        }, 5000);

        return true;
    }

    remove(notif) {
        this.rootElement.removeChild(notif);
    }
}

export default Notification;