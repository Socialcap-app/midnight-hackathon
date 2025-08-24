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
  IconCheckbox,
  IconActivity,
  IconFileText,
  IconLogout,
  IconUsersPlus,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab?: 'votes' | 'activity' | 'proposals';
  username?: string;
}

const navigationItems = [
  {
    key: 'votes',
    label: 'My Votes',
    icon: IconCheckbox,
    href: '/votes',
    badge: 0,
  },
  {
    key: 'activity',
    label: 'Activity',
    icon: IconActivity,
    href: '/activity',
    // TODO: Replace with real data from contract
    badge: 4, // pending items
  },
  // {
  //   key: 'proposals',
  //   label: 'Join as Validator',
  //   icon: IconUsersPlus,
  //   href: '/proposals',
  //   badge: 0,
  // },
];

export function DashboardLayout({ children, activeTab, username = 'User' }: DashboardLayoutProps) {
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

          {/* User Menu */}
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
              <Menu.Label>Account</Menu.Label>
              <Menu.Item
                leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                onClick={handleLogout}
              >
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Group mb="md">
          <Text fw={500} size="sm" c="dimmed">
            Navigation
          </Text>
        </Group>

        <Box>
          {navigationItems.map((item) => {
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
                  backgroundColor: isActive ? '#e7f5ff' : 'transparent',
                  border: isActive ? '1px solid #339af0' : '1px solid transparent',
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
                      color={isActive ? '#339af0' : '#6c757d'}
                    />
                    <Text
                      size="sm"
                      fw={isActive ? 600 : 400}
                      c={isActive ? '#339af0' : 'dark'}
                    >
                      {item.label}
                    </Text>
                  </Group>
                  {item.badge > 0 && (
                    <Badge
                      size="sm"
                      variant="filled"
                      color={item.key === 'activity' ? 'blue' : 'gray'}
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
