'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

interface AddItemProps {
  id: string;
}

const formSchema = z.object({
  item: z.string().trim().min(1, { message: "Item cannot be empty" }),
});

const AddItem = ({ id }: AddItemProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: '',
    },
  });

  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const newItem = {
        id: new Date().toISOString(), // or generate ID as needed
        emoji: '', // Add logic to handle emoji if necessary
        text: data.item,
        completed: false,
      };

      const response = await fetch('/api/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listId: id,
          item: newItem,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      router.push(`/lists/${id}`);

      router.refresh()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex flex-col gap-2'
      >
        <FormField
          control={form.control}
          name='item'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='type item here...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Add Item</Button>
      </form>
    </Form>
  );
};

export default AddItem;
