import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Return responsive font size classes based on screen size
 * @param sizes Object with size keys
 * @returns Tailwind classes string
 */
export function responsiveText({
  xs, 
  sm, 
  md, 
  lg, 
  base = 'text-sm'
}: {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  base?: string;
}) {
  const classes = [base];
  
  if (xs) classes.push(`xs:${xs}`);
  if (sm) classes.push(`sm:${sm}`);
  if (md) classes.push(`md:${md}`);
  if (lg) classes.push(`lg:${lg}`);
  
  return classes.join(' ');
}
