import { Injectable } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';

declare var ga: Function;

@Injectable({
    providedIn: 'root'
})
export class GoogleAnalyticsService {

    constructor(router: Router) {
        router.events.subscribe(event => {
            try {
                if (typeof ga === 'function') {
                    if (event instanceof NavigationEnd) {
                        console.log('emit ga pageview: ' + event.urlAfterRedirects);
                        ga('set', 'page', event.urlAfterRedirects);
                        ga('send', 'pageview');
                    }
                }
            } catch (e) {
                console.log(e);
                this.emitEvent('Router', 'pageEvent');
            }
        });
    }

    /**
     * Emit Google Analytics event.
     *
     *
     * @param category - GA event category.
     * @param action - GA event category.
     * @param label - GA event category.
     * @param value - GA event category.
     *
     * @returns void
     *
     */
    public emitEvent(category: string, action: string, label: string = null, value: number = null) {
        console.log('Analytics');
        if (typeof ga === 'function') {
            console.log('emit ga event ' + category + ' -> ' + action + ': ' + label);
            ga('send', {
                hitType: 'event',
                eventCategory: category,
                eventAction: action,
                eventLabel: label,
                eventValue: value
            });
        }
    }

    public setHostName(host: string) {
        if (typeof ga === 'function') {
            console.log('emit ga set hostname: ' + host);
            ga('set', 'hostname', host);
        }
    }
}
