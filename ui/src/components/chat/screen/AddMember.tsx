/**
 * v0 by Vercel.
 * @see https://v0.dev/t/X3SiPodsGlr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { mutate } from 'swr';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export default function AddMember(props: any) {
  const [member, setMember] = useState('');
  const { toast } = useToast();

  async function addMember() {
    let res = await fetch(
      'http://localhost:3002/group/' + props.id + '/add-member',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: member }),
        credentials: 'include',
      }
    );
    let data = await res.json();

    console.log(data);
    if (data.message)
      return mutate('http://localhost:3002/group/' + props.id + '/members');
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>Add member</Button>
      </PopoverTrigger>
      <PopoverContent className='w-72'>
        <div className='flex gap-5'>
          <Input
            placeholder='Username'
            value={member}
            onChange={(e) => setMember(e.target.value)}
          />
          <Button onClick={addMember}>Add</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
