
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { UnifiedPublishTicket } from '@/components/ticket/UnifiedPublishTicket';

const PublishTicket = () => {
  return (
    <DashboardLayout title="Publier un billet">
      <UnifiedPublishTicket isDashboard={true} />
    </DashboardLayout>
  );
};

export default PublishTicket;
