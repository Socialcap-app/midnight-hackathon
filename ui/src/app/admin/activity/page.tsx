'use client';

import { AdminLayout } from '../../../components/AdminLayout';
import {
  Container,
  Title,
  Text,
  Paper,
  Group,
  Badge,
  Stack,
  Box,
  Avatar
} from '@mantine/core';
import {
  IconActivity,
  IconFileText,
  IconUser,
  IconCheck,
  IconX,
  IconEye,
  IconAlertTriangle
} from '@tabler/icons-react';

// TODO: Import real data from contract
const adminActivityItems = [
  {
    id: 1,
    type: 'proposal_submitted',
    message: 'New proposal "Community Garden Initiative" submitted for review',
    user: 'Alice Johnson',
    timestamp: '2 hours ago',
    icon: IconFileText,
    color: 'blue',
    requiresAction: true,
  },
  {
    id: 2,
    type: 'proposal_submitted',
    message: 'New proposal "Youth Coding Bootcamp" submitted for review',
    user: 'Bob Smith',
    timestamp: '4 hours ago',
    icon: IconFileText,
    color: 'blue',
    requiresAction: true,
  },
  {
    id: 3,
    type: 'user_verification',
    message: 'User verification request pending approval',
    user: 'Carol Davis',
    timestamp: '1 day ago',
    icon: IconUser,
    color: 'orange',
    requiresAction: true,
  },
  {
    id: 4,
    type: 'proposal_approved',
    message: 'Proposal "Local Art Festival" has been approved',
    user: 'System',
    timestamp: '2 days ago',
    icon: IconCheck,
    color: 'green',
    requiresAction: false,
  },
  {
    id: 5,
    type: 'vote_disputed',
    message: 'Vote result disputed - requires admin review',
    user: 'David Wilson',
    timestamp: '3 days ago',
    icon: IconAlertTriangle,
    color: 'red',
    requiresAction: true,
  },
  {
    id: 6,
    type: 'proposal_submitted',
    message: 'New proposal "Senior Citizens Support Program" submitted',
    user: 'Eva Brown',
    timestamp: '5 days ago',
    icon: IconFileText,
    color: 'blue',
    requiresAction: true,
  },
  {
    id: 7,
    type: 'system_activity',
    message: 'System maintenance completed successfully',
    user: 'System',
    timestamp: '1 week ago',
    icon: IconActivity,
    color: 'teal',
    requiresAction: false,
  },
  {
    id: 8,
    type: 'proposal_rejected',
    message: 'Proposal "Parking Lot Expansion" has been rejected',
    user: 'System',
    timestamp: '1 week ago',
    icon: IconX,
    color: 'red',
    requiresAction: false,
  },
  {
    id: 9,
    type: 'user_activity',
    message: 'High voting activity detected in community polls',
    user: 'System',
    timestamp: '1 week ago',
    icon: IconEye,
    color: 'indigo',
    requiresAction: false,
  },
  {
    id: 10,
    type: 'proposal_submitted',
    message: 'New proposal "Environmental Cleanup Drive" submitted',
    user: 'Frank Miller',
    timestamp: '2 weeks ago',
    icon: IconFileText,
    color: 'blue',
    requiresAction: true,
  },
  {
    id: 11,
    type: 'user_verification',
    message: 'Multiple user verification requests processed',
    user: 'System',
    timestamp: '2 weeks ago',
    icon: IconUser,
    color: 'green',
    requiresAction: false,
  },
  {
    id: 12,
    type: 'system_activity',
    message: 'Database backup completed',
    user: 'System',
    timestamp: '3 weeks ago',
    icon: IconActivity,
    color: 'teal',
    requiresAction: false,
  },
];

export default function AdminActivityPage() {
  const pendingActions = adminActivityItems.filter(item => item.requiresAction).length;

  const getUserInitial = (username: string) => {
    return username === 'System' ? 'S' : username.charAt(0).toUpperCase();
  };

  const getUserAvatarColor = (username: string) => {
    if (username === 'System') {
      return 'linear-gradient(45deg, #6c757d, #495057)';
    }
    // Generate consistent color based on username
    const colors = [
      'linear-gradient(45deg, #ff6b6b, #feca57)',
      'linear-gradient(45deg, #48cae4, #0077b6)',
      'linear-gradient(45deg, #90e0ef, #00b4d8)',
      'linear-gradient(45deg, #a8dadc, #457b9d)',
      'linear-gradient(45deg, #f1faee, #e63946)',
    ];
    const hash = username.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <AdminLayout activeTab="activity" username="Admin">
      <Container size="lg">
        <Group mb="lg" justify="space-between">
          <Title order={1} size="h2">
            Admin Activity Feed
          </Title>
          <Badge size="lg" variant="filled" color="orange">
            {pendingActions} require action
          </Badge>
        </Group>

        <Stack gap="md">
          {adminActivityItems.map((item) => {
            const Icon = item.icon;
            return (
              <Paper
                key={item.id}
                p="lg"
                shadow="sm"
                radius="md"
                style={{
                  borderLeft: `4px solid ${item.requiresAction ? '#fd7e14' : '#6c757d'}`,
                  opacity: item.requiresAction ? 1 : 0.8,
                }}
              >
                <Group gap="sm" align="flex-start">
                  <Icon size={20} color={`var(--mantine-color-${item.color}-6)`} />

                  <Box style={{ flex: 1 }}>
                    <Group justify="space-between" align="flex-start" mb="xs">
                      <Text fw={500} size="sm">
                        {item.message}
                      </Text>
                      {item.requiresAction && (
                        <Badge size="xs" variant="filled" color="orange">
                          Action Required
                        </Badge>
                      )}
                    </Group>

                    <Group gap="sm" mt="xs">
                      <Avatar
                        size={24}
                        radius="xl"
                        style={{
                          background: getUserAvatarColor(item.user),
                        }}
                      >
                        <Text size="xs" fw={600} c="white">
                          {getUserInitial(item.user)}
                        </Text>
                      </Avatar>

                      <Text size="xs" c="dimmed">
                        {item.user}
                      </Text>

                      <Text size="xs" c="dimmed">
                        •
                      </Text>

                      <Text size="xs" c="dimmed">
                        {item.timestamp}
                      </Text>
                    </Group>
                  </Box>
                </Group>
              </Paper>
            );
          })}
        </Stack>

        {adminActivityItems.length === 0 && (
          <Paper p="xl" shadow="sm" radius="md">
            <Text c="dimmed" ta="center" size="lg">
              No recent admin activity. Activity will appear here as actions are taken.
            </Text>
          </Paper>
        )}
      </Container>
    </AdminLayout>
  );
}
