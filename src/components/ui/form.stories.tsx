import type { Meta, StoryObj } from '@storybook/react'

import { useForm } from 'react-hook-form'

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormDescription,
} from './form'

const meta: Meta<typeof Form> = {
  title: 'Ui/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Form>

export const Default: Story = {
  render: () => {
    const form = useForm()
    return (
      <Form {...form}>
        <FormItem>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <input type='email' id='email' placeholder='john@example.com' {...field} />
            )}
          />
          <FormDescription>Enter your email address</FormDescription>
        </FormItem>
      </Form>
    )
  },
}

export const WithMessage: Story = {
  render: () => {
    const form = useForm()
    return (
      <Form {...form}>
        <FormItem>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <input type='email' id='email' placeholder='john@example.com' {...field} />
            )}
            rules={{
              required: 'This field is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            }}
          />
          <FormDescription>Enter your email address</FormDescription>
          <FormMessage />
        </FormItem>
      </Form>
    )
  },
}

export const WithError: Story = {
  render: () => {
    const form = useForm()
    return (
      <Form {...form}>
        <FormItem>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <input type='email' id='email' placeholder='john@example.com' {...field} />
            )}
          />
          <FormDescription>Enter your email address</FormDescription>
          <FormMessage>Please enter a valid email address</FormMessage>
        </FormItem>
      </Form>
    )
  },
}
