'use client';

import { DashboardLayout } from '../../components/DashboardLayout';
import { Container, Title, Text, Paper, Group, Badge } from '@mantine/core';

export default function VotesPage() {
  return (
    <DashboardLayout activeTab="votes" username="User">
      <Container size="lg">
        <Group mb="lg" justify="space-between">
          <Title order={1} size="h2">
            My Votes
          </Title>
          <Badge size="lg" variant="outline" color="blue">
            0 votes
          </Badge>
        </Group>

        <Paper p="xl" shadow="sm" radius="md">
          <Text c="dimmed" ta="center" size="lg">
            No votes yet. Your voting history will appear here.
          </Text>
        </Paper>
      </Container>
    </DashboardLayout>
  );
}
