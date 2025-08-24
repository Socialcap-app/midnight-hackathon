import { Paper, Group, Box, Title, Text, Badge, Button, RingProgress, Center } from "@mantine/core";
import { IconCalendar, IconEye, IconCheck, IconX, IconClock, IconUsers, IconFileText, IconUserCheck } from "@tabler/icons-react";

interface ProposalCard {
  id: number;
  title: string;
  author: string;
  startDate: Date;
  endDate: Date;
  status: string; // approved, rejected, dismissed
  submittedAt: string;
  description: string;
  expectedVoters: number;
  actualVoters: number;
}

interface ProposalCardProps {
  proposal: ProposalCard;
  isAdmin?: boolean;
}

// TODO: Review UI
export function ProposalCard({ proposal, isAdmin = false }: ProposalCardProps) {
  const handleViewDetails = (id: number) => {
    console.log(`Viewing proposal details ${id}`);
    // TODO: Implement view details navigation
  };

  const handleParticipate = (id: number) => {
    console.log(`Participating in proposal ${id}`);
    // TODO: Implement participation logic
  };

  const handleReadDocument = (id: number) => {
    console.log(`Reading document for proposal ${id}`);
    // TODO: Implement document reading
  };

  const getDateStatus = (startDate: Date, endDate: Date) => {
    const now = new Date();
    if (now < startDate) {
      return 'pending';
    } else if (now >= startDate && now <= endDate) {
      return 'inProgress';
    } else {
      return 'finished';
    }
  };

  const getDateStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'inProgress':
        return 'var(--mantine-color-blue-6)';
      case 'finished':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getDateStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <IconClock size={16} />;
      case 'inProgress':
        return <IconClock size={16} />;
      case 'finished':
        return <IconCheck size={16} />;
      default:
        return null;
    }
  };

  const getProposalStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      case 'dismissed':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getProposalStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <IconCheck size={16} />;
      case 'rejected':
        return <IconX size={16} />;
      case 'dismissed':
        return <IconX size={16} />;
      default:
        return null;
    }
  };

  const dateStatus = getDateStatus(proposal.startDate, proposal.endDate);
  const participationPercentage = proposal.expectedVoters > 0
    ? Math.round((proposal.actualVoters / proposal.expectedVoters) * 100)
    : 0;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Paper p="lg" shadow="sm" radius="md" style={{
      borderLeft: `4px solid ${getDateStatusColor(dateStatus)}`
    }}>
      <Group justify="space-between" align="flex-start" mb="md">
        <Box style={{ flex: 1 }}>
          {/* Title with Date Status Badge */}
          <Group gap="sm" mb="xs">
            <Title order={4} size="h5" style={{ flex: 1 }}>
              {proposal.title}
            </Title>
            <Badge
              size="sm"
              variant="filled"
              color={getDateStatusColor(dateStatus)}
              leftSection={getDateStatusIcon(dateStatus)}
            >
              {dateStatus === 'inProgress' ? 'In Progress' : dateStatus.charAt(0).toUpperCase() + dateStatus.slice(1)}
            </Badge>
          </Group>

          {/* Description */}
          <Text size="sm" c="dimmed" mb="md">
            {proposal.description}
          </Text>

          {/* Start and End Dates */}
          <Group gap="xl" mb="md">
            <Group gap="xs">
              <IconCalendar size={16} color="#6c757d" />
              <Box>
                <Text size="xs" c="dimmed" fw={500}>
                  Start Date
                </Text>
                <Text size="sm">
                  {formatDate(proposal.startDate)}
                </Text>
              </Box>
            </Group>
            <Group gap="xs">
              <IconCalendar size={16} color="#6c757d" />
              <Box>
                <Text size="xs" c="dimmed" fw={500}>
                  End Date
                </Text>
                <Text size="sm">
                  {formatDate(proposal.endDate)}
                </Text>
              </Box>
            </Group>
            {/* Participation Percentage - Only for Admin View */}
            {isAdmin && (
              <Group gap="xs">
                <IconCalendar size={16} color="#6c757d" />
                <Box>
                  <Text size="xs" c="dimmed" fw={500}>
                    Participation
                  </Text>
                  <Text size="sm">
                    {proposal.actualVoters} / {proposal.expectedVoters} voters
                  </Text>
                </Box>
              </Group>
            )}
          </Group>

          {/* Proposal Status (only for finished proposals) */}
          {dateStatus === 'finished' && proposal.status && (
            <Group gap="sm" mb="md">
              <Text size="sm" c="dimmed" fw={500}>
                Result:
              </Text>
              <Badge
                size="sm"
                variant="filled"
                color={getProposalStatusColor(proposal.status)}
                leftSection={getProposalStatusIcon(proposal.status)}
              >
                {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
              </Badge>
            </Group>
          )}

          {/* Participation Percentage - Only for Admin View */}
          {/* {isAdmin && (
            <Box mb="md">
              <Group justify="space-between" align="center">
                <Group gap="xs">
                  <IconUsers size={16} color="#6c757d" />
                  <Text size="sm" fw={500}>
                    Participation
                  </Text>
                  <Text size="sm" c="dimmed">
                    {proposal.actualVoters} / {proposal.expectedVoters} voters
                  </Text>
                </Group>
                <Center>
                  <RingProgress
                    size={50}
                    thickness={6}
                    sections={[
                      {
                        value: participationPercentage,
                        color: participationPercentage >= 50 ? 'green' : participationPercentage >= 25 ? 'yellow' : 'red'
                      }
                    ]}
                    label={
                      <Text c="dimmed" fw={700} ta="center" size="xs">
                        {participationPercentage}%
                      </Text>
                    }
                  />
                </Center>
              </Group>
            </Box>
          )} */}

          {/* Action Buttons */}
          <Group justify="flex-end" gap="sm">
            {isAdmin ? (
              <Button
                variant="light"
                size="sm"
                leftSection={<IconEye size={16} />}
                onClick={() => handleViewDetails(proposal.id)}
              >
                View Details
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  leftSection={<IconFileText size={16} />}
                  onClick={() => handleReadDocument(proposal.id)}
                >
                  Read Document
                </Button>
                {dateStatus === 'inProgress' && (
                  <Button
                    variant="filled"
                    size="sm"
                    leftSection={<IconUserCheck size={16} />}
                    onClick={() => handleParticipate(proposal.id)}
                    color="blue"
                  >
                    Participate
                  </Button>
                )}
              </>
            )}
          </Group>
        </Box>
      </Group>
    </Paper>
  );
}