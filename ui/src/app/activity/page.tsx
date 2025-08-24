'use client';

import { DashboardLayout } from '../../components/DashboardLayout';
import { Container, Title, Text, Paper, Group, Badge, Stack, Box } from '@mantine/core';
import { IconActivity } from '@tabler/icons-react';

export default function ActivityPage() {
  return (
    <DashboardLayout activeTab="activity" username="User">
      <Container size="lg">
        <Group mb="lg" justify="space-between">
          <Title order={1} size="h2">
            Activity
          </Title>
          <Badge size="lg" variant="filled" color="blue">
            4 pending
          </Badge>
        </Group>

        <Stack gap="md">
          <Paper p="lg" shadow="sm" radius="md" style={{ borderLeft: '4px solid #339af0' }}>
            <Group gap="sm">
              <IconActivity size={20} color="#339af0" />
              <Box>
                <Text fw={500} size="sm">
                  New vote request available
                </Text>
                <Text size="xs" c="dimmed">
                  2 hours ago
                </Text>
              </Box>
            </Group>
          </Paper>

          <Paper p="lg" shadow="sm" radius="md" style={{ borderLeft: '4px solid #339af0' }}>
            <Group gap="sm">
              <IconActivity size={20} color="#339af0" />
              <Box>
                <Text fw={500} size="sm">
                  Claim verification pending
                </Text>
                <Text size="xs" c="dimmed">
                  1 day ago
                </Text>
              </Box>
            </Group>
          </Paper>

          <Paper p="lg" shadow="sm" radius="md" style={{ borderLeft: '4px solid #339af0' }}>
            <Group gap="sm">
              <IconActivity size={20} color="#339af0" />
              <Box>
                <Text fw={500} size="sm">
                  Vote submitted successfully
                </Text>
                <Text size="xs" c="dimmed">
                  3 days ago
                </Text>
              </Box>
            </Group>
          </Paper>

          <Paper p="lg" shadow="sm" radius="md" style={{ borderLeft: '4px solid #339af0' }}>
            <Group gap="sm">
              <IconActivity size={20} color="#339af0" />
              <Box>
                <Text fw={500} size="sm">
                  New community joined
                </Text>
                <Text size="xs" c="dimmed">
                  1 week ago
                </Text>
              </Box>
            </Group>
          </Paper>
        </Stack>
      </Container>
    </DashboardLayout>
  );
}
