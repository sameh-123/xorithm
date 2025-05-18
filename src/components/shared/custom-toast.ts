import { toast } from 'sonner';

export function errorToast(message: string, description: string) {
  toast(message, {
    description: description,
    style: {
      backgroundColor: 'red',
      fontSize: '20px',
      color: 'white',
      border: '0',
      fontWeight: 'bold',
    },
  });
}

export function successToast(message: string, description: string) {
  toast(message, {
    description: description,
    style: {
      backgroundColor: 'green',
      fontSize: '20px',
      color: 'white',
      border: '0',
      fontWeight: 'bold',
    },
  });
}
