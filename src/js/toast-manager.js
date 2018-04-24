import Toast from './toast';

export default class ToastManager {

    constructor() {
        this.toastCollection = [];
    }

    default(message, title) {
        const toast = new Toast(message, title);
        toast.init();
        toast.show('5rem');
        this.toastCollection.push(toast);
    }

}