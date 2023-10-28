import {
  BoltIcon,
  Cog8ToothIcon,
  HomeIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { ComponentType } from 'react';
import { NavLink } from 'react-router-dom';

interface NavbarLink {
  path: string;
  IconComponent: ComponentType<{ className?: string }>;
  children: string;
}

function NavbarLink({ path, IconComponent, children }: NavbarLink) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center rounded-md p-[8px] font-semibold transition duration-300 ease-in-out hover:bg-indigo-700 hover:text-white ${
          isActive ? 'bg-indigo-700 text-white' : ''
        }`
      }
    >
      <IconComponent className="h-6 w-6" />
      <span className="pl-4">{children}</span>
    </NavLink>
  );
}

export default function NavBar() {
  return (
    <aside className="z-10 h-screen w-72 bg-indigo-600 px-4 py-6 text-indigo-200">
      <nav className="flex h-full flex-col">
        <BoltIcon className="mb-8 h-6 w-6" />
        <div className="flex h-full flex-1 flex-col justify-between">
          <ul className="flex flex-col space-y-2">
            <li>
              <NavbarLink path="/" IconComponent={HomeIcon}>
                Home
              </NavbarLink>
            </li>
            <li>
              <NavbarLink path="/tasks" IconComponent={Squares2X2Icon}>
                Tasks
              </NavbarLink>
            </li>
          </ul>
          <NavbarLink path="/settings" IconComponent={Cog8ToothIcon}>
            Settings
          </NavbarLink>
        </div>
      </nav>
    </aside>
  );
}
