import Link from 'next/link';

// 1. Define the type contract for a single navigation item
export interface NavItem {
  label: string;
  href: string;
  icon: string;       // Can be an emoji (📋) or an icon component path string
  isActive?: boolean; // Toggles whether this row shows as highlighted
}

// 2. Define the configuration props accepted by the sidebar element
interface SideNavigationBarProps {
  title: string;
  links: NavItem[];
}

export default function SideNavigationBar({ title, links }: SideNavigationBarProps) {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-6 space-y-6 hidden md:block select-none">
      <div>
        {/* Dynamic Sidebar Category Header text */}
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </h2>
        
        {/* Dynamic Navigation Row Mapper */}
        <nav className="mt-3 flex flex-col gap-1">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`px-3 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 transition-all duration-150 ${
                link.isActive
                  ? 'text-slate-900 bg-slate-100 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
