import {
  trigger,
  state,
  animate,
  query,
  group,
  transition,
  style
} from '@angular/animations';

// fadeInAnimation
export const fadeInSlow = trigger('fadeInSlow', [
  transition(':enter', [style({ opacity: 0 }), animate(3000)]),
  transition(':leave', [style({ opacity: 0 }), animate(3000)])
]);

export const slideInFromTop = trigger('slideInFromTop', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate('200ms ease-in')
  ])
]);

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true
    }),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }),
          animate('400ms ease-in-out', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate(
            '400ms ease-in-out',
            style({ transform: 'translateX(-100%)' })
          )
        ],
        { optional: true }
      )
    ])
  ])
]);
