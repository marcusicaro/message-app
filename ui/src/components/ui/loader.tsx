import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className='flex absolute justify-center items-center min-h-screen min-w-screen'>
      <Loader2
        className={cn('h-16 w-16 text-primary/60 animate-spin', className)}
      />
    </div>
  );
};

export default Loader;
