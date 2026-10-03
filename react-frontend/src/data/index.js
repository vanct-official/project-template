import { projectSetupCommands } from './projectSetup.js';
import { frontendCommands } from './frontend.js';
import { uiFrameworkCommands } from './uiFrameworks.js';
import { backendCommands } from './backend.js';
import { databaseCommands } from './databases.js';
import { authenticationCommands } from './authentication.js';
import { testingCommands } from './testing.js';
import { utilityCommands } from './utilities.js';
import { devopsCommands } from './devops.js';

export const CATEGORIES = [
  'All',
  'Project Setup',
  'Frontend',
  'UI Frameworks',
  'Backend',
  'Database',
  'Authentication',
  'Testing',
  'Utilities',
  'DevOps'
];

export const COMMAND_TYPES = [
  'all',
  'create',
  'install',
  'development',
  'build',
  'database',
  'docker',
  'git',
  'other'
];

export const TYPE_BADGE_CONFIG = {
  create: { label: 'CREATE', bg: 'bg-primary-subtle', text: 'text-primary', border: 'border-primary-subtle' },
  install: { label: 'INSTALL', bg: 'bg-success-subtle', text: 'text-success', border: 'border-success-subtle' },
  development: { label: 'DEV', bg: 'bg-warning-subtle', text: 'text-warning-emphasis', border: 'border-warning-subtle' },
  build: { label: 'BUILD', bg: 'bg-info-subtle', text: 'text-info-emphasis', border: 'border-info-subtle' },
  database: { label: 'DB', bg: 'bg-danger-subtle', text: 'text-danger', border: 'border-danger-subtle' },
  docker: { label: 'DOCKER', bg: 'bg-primary-subtle', text: 'text-primary-emphasis', border: 'border-primary-subtle' },
  git: { label: 'GIT', bg: 'bg-secondary-subtle', text: 'text-secondary-emphasis', border: 'border-secondary-subtle' },
  other: { label: 'OTHER', bg: 'bg-light', text: 'text-dark', border: 'border-secondary-subtle' }
};

export const allCommands = [
  ...projectSetupCommands,
  ...frontendCommands,
  ...uiFrameworkCommands,
  ...backendCommands,
  ...databaseCommands,
  ...authenticationCommands,
  ...testingCommands,
  ...utilityCommands,
  ...devopsCommands
];

export default allCommands;
