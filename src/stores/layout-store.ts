import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface LayoutState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}

export const useLayoutStore = create<LayoutState>()(
  devtools(
    (set) => ({
      sidebarOpen: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'layout/toggleSidebar'),
      closeSidebar: () => set({ sidebarOpen: false }, false, 'layout/closeSidebar'),
      openSidebar: () => set({ sidebarOpen: true }, false, 'layout/openSidebar')
    }),
    {
      name: 'LayoutStore'
    }
  )
);
