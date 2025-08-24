'use client';

import { DashboardLayout } from '../../components/DashboardLayout';
import { Container, Title, Text, Paper, Group, Badge, Stack } from '@mantine/core';
import { ProposalCard } from '../../components/ProposalCard';
import { mockProposals } from '../../utils/mockData';

export default function ProposalsPage() {
  // Filter proposals that are active (not finished)
  const activeProposals = mockProposals.filter(proposal => {
    const now = new Date();
    return now <= proposal.endDate;
  });

  return (
    <DashboardLayout activeTab="proposals" username="User">
      <Container size="lg">
        <Group mb="lg" justify="space-between">
          <Title order={1} size="h2">
            Community Proposals
          </Title>
          <Badge size="lg" variant="outline" color="blue">
            {activeProposals.length} active proposals
          </Badge>
        </Group>

        <Stack gap="md">
          {activeProposals.map((proposal) => (
            <ProposalCard proposal={proposal} key={proposal.id} isAdmin={false} />
          ))}
        </Stack>

        {activeProposals.length === 0 && (
          <Paper p="xl" shadow="sm" radius="md">
            <Text c="dimmed" ta="center" size="lg">
              No active proposals at the moment. Check back later for new community proposals.
            </Text>
          </Paper>
        )}
      </Container>
    </DashboardLayout>
  );
}
