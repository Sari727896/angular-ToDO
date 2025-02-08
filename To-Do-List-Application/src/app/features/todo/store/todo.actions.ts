import { createActionGroup, props } from '@ngrx/store';

export const TodoActions = createActionGroup({
  source: 'Todo',
  events: {
    'Add Todo': props<{ title: string; description?: string }>(),
    'Toggle Todo': props<{ id: number }>(),
    'Delete Todo': props<{ id: number }>(),
    'Set Filter': props<{ filterType: 'all' | 'incomplete' | 'completed' }>(),
  },
});
