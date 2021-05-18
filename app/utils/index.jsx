import { v4 } from 'uuid';

export const GEN_TASK = name => ({
  name,
  id: v4(),
  created_at: +new Date(),
  plan: 25 * 60,
  remain: 25 * 60,
  done: false
});

export const GEN_TIME = time => ({
  // name,
  // id: v4(),
  // created_at: +new Date(),
  plan: time * 60,
  remain: time * 60,
  done: false
});
