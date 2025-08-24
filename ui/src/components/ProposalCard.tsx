import { Paper, Group, Box, Title, Text, Badge, Tooltip, ActionIcon } from "@mantine/core";
import { IconUser, IconCalendar, IconEye, IconCheck, IconX, IconClock } from "@tabler/icons-react";

interface ProposalCard {
  id: number,
  title: string,
  author: string,
  status: string,
  submittedAt: string,
  description: string,

}

// TODO: Review UI
export function ProposalCard({ proposal }: { proposal: ProposalCard }) {
  const handleApprove = (id: number) => {
    console.log(`Approving proposal ${id}`);
    // TODO: Implement approval logic
  };

  const handleReject = (id: number) => {
    console.log(`Rejecting proposal ${id}`);
    // TODO: Implement rejection logic
  };

  const handleView = (id: number) => {
    console.log(`Viewing proposal ${id}`);
    // TODO: Implement view logic
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'inProgress':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <IconClock size={16} />;
      case 'approved':
        return <IconCheck size={16} />;
      case 'rejected':
        return <IconX size={16} />;
      default:
        return null;
    }
  };

  return (


    <Paper key={proposal.id} p="lg" shadow="sm" radius="md" style={{
      borderLeft: `4px solid ${proposal.status === 'pending' ? '#fd7e14' : proposal.status === 'approved' ? '#51cf66' : '#ff6b6b'}`
    }}>
      <Group justify="space-between" align="flex-start" mb="sm">
        <Box style={{ flex: 1 }}>
          <Group gap="sm" mb="xs">
            <Title order={4} size="h5">
              {proposal.title}
            </Title>
            <Badge
              size="sm"
              variant="filled"
              color={getStatusColor(proposal.status)}
              leftSection={getStatusIcon(proposal.status)}
            >
              {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
            </Badge>
          </Group>

          <Text size="sm" c="dimmed" mb="xs">
            {proposal.description}
          </Text>

          <Group gap="lg" mt="sm">
            <Group gap="xs">
              <IconUser size={14} color="#6c757d" />
              <Text size="xs" c="dimmed">
                {proposal.author}
              </Text>
            </Group>
            <Group gap="xs">
              <IconCalendar size={14} color="#6c757d" />
              <Text size="xs" c="dimmed">
                {new Date(proposal.submittedAt).toLocaleDateString("es-AR")}
              </Text>
            </Group>
          </Group>
        </Box>

        <Group gap="xs">
          <Tooltip label="View Details">
            <ActionIcon
              variant="light"
              color="blue"
              size="sm"
              onClick={() => handleView(proposal.id)}
            >
              <IconEye size={16} />
            </ActionIcon>
          </Tooltip>

          {proposal.status === 'pending' && (
            <>
              <Tooltip label="Approve">
                <ActionIcon
                  variant="light"
                  color="green"
                  size="sm"
                  onClick={() => handleApprove(proposal.id)}
                >
                  <IconCheck size={16} />
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Reject">
                <ActionIcon
                  variant="light"
                  color="red"
                  size="sm"
                  onClick={() => handleReject(proposal.id)}
                >
                  <IconX size={16} />
                </ActionIcon>
              </Tooltip>
            </>
          )}
        </Group>
      </Group>
    </Paper>
  )
}