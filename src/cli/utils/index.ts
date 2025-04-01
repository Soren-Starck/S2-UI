import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';

/**
 * Get the current package version from package.json
 */
export function getPackageVersion(): string {
  try {
    // Read version from package.json in the S2-UI package
    const packagePath = path.resolve(__dirname, '../../../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    return packageJson.version || '0.0.0';
  } catch (error) {
    return '0.0.0';
  }
}

/**
 * Check if a file exists
 */
export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/**
 * Read and parse the S2-UI config file
 */
export function readConfig(configPath = 's2-ui.config.js'): Record<string, any> {
  const configFilePath = path.resolve(process.cwd(), configPath);
  
  if (!fileExists(configFilePath)) {
    throw new Error(`Config file not found at ${configFilePath}. Run 's2-ui init' to create one.`);
  }
  
  try {
    // We need to use require here to load the JS config
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(configFilePath);
  } catch (error) {
    throw new Error(`Failed to parse config file: ${error.message}`);
  }
}

/**
 * Install npm dependencies
 */
export async function installDependencies(
  dependencies: string[], 
  isDev = false
): Promise<void> {
  if (dependencies.length === 0) return;
  
  const args = ['install', ...dependencies];
  if (isDev) args.push('--save-dev');
  
  try {
    await execa('npm', args, { stdio: 'inherit' });
  } catch (error) {
    throw new Error(`Failed to install dependencies: ${error.message}`);
  }
}

/**
 * Check if a package is already installed
 */
export function isPackageInstalled(packageName: string): boolean {
  try {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    return (
      (packageJson.dependencies && packageJson.dependencies[packageName]) ||
      (packageJson.devDependencies && packageJson.devDependencies[packageName])
    );
  } catch (error) {
    return false;
  }
}

/**
 * Get peer dependencies of a package
 */
export async function getPackagePeerDependencies(packageName: string): Promise<string[]> {
  try {
    const { stdout } = await execa('npm', ['view', packageName, 'peerDependencies', '--json']);
    const peerDeps = JSON.parse(stdout);
    
    return Object.keys(peerDeps).map(dep => `${dep}@${peerDeps[dep]}`);
  } catch (error) {
    console.warn(`Warning: Could not fetch peer dependencies for ${packageName}`);
    return [];
  }
} 