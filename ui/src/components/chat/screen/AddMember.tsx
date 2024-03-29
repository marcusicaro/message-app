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
import { useToast } from '@/components/ui/use-toast';
import { projectUrl } from '@/lib/environments';
import { failToast, successToast } from '@/lib/toast';
import { useState } from 'react';
import { mutate } from 'swr';

export default function AddMember(props: any) {
  const [member, setMember] = useState('');
  const { toast } = useToast();

  async function addMember() {
    let res = await fetch(projectUrl + '/group/' + props.id + '/add-member', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: member }),
      credentials: 'include',
    });
    let data = await res.json();
    if (data.message) {
      successToast('Member added');
      return mutate(projectUrl + '/group/' + props.id + '/members');
    }
    failToast('Failed to add member');
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
