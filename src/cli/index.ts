#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { init } from './commands/init';
import { getPackageVersion } from './utils';

const program = new Command();

// Get version from package.json
const version = getPackageVersion();

program
  .name('s2-ui')
  .description('S2-UI - A streamlined UI component library for React with Tailwind CSS')
  .version(version);

// Init command
program
  .command('init')
  .description('Initialize a new S2-UI project configuration')
  .action(init);

// Add component command
program
  .command('add <component-name>')
  .description('Add a component to your project')
  .action((componentName) => {
    console.log(chalk.yellow('Add command is not fully implemented yet.'));
    console.log(`Requested to add: ${componentName}`);
  });

// Handle errors
program.exitOverride();
try {
  program.parse(process.argv);
} catch (err: any) {
  console.error(chalk.red('Error:'), err.message);
  process.exit(1);
} 