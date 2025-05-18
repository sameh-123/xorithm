export const statusSelect = [
  {
    value: 'All',
    label: 'All',
  },
  {
    value: 'Up',
    label: 'Up',
  },
  {
    value: 'Down',
    label: 'Down',
  },
  {
    value: 'Degraded',
    label: 'Degraded',
  },
];
export const sortSelect = [
  {
    value: 'normal',
    label: 'Normal',
  },
  {
    value: 'a-r-t',
    label: 'ASC Response Time',
  },
  {
    value: 'd-r-t',
    label: 'DESC Response Time',
  },
  {
    value: 'a-u-t',
    label: 'ASC Up Time',
  },
  {
    value: 'd-u-t',
    label: 'DESC Up Time',
  },
];

export const fields: {
  label: string;
  name: 'email' | 'password' | 'confirm' | 'name';
  type: 'text' | 'password';
}[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
  {
    name: 'confirm',
    label: 'confirm password',
    type: 'password',
  },
];
