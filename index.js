if ( 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(sw => console.log(`Registrando SW`))
    .catch(error => console.log(`deu errado aqui ${error}`))
}