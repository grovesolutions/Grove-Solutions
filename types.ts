import React from 'react';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  features: string[];
}