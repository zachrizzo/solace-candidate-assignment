import { BaseComponentProps } from "./index";

/**
 * Props for page header components
 */
export interface PageHeaderProps extends BaseComponentProps {
  /** The title of the page */
  title: string;
  /** The description or subtitle of the page */
  description: string;
}

/**
 * Props for card components
 */
export interface CardProps extends BaseComponentProps {
  /** Title of the card */
  title?: string;
  /** Whether the card has a hover effect */
  hover?: boolean;
  /** Whether the card has a border */
  bordered?: boolean;
  /** Additional content to render in the card */
  children?: React.ReactNode;
}

/**
 * Props for button components
 */
export interface ButtonProps extends BaseComponentProps {
  /** Button label text */
  label?: string;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Button size variant */
  size?: "sm" | "md" | "lg";
  /** Button variant type */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Click handler */
  onClick?: () => void;
  /** Button contents */
  children?: React.ReactNode;
}
