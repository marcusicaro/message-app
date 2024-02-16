'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { PlusIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { mutate } from 'swr';

export default function Component() {
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/group/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ title }),
        credentials: 'include',
      });

      const data = await response.json();
      setOpen(false)
      mutate('http://localhost:3002/group');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild>
          <Button className='h-9 w-9 p-1 rounded-full' variant='ghost'>
            <PlusIcon className='mr-1 h-4 w-4' />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <div className='flex items-center gap-4'>
              <div className='grid gap-4'>
                <Label htmlFor='title'></Label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type='text'
                  name='title'
                  id='title'
                  placeholder='Group Name'
                  className='py-2 px-2 border-2 border-gray-200 rounded-2xl w-full'
                />
              </div>
            </div>
            <div className='flex justify-end gap-2'>
              <Button
                type='submit'
                className='p-1 mt-4 hover:bg-blue-100'
                variant='ghost'
              >
                Create Group
              </Button>
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
