import Toast from './toast';

const toast = new Toast();
toast.init();
toast.show('Un toast de prueba con este mensaje', 'con título');
toast.info('Un toast de prueba con este mensaje', 'con título');
toast.warning('Un toast de prueba con este mensaje', 'con título');
toast.error('Un toast de prueba con este mensaje', 'con título');
toast.success('Un toast de prueba con este mensaje', 'con título');

const btn = document.getElementById('toast-sample');
btn.addEventListener('click', () => {
    toast.show('ka ldaj ldkajlkd jalkjdlakjdlakjdlaj dlajd al d', 'lkaj dklajsd');
})