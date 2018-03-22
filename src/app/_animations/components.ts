import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
  state('*',
    style({
      opacity: 1
    })
  ),
  transition('void => *', [
    style({ opacity: 0 }),
    animate(3000, style({ opacity: 1}))
  ]),
  transition('* => void', [
    style({ opacity: 0 }),
    animate(3000, style({ opacity: 1}))
  ]),
]);
