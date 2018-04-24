import Toast from './toast';

const toast = new Toast();
toast.init();
toast.show('Un toast de prueba con este mensaje', 'con título');
setTimeout(()=>{
    toast.info('Un toast de prueba con este mensaje', 'con título');
}, 500);
setTimeout(()=>{
    toast.warning('Un toast de prueba con este mensaje', 'con título');
}, 800);
setTimeout(()=>{
    toast.error('Un toast de prueba con este mensaje', 'con título');
}, 1200);
setTimeout(()=>{
    toast.success('Un toast de prueba con este mensaje', 'con título');
}, 1500);

let counter = 0;
const btn = document.getElementById('toast-sample');
btn.addEventListener('click', () => {
    counter++;
    toast.show(`A sample message which counter value is ${counter}`, `Message #${counter}`);
})