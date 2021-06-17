import {
    register
} from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready() {
            // eslint-disable-next-line
            console.log(
                'App is being served from cache by a service worker.\n' +
                'For more details, visit https://goo.gl/AFskqB'
            )
        },
        registered() {
            // eslint-disable-next-line
            console.log('Service worker has been registered.')
        },
        cached() {
            // eslint-disable-next-line
            console.log('Content has been cached for offline use.')
        },
        updatefound() {
            // eslint-disable-next-line
            console.log('New content is downloading.')
        },
        updated() {
            // eslint-disable-next-line
            console.log('New content is available; please refresh.')
        },
        offline() {
            // eslint-disable-next-line
            console.log('No internet connection found. App is running in offline mode.')
        },
        error(error) {
            // eslint-disable-next-line
            console.error('Error during service worker registration:', error)
        }
    })
}