
import { trigger, transition, style, query, animateChild, animate, group } from '@angular/animations';

// export const fadeAnimation = trigger('fadeAnimation', [
//     transition('* => *', [
//         query(
//             ':enter',
//             [style({ opacity: 0 })],
//             { optional: true }
//         ),
//         query(
//             ':leave',
//             [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
//             { optional: true }
//         ),
//         query(
//             ':enter',
//             [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
//             { optional: true }
//         )
//     ])
// ]);
export const fadeSlideInAnimation =
    trigger('routeAnimations', [
        transition('* <=> *', [
            style({ position: 'relative' }),
            query(':leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    opacity: 1
                })
            ], { optional: true }),
            query(':enter', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: '10%',
                    width: '100%',
                    opacity: 0
                })
            ], { optional: true }),
            query(':leave', animateChild(), { optional: true }),
            group([
                query(':leave', [
                    animate('300ms ease-in', style({ opacity: 0, left: '10%' }))
                ], { optional: true }),
                query(':enter', [
                    animate('300ms ease-out', style({ opacity: 1, left: '0%' }))
                ], { optional: true })
            ]),
            query(':enter', animateChild(), { optional: true })
        ])
    ]);


export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* <=> BlogPost', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('300ms ease-out', style({ left: '100%' }))
                ]),
                query(':enter', [
                    animate('300ms ease-out', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ])

    ]);