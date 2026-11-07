import SideNavigationBar, { NavItem } from '@/components/side-navigation-bar';

export default function AppWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // Define your current project's navigation items configuration
  const workspaceLinks: NavItem[] = [
    {
      label: 'All Weekly Meetings',
      href: '/meetings',
      icon: '📋',
      isActive: true, // You can toggle this dynamically using your active route path later!
    },
    // {
    //   label: 'Schedule New Sunday',
    //   href: '/meetings/create',
    //   icon: '➕',
    //   isActive: false,
    // }
  ];

  return (
    <div className="flex flex-1 min-h-[calc(100vh-4rem)] bg-slate-50 font-sans">
      
      {/* Reusable, modular navigation sidebar bar element */}
      <SideNavigationBar 
        title="Sacrament Workspace" 
        links={workspaceLinks} 
      />

      {/* Main Content Workspace Action Area */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
        {children}
      </main>

    </div>
  );
}
