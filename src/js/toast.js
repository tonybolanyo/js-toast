const CSS_DEFAULT = 'toast';
const CSS_SUCCESS = 'toast-success';
const CSS_WARNING = 'toast-warning';
const CSS_ERROR = 'toast-error';
const CSS_INFO = 'toast-info';
const CONTAINER_ID = 'toast-container';
const CSS_CONTAINER = 'toast-container';
const CSS_IN = 'toast-in';
const CSS_OUT = 'toast-out';
const CSS_TITLE = 'toast-title';
const CSS_MESSAGE = 'toast-message';

export default class Toast {
    constructor() {
        this.options = {
            duration: 3000
        }
    }

    init() {
        if (!this.container) {
            const container = document.createElement('div');
            container.id = CONTAINER_ID;
            container.classList.add(CSS_CONTAINER);

            document.body.appendChild(container);
            this.container = container;
        }
    }

    createToast(message, title, cssClass) {
        const toast = document.createElement('div');
        toast.classList.add(CSS_DEFAULT, cssClass, CSS_IN);
        toast.style.animationDuration = `${(this.options.duration / 1000)}s`;
        if (title) {
            const titleElem = document.createElement('div');
            titleElem.classList.add(CSS_TITLE);
            titleElem.textContent = title;
            toast.appendChild(titleElem);
        }
        const messageElem = document.createElement('div');
        messageElem.classList.add(CSS_MESSAGE);
        messageElem.textContent = message;
        toast.appendChild(messageElem);
        this.container.appendChild(toast);
        setTimeout(() => {
            this.container.removeChild(toast);
        }, this.options.duration);
    }

    show(message, title) {
        this.createToast(message, title, CSS_DEFAULT);
    }

    info(message, title) {
        this.createToast(message, title, CSS_INFO);
    }

    warning(message, title) {
        this.createToast(message, title, CSS_WARNING);
    }

    error(message, title) {
        this.createToast(message, title, CSS_ERROR);
    }

    success(message, title) {
        this.createToast(message, title, CSS_SUCCESS);
    }

    
}
