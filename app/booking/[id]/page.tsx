// app/booking/[id]/page.tsx
import RouteBookingForm from '@/components/static-booking-form';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params; 

  return <RouteBookingForm id={id} />;
}
