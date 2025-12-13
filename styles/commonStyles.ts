import { StyleSheet } from 'react-native';

// ============================================================================
// COLOR PALETTES
// ============================================================================

/**
 * Light Mode Color Palette
 * 
 * Optimized for readability and accessibility in light mode.
 * Features warm gold accents inspired by American heritage.
 */
export const colors = {
  // Base colors
  background: '#FAFAFA',
  text: '#2C2C2C',
  textSecondary: '#8B8B8B',
  
  // Brand colors
  primary: '#D4AF37', // Gold
  secondary: '#C0C0C0',
  accent: '#DC2626',
  
  // Surface colors
  card: '#FFFFFF',
  highlight: '#FEF3C7',
  
  // Gradient colors
  gradientStart: '#1E3A8A', // Deep blue
  gradientEnd: '#7C2D12', // Deep red
  goldGradientStart: '#FBBF24', // Bright gold
  goldGradientEnd: '#F59E0B', // Deep gold
  
  // Effect colors
  cardOverlay: 'rgba(255, 255, 255, 0.85)',
  shadowColor: '#000000',
  glowColor: 'rgba(212, 175, 55, 0.25)', // Gold glow
  borderGlow: 'rgba(212, 175, 55, 0.4)',
  heroOverlay: 'rgba(0, 0, 0, 0.1)',
} as const;

/**
 * Dark Mode Color Palette
 * 
 * Optimized for low-light viewing with enhanced contrast.
 * Uses brighter gold tones for better visibility in dark mode.
 */
export const darkColors = {
  // Base colors
  background: '#0A0A0A', // Deeper black
  text: '#F5F5F5',
  textSecondary: '#A0A0A0',
  
  // Brand colors (adjusted for dark mode)
  primary: '#F59E0B', // Brighter gold for dark mode
  secondary: '#707070',
  accent: '#EF4444',
  
  // Surface colors
  card: '#1A1A1A', // Slightly lighter than background
  highlight: '#2A2520',
  
  // Gradient colors
  gradientStart: '#1E3A8A', // Deep blue
  gradientEnd: '#7C2D12', // Deep red
  goldGradientStart: '#FBBF24', // Bright gold
  goldGradientEnd: '#F59E0B', // Mid gold
  
  // Effect colors
  cardOverlay: 'rgba(26, 26, 26, 0.85)',
  shadowColor: '#000000',
  glowColor: 'rgba(245, 158, 11, 0.3)', // Gold glow - stronger in dark
  borderGlow: 'rgba(245, 158, 11, 0.5)',
  heroOverlay: 'rgba(0, 0, 0, 0.3)',
} as const;

// ============================================================================
// ANIMATION CONFIGURATIONS
// ============================================================================

/**
 * Animation timing and spring configurations
 * 
 * Provides consistent animation timing across the app.
 * Spring configurations for smooth, natural animations.
 */
export const animations = {
  /** Fast transitions (200ms) - for micro-interactions */
  fast: 200,
  /** Normal transitions (300ms) - default for most animations */
  normal: 300,
  /** Slow transitions (500ms) - for dramatic effects */
  slow: 500,
  
  /** Duration presets for better naming */
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  
  /** Spring animation configuration */
  spring: {
    damping: 15,
    stiffness: 150,
  },
} as const;

// ============================================================================
// SHADOW STYLES
// ============================================================================

/**
 * Shadow style presets
 * 
 * Provides consistent elevation across platforms.
 * Includes special glow effect for accent elements.
 */
export const shadows = {
  /** Small shadow - for cards and buttons */
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  /** Medium shadow - for floating elements */
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  
  /** Large shadow - for prominent elements */
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  
  /** Gold glow effect - for accent elements */
  glow: {
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

// ============================================================================
// GLASSMORPHISM EFFECTS
// ============================================================================

/**
 * Glassmorphism style configuration
 * 
 * For creating frosted glass effects with BlurView.
 * Used in tab bars, modals, and overlays.
 * 
 * @example
 * ```tsx
 * <BlurView
 *   intensity={glassmorphism.blur}
 *   style={{ opacity: glassmorphism.opacity }}
 * >
 *   <View style={{ borderWidth: glassmorphism.borderWidth }}>
 *     {children}
 *   </View>
 * </BlurView>
 * ```
 */
export const glassmorphism = {
  /** Blur intensity for BlurView */
  blur: 10,
  /** Background opacity */
  opacity: 0.8,
  /** Border width for glass edge */
  borderWidth: 1,
  /** Border opacity */
  borderOpacity: 0.2,
} as const;

// ============================================================================
// BUTTON STYLES
// ============================================================================

/**
 * Reusable button styles
 * 
 * @deprecated Consider using the Button component instead
 * These styles are kept for backward compatibility
 */
export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    width: '100%',
  },
});

// ============================================================================
// COMMON STYLES
// ============================================================================

/**
 * Common layout and component styles
 * 
 * Reusable styles for consistent layout across screens.
 * Use these as base styles and extend with theme-specific colors.
 * 
 * @example
 * ```tsx
 * <View style={[commonStyles.container, { backgroundColor: colors.background }]}>
 *   <Text style={[commonStyles.title, { color: colors.text }]}>Title</Text>
 * </View>
 * ```
 */
export const commonStyles = StyleSheet.create({
  /** Full-screen wrapper */
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  
  /** Flex container for screens */
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  
  /** Centered content container */
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  
  /** Page title style */
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10,
  },
  
  /** Body text style */
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  
  /** Full-width section wrapper */
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  /** Button container with horizontal padding */
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  /** Standard card style */
  card: {
    backgroundColor: colors.card,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    ...shadows.small,
  },
  
  /** Icon style */
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

/**
 * Type definitions for better TypeScript support
 */
export type ColorPalette = typeof colors;
export type ShadowStyle = typeof shadows.small;
export type AnimationConfig = typeof animations;