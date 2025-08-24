'use client';

import { DashboardLayout } from '../../components/DashboardLayout';
import { Container, Title, Text, Paper, Group, Badge } from '@mantine/core';

export default function ProposalsPage() {
  return (
    <DashboardLayout activeTab="proposals" username="User">
      <Container size="lg">
        <Group mb="lg" justify="space-between">
          <Title order={1} size="h2">
            My Proposals
          </Title>
          <Badge size="lg" variant="outline" color="green">
            0 proposals
          </Badge>
        </Group>

        <Paper p="xl" shadow="sm" radius="md">
          <Text c="dimmed" ta="center" size="lg">
            No claims submitted yet. Your claim history will appear here.
          </Text>
        </Paper>
      </Container>
    </DashboardLayout>
  );
}
