'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput,
  Button,
  Text,
  Title,
  Group,
  Stack,
  Center,
  PasswordInput,
  Badge
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AuthLayout } from '../../../components/AuthLayout';
import { AuthCard } from '../../../components/AuthCard';
import { IconShield } from '@tabler/icons-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    // TODO: Implement backend functionality for admin authentication
    console.log('Admin login attempt with:', values.email);

    // Simulate API call and redirect to admin panel
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to admin proposals page after successful login
      router.push('/admin/proposals');
    }, 1500);
  };

  return (
    <AuthLayout>
      <Center style={{ minHeight: '100vh', padding: '20px' }}>
        <AuthCard>
          <Stack gap="md">
            {/* Admin Badge */}
            <Group justify="center" mb="sm">
              <Badge
                size="lg"
                variant="filled"
                color="blue"
                leftSection={<IconShield size={16} />}
                styles={{
                  root: {
                    textTransform: 'none',
                  },
                }}
              >
                Admin Access
              </Badge>
            </Group>

            <Title order={2} ta="center" fw={600} c="dark">
              Admin Sign In
            </Title>

            <Text size="sm" c="dimmed" ta="center">
              Enter your admin credentials to access the management panel.
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="lg">
                <TextInput
                  label="Admin Email"
                  placeholder="admin@socialcap.com"
                  size="md"
                  radius="md"
                  {...form.getInputProps('email')}
                  styles={{
                    input: {
                      backgroundColor: 'rgba(248, 249, 250, 0.8)',
                      border: '1px solid #e9ecef',
                      '&:focus': {
                        borderColor: '#dc2626',
                      },
                    },
                  }}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Enter your admin password"
                  size="md"
                  radius="md"
                  {...form.getInputProps('password')}
                  styles={{
                    input: {
                      backgroundColor: 'rgba(248, 249, 250, 0.8)',
                      border: '1px solid #e9ecef',
                      '&:focus': {
                        borderColor: '#dc2626',
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
                    background: 'var(--mantine-color-blue-7)',
                    border: 'none',
                  }}
                  fullWidth
                >
                  {isLoading ? 'Authenticating...' : 'Sign In to Admin Panel'}
                </Button>

                <Group justify="center" gap="xs">
                  <Text size="sm" c="dimmed">
                    Not an admin?
                  </Text>
                  <Link
                    href="/login"
                    style={{
                      color: 'var(--mantine-color-blue-8)',
                      textDecoration: 'none',
                      fontWeight: 500
                    }}
                  >
                    Regular Sign In
                  </Link>
                </Group>

                {/* Security Notice */}
                <Text size="xs" c="dimmed" ta="center" mt="md" style={{
                  padding: '8px 12px',
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(220, 38, 38, 0.2)'
                }}>
                  ⚠️ This is a secure admin area. All activities are logged and monitored.
                </Text>
              </Stack>
            </form>
          </Stack>
        </AuthCard>
      </Center>
    </AuthLayout>
  );
}
