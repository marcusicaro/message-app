import { toast } from '@/components/ui/use-toast';

export function successToast(message: string) {
  toast({
    title: 'Success',
    description: message,
  });
}

export function failToast(message: string) {
  toast({
    title: 'Fail',
    description: message,
  });
}
