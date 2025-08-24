'use client';

import { useState } from 'react';
import {
  TextInput,
  Button,
  Text,
  Title,
  Group,
  Stack,
  Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AuthLayout } from '../../components/AuthLayout';
import { AuthCard } from '../../components/AuthCard';
import Link from 'next/link';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
    },

    validate: {
      fullName: (value) => (value.trim().length < 2 ? 'Full name must be at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    // TODO: Implement backend functionality
    console.log('Signup attempt with:', values);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout>
      <Center style={{ minHeight: '100vh', padding: '20px' }}>
        <AuthCard>
          <Stack gap="md">
            <Title order={2} ta="center" fw={600} c="dark">
              Sign up
            </Title>

            <Text size="sm" c="dimmed" ta="center">
              Create a new account
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="lg">
                <TextInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  size="md"
                  radius="md"
                  {...form.getInputProps('fullName')}
                  styles={{
                    input: {
                      backgroundColor: 'rgba(248, 249, 250, 0.8)',
                      border: '1px solid #e9ecef',
                      '&:focus': {
                        borderColor: '#4263eb',
                      },
                    },
                  }}
                />

                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  size="md"
                  radius="md"
                  {...form.getInputProps('email')}
                  styles={{
                    input: {
                      backgroundColor: 'rgba(248, 249, 250, 0.8)',
                      border: '1px solid #e9ecef',
                      '&:focus': {
                        borderColor: '#4263eb',
                      },
                    },
                  }}
                />

                <Group grow gap="sm">
                  <Link
                    color="blue"
                    href='/login'
                  >
                    Sign in
                  </Link>

                  <Button
                    type="submit"
                    size="md"
                    radius="md"
                    loading={isLoading}
                    style={{
                      background: 'linear-gradient(45deg, #4263eb, #5b7cfa)',
                      border: 'none',
                    }}
                  >
                    Sign up
                  </Button>
                </Group>
              </Stack>
            </form>
          </Stack>
        </AuthCard>
      </Center>
    </AuthLayout>
  );
}
