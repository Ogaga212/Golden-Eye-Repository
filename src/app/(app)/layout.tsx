import { AppSidebar } from '@/components/layout/sidebar';
import { SidebarInset } from '@/components/ui/sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-full flex-col">
          {children}
        </div>
      </SidebarInset>
    </>
  );
}
