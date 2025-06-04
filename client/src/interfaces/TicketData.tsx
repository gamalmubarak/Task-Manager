import { UserData } from './UserData';

export interface TicketData {
  id: string;
  name: string;
  description: string;
  status: string;
  assignedUserId: string;
  assignedUser: UserData | null;
}
