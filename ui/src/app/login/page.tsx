'use client';

import { useState } from 'react';
import {
  TextInput,
  Button,
  Text,
  Title,
  Group,
  Stack,
  Center
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AuthLayout } from '../../components/AuthLayout';
import { AuthCard } from '../../components/AuthCard';
import Link from 'next/link';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    // TODO: Implement backend functionality
    console.log('Login attempt with:', values.email);

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
              Sign in
            </Title>

            <Text size="sm" c="dimmed" ta="center">
              Enter your email. We will send you a code.
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="lg">
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

                <Button
                  type="submit"
                  size="md"
                  radius="md"
                  loading={isLoading}
                  style={{
                    background: 'linear-gradient(45deg, #4263eb, #5b7cfa)',
                    border: 'none',
                  }}
                  fullWidth
                >
                  Send me the code
                </Button>

                <Group justify="center" gap="xs">
                  <Text size="sm" c="dimmed">
                    No account?
                  </Text>
                  <Link
                    href="/signup"
                  >
                    Sign up!
                  </Link>
                </Group>
              </Stack>
            </form>
          </Stack>
        </AuthCard>
      </Center>
    </AuthLayout>
  );
}
