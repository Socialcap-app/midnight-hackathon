// Mock data for proposals to be used across the application
export interface ProposalData {
  id: number;
  title: string;
  author: string;
  startDate: Date;
  endDate: Date;
  status: 'approved' | 'rejected' | 'dismissed' | 'pending';
  submittedAt: string;
  description: string;
  expectedVoters: number;
  actualVoters: number;
}

// Helper function to create dates relative to today
const createDate = (daysOffset: number, hoursOffset: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(date.getHours() + hoursOffset);
  return date;
};

// Mock proposals data
export const mockProposals: ProposalData[] = [
  {
    id: 1,
    title: 'Community Garden Initiative',
    author: 'Alice Johnson',
    startDate: createDate(-5), // Started 5 days ago
    endDate: createDate(10), // Ends in 10 days
    status: 'pending',
    submittedAt: '2024-08-15',
    description: 'Proposal to establish a community garden in the downtown area to promote sustainable living and community engagement. The garden would include plots for residents, educational workshops, and composting facilities.',
    expectedVoters: 150,
    actualVoters: 89,
  },
  {
    id: 2,
    title: 'Youth Coding Bootcamp Funding',
    author: 'Bob Smith',
    startDate: createDate(2), // Starts in 2 days
    endDate: createDate(15), // Ends in 15 days
    status: 'pending',
    submittedAt: '2024-08-18',
    description: 'Free coding bootcamp for underprivileged youth aged 14-18 to provide them with valuable tech skills. The program includes web development, mobile app creation, and career mentorship.',
    expectedVoters: 200,
    actualVoters: 0,
  },
  {
    id: 3,
    title: 'Annual Local Art Festival',
    author: 'Carol Davis',
    startDate: createDate(-20), // Started 20 days ago
    endDate: createDate(-5), // Ended 5 days ago
    status: 'approved',
    submittedAt: '2024-07-25',
    description: 'Annual art festival showcasing local artists and promoting cultural activities in the community. Features live music, art exhibitions, food vendors, and interactive workshops for all ages.',
    expectedVoters: 180,
    actualVoters: 142,
  },
  {
    id: 4,
    title: 'Senior Citizens Support Program',
    author: 'David Wilson',
    startDate: createDate(-10), // Started 10 days ago
    endDate: createDate(5), // Ends in 5 days
    status: 'pending',
    submittedAt: '2024-08-10',
    description: 'Support program providing assistance and social activities for senior citizens in the community. Includes meal delivery, transportation services, and social meetups.',
    expectedVoters: 120,
    actualVoters: 67,
  },
  {
    id: 5,
    title: 'Public Library Renovation Project',
    author: 'Emma Thompson',
    startDate: createDate(-30), // Started 30 days ago
    endDate: createDate(-10), // Ended 10 days ago
    status: 'rejected',
    submittedAt: '2024-07-15',
    description: 'Comprehensive renovation of the public library including new technology center, expanded reading areas, and improved accessibility features. The project aims to modernize our community library.',
    expectedVoters: 250,
    actualVoters: 98,
  },
  {
    id: 6,
    title: 'Downtown Bike Lane Infrastructure',
    author: 'Frank Miller',
    startDate: createDate(7), // Starts in 7 days
    endDate: createDate(20), // Ends in 20 days
    status: 'pending',
    submittedAt: '2024-08-20',
    description: 'Installation of dedicated bike lanes throughout downtown area to promote sustainable transportation and reduce traffic congestion. Includes bike parking stations and safety improvements.',
    expectedVoters: 300,
    actualVoters: 0,
  },
  {
    id: 7,
    title: 'Community Solar Panel Initiative',
    author: 'Grace Lee',
    startDate: createDate(-15), // Started 15 days ago
    endDate: createDate(-2), // Ended 2 days ago
    status: 'approved',
    submittedAt: '2024-08-01',
    description: 'Community-owned solar panel installation on public buildings to reduce energy costs and promote renewable energy. The project includes educational programs about sustainable energy.',
    expectedVoters: 220,
    actualVoters: 187,
  },
  {
    id: 8,
    title: 'Food Truck Festival Organization',
    author: 'Henry Garcia',
    startDate: createDate(-25), // Started 25 days ago
    endDate: createDate(-15), // Ended 15 days ago
    status: 'dismissed',
    submittedAt: '2024-07-20',
    description: 'Monthly food truck festival in Central Park to support local food businesses and create community gathering opportunities. Features diverse cuisines and live entertainment.',
    expectedVoters: 160,
    actualVoters: 45,
  },
  {
    id: 9,
    title: 'After-School Tutoring Program',
    author: 'Isabel Rodriguez',
    startDate: createDate(-3), // Started 3 days ago
    endDate: createDate(12), // Ends in 12 days
    status: 'pending',
    submittedAt: '2024-08-19',
    description: 'Free after-school tutoring program for K-12 students staffed by volunteer community members and college students. Focuses on math, science, and reading comprehension.',
    expectedVoters: 140,
    actualVoters: 78,
  },
  {
    id: 10,
    title: 'Community Composting Program',
    author: 'Jack Wilson',
    startDate: createDate(5), // Starts in 5 days
    endDate: createDate(18), // Ends in 18 days
    status: 'pending',
    submittedAt: '2024-08-21',
    description: 'Neighborhood composting program with collection points and educational workshops about waste reduction. Includes distribution of compost to community members for gardening.',
    expectedVoters: 110,
    actualVoters: 0,
  },
  {
    id: 11,
    title: 'Outdoor Movie Nights Series',
    author: 'Kate Brown',
    startDate: createDate(-40), // Started 40 days ago
    endDate: createDate(-25), // Ended 25 days ago
    status: 'approved',
    submittedAt: '2024-07-05',
    description: 'Summer outdoor movie screening series in the community park. Family-friendly films with popcorn and refreshment stands. Creates opportunities for neighbors to connect and socialize.',
    expectedVoters: 190,
    actualVoters: 156,
  },
  {
    id: 12,
    title: 'Digital Literacy Classes for Seniors',
    author: 'Liam Anderson',
    startDate: createDate(-8), // Started 8 days ago
    endDate: createDate(7), // Ends in 7 days
    status: 'pending',
    submittedAt: '2024-08-12',
    description: 'Technology education classes specifically designed for senior community members. Covers smartphone usage, online safety, video calling, and basic computer skills.',
    expectedVoters: 100,
    actualVoters: 73,
  }
];

// Helper functions to filter proposals by status
export const getPendingProposals = () => 
  mockProposals.filter(proposal => {
    const now = new Date();
    return now >= proposal.startDate && now <= proposal.endDate;
  });

export const getFinishedProposals = () => 
  mockProposals.filter(proposal => {
    const now = new Date();
    return now > proposal.endDate;
  });

export const getUpcomingProposals = () => 
  mockProposals.filter(proposal => {
    const now = new Date();
    return now < proposal.startDate;
  });

export const getProposalsByStatus = (status: ProposalData['status']) => 
  mockProposals.filter(proposal => proposal.status === status);

// Helper function to get a proposal by ID
export const getProposalById = (id: number) => 
  mockProposals.find(proposal => proposal.id === id);

// Statistics helpers
export const getProposalStats = () => {
  const total = mockProposals.length;
  const pending = getPendingProposals().length;
  const finished = getFinishedProposals().length;
  const upcoming = getUpcomingProposals().length;
  const approved = getProposalsByStatus('approved').length;
  const rejected = getProposalsByStatus('rejected').length;
  const dismissed = getProposalsByStatus('dismissed').length;
  
  return {
    total,
    pending,
    finished,
    upcoming,
    approved,
    rejected,
    dismissed
  };
};
