import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { TradingViewDataProvider } from "@/components/dashboard/TradingViewDataProvider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <TradingViewDataProvider>
          <div className="flex h-full flex-col">{children}</div>
        </TradingViewDataProvider>
      </SidebarInset>
    </>
  );
}
