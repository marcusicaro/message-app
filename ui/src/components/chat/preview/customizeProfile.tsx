'use client';
import { useUser } from '@/components/context/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormEvent, useEffect, useState } from 'react';

export default function Component() {
  const [fileSelected, setFileSelected] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const { state, dispatch } = useUser();

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
      dispatch({ type: 'LOGIN', payload: { profilePicture: data.profilePicture, username: state.username! } });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // useEffect(() => {

  // }, [state]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileSelected(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFileSelected(false);
      setPreview(null);
    }
  };

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
              <div className='flex items-center space-x-4 justify-center '>
                <Input
                  aria-hidden='true'
                  className='hidden'
                  id='avatar'
                  type='file'
                  name='avatar'
                  onChange={handleFileChange}
                />
                <Label
                  className='p-3 rounded-full border cursor-pointer border-gray-200 hover:bg-blue-100 dark:border-gray-800'
                  htmlFor='avatar'
                >
                  {fileSelected ? <img src={preview!} alt="File preview" /> : <UserIcon className='h-6 w-6' />}
                </Label>
              </div>
              {fileSelected ? (
                <Button
                  value={'Upload'}
                  type='submit'
                  className='p-1 mt-4 hover:bg-blue-100'
                  variant='ghost'
                >
                  Save new photo
                </Button>
              ) : (
                <></>
              )}
            </form>
            <div className='grid gap-1.5'>
              <h2 className='text-lg font-bold'>{state.username}</h2>
            </div>
          </div>
          <form className='grid gap-4 mt-4'>
            <div className='flex justify-end gap-2'>

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
