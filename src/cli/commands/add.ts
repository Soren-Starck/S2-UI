import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import {
  readConfig,
  fileExists,
  installDependencies,
  isPackageInstalled,
  getPackagePeerDependencies
} from '../utils';

/**
 * Add a component to the project
 */
export async function add(componentName: string): Promise<void> {
  try {
    console.log(chalk.blue(`Adding component: ${componentName}...`));
    
    // Read config
    const config = readConfig();
    
    // Validate component name
    if (!componentName) {
      throw new Error('Component name is required');
    }

    // Format component package name
    const packageName = componentName.startsWith('@')
      ? componentName
      : `@s2-ui/${componentName.toLowerCase()}`;
    
    // Check if package is already installed
    if (isPackageInstalled(packageName)) {
      console.log(chalk.yellow(`Package ${packageName} is already installed.`));
    } else {
      // Install the component package
      console.log(chalk.blue(`Installing ${packageName}...`));
      await installDependencies([packageName]);
      console.log(chalk.green(`✓ Installed ${packageName}`));
      
      // Get and install peer dependencies
      const peerDeps = await getPackagePeerDependencies(packageName);
      if (peerDeps.length > 0) {
        console.log(chalk.blue(`Installing peer dependencies: ${peerDeps.join(', ')}...`));
        await installDependencies(peerDeps);
        console.log(chalk.green('✓ Peer dependencies installed'));
      }
    }
    
    // Update component registry
    const registryPath = path.resolve(process.cwd(), config.componentRegistry);
    
    if (!fileExists(registryPath)) {
      throw new Error(`Component registry not found at ${registryPath}. Run 's2-ui init' first.`);
    }
    
    // Read the registry file
    let registryContent = fs.readFileSync(registryPath, 'utf8');
    
    // Format the component name for import
    const formattedName = componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase();
    
    // Check if component is already imported
    if (registryContent.includes(`from '${packageName}'`)) {
      console.log(chalk.yellow(`Component ${formattedName} is already in the registry.`));
    } else {
      // Add import statement
      const importStatement = `export { ${formattedName} } from '${packageName}';\n`;
      
      // Append to the end of the file or after the last export
      const lastExportIndex = registryContent.lastIndexOf('export');
      
      if (lastExportIndex === -1) {
        // No exports yet, add after comments
        registryContent += '\n' + importStatement;
      } else {
        // Find the end of the last export line
        const lastExportLineEnd = registryContent.indexOf('\n', lastExportIndex);
        const insertPosition = lastExportLineEnd !== -1 ? lastExportLineEnd + 1 : registryContent.length;
        
        registryContent = 
          registryContent.slice(0, insertPosition) + 
          importStatement + 
          registryContent.slice(insertPosition);
      }
      
      // Write the updated registry
      fs.writeFileSync(registryPath, registryContent);
      console.log(chalk.green(`✓ Updated component registry with ${formattedName}`));
    }
    
    console.log(chalk.green(`\n✓ Component ${formattedName} added successfully!`));
    console.log(`\nImport it in your code with: ${chalk.cyan(`import { ${formattedName} } from '${config.componentRegistry.replace('.ts', '')}';`)}`);
  } catch (error: any) {
    console.error(chalk.red('Error adding component:'), error.message);
  }
} 