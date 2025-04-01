import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { fileExists } from '../utils';

// Default config structure
interface S2UIConfig {
  componentRegistry: string;
  tailwindConfig: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    borderRadius: string;
  };
  animation: {
    enabled: boolean;
    defaultAnimation: string;
    defaultDuration: number;
  };
}

/**
 * Generate a config file template
 */
function generateConfigTemplate(config: S2UIConfig): string {
  return `/**
 * S2-UI Configuration
 * 
 * This file contains the configuration for the S2-UI library.
 */
module.exports = {
  // Path to the component registry file
  componentRegistry: '${config.componentRegistry}',
  
  // Path to the Tailwind CSS config file
  tailwindConfig: '${config.tailwindConfig}',
  
  // Theme configuration
  theme: {
    primary: '${config.theme.primary}',
    secondary: '${config.theme.secondary}',
    accent: '${config.theme.accent}',
    borderRadius: '${config.theme.borderRadius}',
  },

  // Animation configuration
  animation: {
    enabled: ${config.animation.enabled},
    defaultAnimation: '${config.animation.defaultAnimation}',
    defaultDuration: ${config.animation.defaultDuration},
  },
};
`;
}

/**
 * Initialize a new S2-UI configuration
 */
export async function init(): Promise<void> {
  console.log(chalk.blue('Initializing S2-UI configuration...'));

  const configPath = path.resolve(process.cwd(), 's2-ui.config.js');
  
  // Check if config already exists
  if (fileExists(configPath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'A configuration file already exists. Overwrite it?',
        default: false,
      },
    ]);
    
    if (!overwrite) {
      console.log(chalk.yellow('Initialization cancelled.'));
      return;
    }
  }

  // Get configuration from user
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'componentRegistry',
      message: 'Path to component registry file:',
      default: 'src/components/index.ts',
    },
    {
      type: 'input',
      name: 'tailwindConfig',
      message: 'Path to Tailwind CSS config:',
      default: 'tailwind.config.js',
    },
    {
      type: 'list',
      name: 'theme.primary',
      message: 'Primary color:',
      choices: ['blue', 'indigo', 'purple', 'red', 'green', 'yellow', 'cyan'],
      default: 'blue',
    },
    {
      type: 'list',
      name: 'theme.secondary',
      message: 'Secondary color:',
      choices: ['gray', 'slate', 'zinc', 'neutral', 'stone'],
      default: 'slate',
    },
    {
      type: 'list',
      name: 'theme.accent',
      message: 'Accent color:',
      choices: ['pink', 'rose', 'amber', 'lime', 'emerald', 'teal', 'sky'],
      default: 'pink',
    },
    {
      type: 'list',
      name: 'theme.borderRadius',
      message: 'Border radius style:',
      choices: ['none', 'sm', 'md', 'lg', 'full'],
      default: 'md',
    },
    {
      type: 'confirm',
      name: 'animation.enabled',
      message: 'Enable animations for components?',
      default: true,
    },
    {
      type: 'list',
      name: 'animation.defaultAnimation',
      message: 'Default animation style:',
      choices: [
        { name: 'Fade In', value: 'fadeIn' },
        { name: 'Slide Up', value: 'slideInUp' },
        { name: 'Slide Down', value: 'slideInDown' },
        { name: 'Slide Left', value: 'slideInLeft' },
        { name: 'Slide Right', value: 'slideInRight' },
        { name: 'Scale', value: 'scale' },
        { name: 'Rotate', value: 'rotate' },
        { name: 'Bounce', value: 'bounce' },
      ],
      default: 'fadeIn',
      when: (answers) => answers.animation.enabled,
    },
    {
      type: 'list',
      name: 'animation.defaultDuration',
      message: 'Animation duration:',
      choices: [
        { name: 'Fast (0.2s)', value: 0.2 },
        { name: 'Normal (0.3s)', value: 0.3 },
        { name: 'Slow (0.5s)', value: 0.5 },
      ],
      default: 0.3,
      when: (answers) => answers.animation.enabled,
    },
  ]);

  // Set default animation values if animations are disabled
  if (!answers.animation?.enabled) {
    answers.animation = {
      ...answers.animation,
      defaultAnimation: 'fadeIn',
      defaultDuration: 0.3,
    };
  }

  // Generate and write the config file
  const configContent = generateConfigTemplate(answers as S2UIConfig);
  
  try {
    fs.writeFileSync(configPath, configContent);
    console.log(chalk.green('✓ Configuration file created successfully!'));
    console.log(`Configuration saved to: ${chalk.cyan(configPath)}`);
    
    // Create component registry if it doesn't exist
    const registryPath = path.resolve(process.cwd(), answers.componentRegistry);
    const registryDir = path.dirname(registryPath);
    
    if (!fileExists(registryDir)) {
      fs.mkdirpSync(registryDir);
    }
    
    if (!fileExists(registryPath)) {
      fs.writeFileSync(
        registryPath,
        `/**
 * S2-UI Component Registry
 * 
 * This file is automatically updated by the s2-ui CLI when adding components.
 */

// Export all components here
`
      );
      console.log(chalk.green(`✓ Component registry created at: ${chalk.cyan(registryPath)}`));
    }
    
    console.log(chalk.blue('\nNext steps:'));
    console.log(`  1. Run ${chalk.cyan('npm install s2-ui')} to install the library`);
    console.log(`  2. Add components with ${chalk.cyan('npx s2-ui add <component-name>')}`);
  } catch (error) {
    console.error(chalk.red('Error creating configuration:'), error.message);
  }
} 