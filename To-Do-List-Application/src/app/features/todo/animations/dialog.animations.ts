import {
  animate,
  style,
  transition,
  trigger,
  keyframes,
  state,
  query,
  stagger,
} from '@angular/animations';

export const dialogEntrance = trigger('dialogEntrance', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scale(0.3) rotate(-10deg)',
    }),
    animate(
      '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      style({
        opacity: 1,
        transform: 'scale(1) rotate(0deg)',
      })
    ),
  ]),
  transition(':leave', [
    animate(
      '300ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({
        opacity: 0,
        transform: 'scale(0.3) rotate(10deg)',
      })
    ),
  ]),
]);

export const contentAnimation = trigger('contentAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(30px)',
    }),
    animate(
      '500ms 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      style({
        opacity: 1,
        transform: 'translateY(0)',
      })
    ),
  ]),
]);

export const buttonsAnimation = trigger('buttonsAnimation', [
  transition(':enter', [
    query(
      'button',
      [
        style({
          opacity: 0,
          transform: 'translateX(-20px)',
        }),
        stagger(100, [
          animate(
            '400ms 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            style({
              opacity: 1,
              transform: 'translateX(0)',
            })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);

export const shakeAnimation = trigger('shake', [
  state(
    'false',
    style({
      transform: 'translateX(0)',
    })
  ),
  state(
    'true',
    style({
      transform: 'translateX(0)',
    })
  ),
  transition('false => true', [
    animate(
      '400ms ease-in-out',
      keyframes([
        style({ transform: 'translateX(-10px)', offset: 0.1 }),
        style({ transform: 'translateX(10px)', offset: 0.3 }),
        style({ transform: 'translateX(-8px)', offset: 0.5 }),
        style({ transform: 'translateX(8px)', offset: 0.7 }),
        style({ transform: 'translateX(-5px)', offset: 0.9 }),
        style({ transform: 'translateX(0)', offset: 1 }),
      ])
    ),
  ]),
]);
