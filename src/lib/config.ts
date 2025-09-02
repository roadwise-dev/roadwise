// Domain configuration
export const rootDomain = process.env.ROOT_DOMAIN || 'roadwiseapp.com';

// Helper function to check if we're in a subdomain environment
export function isSubdomain(hostname: string): boolean {
  if (hostname.includes('localhost')) {
    return hostname.includes('.localhost');
  }
  
  return (
    hostname !== rootDomain &&
    hostname !== `www.${rootDomain}` &&
    hostname.endsWith(`.${rootDomain}`)
  );
}

// Extract subdomain from hostname
export function getSubdomain(hostname: string): string | null {
  if (hostname.includes('localhost')) {
    return hostname.includes('.localhost') ? hostname.split('.')[0] : null;
  }
  
  return isSubdomain(hostname) ? hostname.replace(`.${rootDomain}`, '') : null;
}