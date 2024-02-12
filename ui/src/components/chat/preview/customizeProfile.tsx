import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormEvent } from 'react';

export default function Component() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch('http://localhost:3002/user/photos/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      // Handle response if necessary
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='h-9 w-9 p-1 rounded-full' variant='ghost'>
            <UserIcon className='h-4 w-4' />
            <span className='sr-only'>Edit profile</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className='flex items-center gap-4'>
            <form onSubmit={onSubmit}>
              <input type='file' name='avatar' />
              <Button
                value={'Upload'}
                type='submit'
                className='h-9 w-9 p-1 rounded-full'
                variant='ghost'
              >
                <UserIcon className='h-4 w-4' />
                <span className='sr-only'>Edit profile</span>
              </Button>
            </form>
            <div className='grid gap-1.5'>
              <h2 className='text-lg font-bold'>Alice Chu</h2>
              <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                alice@example.com
              </p>
            </div>
          </div>
          <form className='grid gap-4 mt-4'>
            <div className='flex justify-end gap-2'>
              <div>
                <Button type='submit'>Save</Button>
              </div>
              <div>
                <Button variant='outline'>Cancel</Button>
              </div>
            </div>
          </form>
        </DialogContent>
        <div>
          <div>
            <span className='sr-only'>Close</span>
          </div>
        </div>
      </Dialog>
    </>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
      <circle cx='12' cy='7' r='4' />
    </svg>
  );
}
