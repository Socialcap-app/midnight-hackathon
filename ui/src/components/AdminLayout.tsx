'use client';

import { ReactNode } from 'react';
import {
  AppShell,
  Text,
  Group,
  UnstyledButton,
  Badge,
  Menu,
  Avatar,
  Box,
  rem,
  Image,
} from '@mantine/core';
import {
  IconFileText,
  IconActivity,
  IconLogout,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface AdminLayoutProps {
  children: ReactNode;
  activeTab?: 'proposals' | 'activity';
  username?: string;
}

const adminNavigationItems = [
  {
    key: 'proposals',
    label: 'Proposals',
    icon: IconFileText,
    href: '/admin/proposals',
    badge: 0,
  },
  {
    key: 'activity',
    label: 'Activity',
    icon: IconActivity,
    href: '/admin/activity',
    // TODO: Replace with real data from contract
    badge: 12, // pending admin actions
  },
];

export function AdminLayout({ children, activeTab, username = 'Admin' }: AdminLayoutProps) {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...');
    router.push('/login');
  };

  const userInitial = username.charAt(0).toUpperCase();

  return (
    <AppShell
      navbar={{ width: 300, breakpoint: 'sm' }}
      header={{ height: 70 }}
      padding="md"
      styles={{
        main: {
          backgroundColor: '#f8f9fa',
        },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          {/* Logo */}
          <Box>
            <Image
              src="/socialcap-logo.svg"
              alt="Logo"
            />
          </Box>

          {/* User Menu with Admin Badge */}
          <Group gap="sm">
            <Badge
              size="sm"
              variant="filled"
              color="var(--mantine-color-blue-7)"
              styles={{
                root: {
                  textTransform: 'none',
                },
              }}
            >
              Admin
            </Badge>

            <Menu shadow="md" width={200} position="bottom-end" offset={5}>
              <Menu.Target>
                <UnstyledButton
                  style={{
                    padding: '8px',
                    borderRadius: '50%',
                    '&:hover': {
                      backgroundColor: '#f1f3f4',
                    },
                  }}
                >
                  <Avatar
                    size={40}
                    radius="xl"
                    style={{
                      background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                      cursor: 'pointer',
                    }}
                  >
                    <Text size="lg" fw={600} c="white">
                      {userInitial}
                    </Text>
                  </Avatar>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Admin Account</Menu.Label>
                <Menu.Item
                  leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                  onClick={handleLogout}
                >
                  Sign out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Group mb="md">
          <Text fw={500} size="sm" c="dimmed">
            Admin Panel
          </Text>
        </Group>

        <Box>
          {adminNavigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;

            return (
              <UnstyledButton
                key={item.key}
                onClick={() => handleNavigation(item.href)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '4px',
                  backgroundColor: isActive ? '#fff3cd' : 'transparent',
                  border: isActive ? '1px solid #ffc107' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Group justify="space-between">
                  <Group gap="sm">
                    <Icon
                      size={20}
                      color={isActive ? '#ffc107' : '#6c757d'}
                    />
                    <Text
                      size="sm"
                      fw={isActive ? 600 : 400}
                      c={isActive ? '#ffc107' : 'dark'}
                    >
                      {item.label}
                    </Text>
                  </Group>
                  {item.badge > 0 && (
                    <Badge
                      size="sm"
                      variant="filled"
                      color={item.key === 'activity' ? 'orange' : 'gray'}
                      styles={{
                        root: {
                          minWidth: '20px',
                          height: '20px',
                          padding: '0 6px',
                        },
                      }}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Group>
              </UnstyledButton>
            );
          })}
        </Box>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
