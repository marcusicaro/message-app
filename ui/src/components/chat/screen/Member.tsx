/**
 * v0 by Vercel.
 * @see https://v0.dev/t/X3SiPodsGlr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button';
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from '@/components/ui/popover';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import useSWR from 'swr';
import { useState } from 'react';
import DeleteMember from './DeleteMember';
import { failToast } from '@/lib/toast';
import { projectUrl } from '@/lib/environments';

export default function Members(props: any) {
  const [members, setMembers] = useState([]);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);

  const fetcher = async (url: string) => {
    try {
      let res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application',
        },
        credentials: 'include',
      });

      let data = await res.json();
      setMembers(data.members);
      setIsCurrentUserAdmin(data.isCurrentUserAdmin);
    } catch (error) {
      failToast('Failed to load members');
    }
  };

  const { data, error, isLoading } = useSWR(
    props.id ? projectUrl + '/group/' + props.id + '/members' : null,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading members</div>;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>View members</Button>
      </PopoverTrigger>
      <PopoverContent className='w-72'>
        <div>
          {members.length
            ? members.map((member: any, index: number) => {
                return (
                  <div key={index} className='flex items-center space-x-2 p-2'>
                    <Avatar className='w-8 h-8 border'>
                      {member.profilePicture && (
                        <AvatarImage
                          alt={'@' + member.username}
                          src={projectUrl + '/' + member.profilePicture}
                        />
                      )}
                      <AvatarFallback>
                        {member.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className='text-sm font-medium leading-none'>
                      @{member.username}
                    </div>
                    {isCurrentUserAdmin && (
                      <DeleteMember id={props.id} username={member.username} />
                    )}
                  </div>
                );
              })
            : 'No members'}
        </div>
      </PopoverContent>
    </Popover>
  );
}
