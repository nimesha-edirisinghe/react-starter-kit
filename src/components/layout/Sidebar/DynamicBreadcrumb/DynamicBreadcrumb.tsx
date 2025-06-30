'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage
} from '~/components/ui/breadcrumb';
import { useRouterState } from '@tanstack/react-router';
import React from 'react';

export function DynamicBreadcrumb() {
  const currentPath = useRouterState({
    select: (state) => state.location.pathname
  });

  if (currentPath === '/login') {
    return null;
  }

  const pathSegments = currentPath.split('/').filter(Boolean);

  if (pathSegments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary">Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;

    // Map path segments to translation keys
    let label = segment;
    switch (segment) {
      case 'incidents':
        label = 'Incidents';
        break;
      case 'live':
        label = 'Live';
        break;
      case 'dashboard':
        label = 'Dashboard';
        break;
      default:
        label = segment
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    }

    return { path, label, isLast };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item) => (
          <React.Fragment key={item.path}>
            <BreadcrumbItem className="text-primary">
              {item.isLast ? (
                <BreadcrumbPage className="text-primary">{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.path}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
