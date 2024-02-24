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
      setOpen(false);
      mutate('http://localhost:3002/group');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className='h-9 w-9 p-1 rounded-full' variant='ghost'>
            <PlusIcon className='mr-1 h-4 w-4' />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <div className='flex items-center gap-4 w-full'>
              <div className='grid gap-4 w-full'>
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
            <div className='flex justify-end gap-2 mt-5'>
              <Button type='submit'>Create Group</Button>
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
