# Music Streaming App - Material UI Design Guide

## Design Philosophy

This design guide provides specifications for a **minimal, soft, and elegant** music streaming application using Material UI components. The design emphasizes clean typography, gentle interactions, and a calming user experience that puts music first.

## Design Tokens

### Color Palette

#### Primary Colors

- **Primary**: `#6366f1` (Soft Indigo) - Main brand color for buttons, links, and accents
- **Primary Light**: `#a5b4fc` (Light Indigo) - Hover states and light backgrounds
- **Primary Dark**: `#4338ca` (Dark Indigo) - Active states and emphasis

#### Secondary Colors

- **Secondary**: `#f472b6` (Soft Pink) - Accent color for highlights and special elements
- **Secondary Light**: `#fbb6ce` (Light Pink) - Subtle backgrounds and gentle accents
- **Secondary Dark**: `#ec4899` (Dark Pink) - Strong accents and call-to-action elements

#### Background Colors

- **Background Default**: `#fafafa` (Off White) - Main app background
- **Background Paper**: `#ffffff` (Pure White) - Card and surface backgrounds
- **Background Level 1**: `#f5f5f5` (Light Gray) - Subtle contrast areas

#### Text Colors

- **Text Primary**: `#1f2937` (Charcoal) - Main text content
- **Text Secondary**: `#6b7280` (Medium Gray) - Supporting text and labels
- **Text Disabled**: `#9ca3af` (Light Gray) - Disabled states and placeholders

### Typography Scale

#### Font Family

- **Primary**: `'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif`
- Use Material UI's default typography with Inter as preferred font

#### Typography Variants

- **h1**: 2.25rem (36px) - Page titles and major headings
- **h2**: 1.875rem (30px) - Section headings
- **h3**: 1.5rem (24px) - Subsection headings
- **h4**: 1.25rem (20px) - Card titles and important labels
- **h5**: 1.125rem (18px) - List item titles
- **h6**: 1rem (16px) - Small headings and labels
- **body1**: 1rem (16px) - Primary body text
- **body2**: 0.875rem (14px) - Secondary body text
- **caption**: 0.75rem (12px) - Captions and small text

### Spacing System

- Use Material UI's spacing system (8px base unit)
- **xs**: 0.5 units (4px)
- **sm**: 1 unit (8px)
- **md**: 2 units (16px)
- **lg**: 3 units (24px)
- **xl**: 4 units (32px)

### Border Radius

- **Small**: 4px - Chips, small buttons
- **Medium**: 8px - Cards, inputs, buttons
- **Large**: 12px - Large cards, modals
- **Extra Large**: 16px - Hero sections, special containers

### Elevation (Box Shadow)

- **Level 1**: Subtle cards and surfaces
- **Level 2**: Hover states and elevated cards
- **Level 3**: Modals and floating elements
- **Level 4**: Tooltips and dropdowns

---

# Component Specifications

## 1. Button Components

### 1.1 Primary Button (MUI Button variant="contained")

**Visual Description**: Soft indigo background with white text, rounded corners (8px), gentle hover animation with slight elevation increase. Should feel approachable and confident.

**Specifications**:

- Color: Primary (#6366f1)
- Size: Medium (40px height)
- Border radius: 8px
- Hover: Darker shade with subtle lift effect
- Typography: Button text, medium weight

### 1.2 Secondary Button (MUI Button variant="outlined")

**Visual Description**: Transparent background with soft indigo border and text. Clean, minimal appearance that doesn't compete with primary actions.

**Specifications**:

- Border color: Primary (#6366f1)
- Text color: Primary (#6366f1)
- Hover: Light indigo background (rgba(99, 102, 241, 0.04))
- Same sizing as primary button

### 1.3 Text Button (MUI Button variant="text")

**Visual Description**: Minimal button with no background or border, used for secondary actions. Subtle hover state with light gray background.

**Specifications**:

- Text color: Text secondary (#6b7280)
- Hover: Light gray background (#f5f5f5)
- No elevation or borders

### 1.4 Icon Button (MUI IconButton)

**Visual Description**: Circular or rounded square buttons containing only icons. Soft, subtle hover states. Three sizes: small (24px), medium (32px), large (40px).

**Specifications**:

- Small: 24px × 24px
- Medium: 32px × 32px
- Large: 40px × 40px
- Hover: Light background with primary color icon
- Border radius: 50% for circular, 8px for square

### 1.5 Floating Action Button (MUI Fab)

**Visual Description**: Prominent circular button with primary color background, positioned fixed in bottom-right corner. Soft shadow and gentle hover animation.

**Specifications**:

- Size: 56px × 56px
- Position: Fixed bottom-right with 24px margin
- Color: Primary (#6366f1)
- Elevation: Level 3
- Hover: Slight scale increase and deeper shadow

## 2. Input Components

### 2.1 Text Field (MUI TextField)

**Visual Description**: Clean, minimal input fields with subtle borders. Floating labels that animate smoothly. Soft focus states with primary color accent.

**Specifications**:

- Variant: Outlined
- Border radius: 8px
- Focus color: Primary (#6366f1)
- Label color: Text secondary (#6b7280)
- Helper text: Caption typography
- Error state: Soft red (#ef4444)

### 2.2 Search Field (MUI TextField with InputAdornment)

**Visual Description**: Rounded input field with search icon on the left. Soft background color (#fafafa) when not focused, white when focused.

**Specifications**:

- Border radius: 24px (fully rounded)
- Background: #fafafa (unfocused), white (focused)
- Left icon: Search icon in text secondary color
- Placeholder text: Soft gray
- Border: Subtle gray, primary on focus

### 2.3 Slider (MUI Slider)

**Visual Description**: Thin track with primary color fill. Small, soft circular thumb with subtle shadow. Smooth animations.

**Specifications**:

- Track height: 4px
- Thumb size: 16px
- Primary color: #6366f1
- Track color: #e5e7eb
- Thumb has soft shadow for depth

### 2.4 Select/Dropdown (MUI Select)

**Visual Description**: Consistent with text fields but with dropdown arrow. Soft, rounded dropdown menu with subtle shadow.

**Specifications**:

- Same styling as TextField
- Dropdown: White background, soft shadow
- Menu items: Hover state with light gray background
- Border radius: 8px for dropdown

## 3. Card Components

### 3.1 Basic Card (MUI Card)

**Visual Description**: Clean white background with subtle shadow. Rounded corners for softness. Gentle hover animation with increased elevation.

**Specifications**:

- Background: White
- Border radius: 12px
- Elevation: Level 1 (default), Level 2 (hover)
- Hover: Subtle lift animation (2px translateY)

### 3.2 Album Card

**Visual Description**: Square aspect ratio card with album artwork, title, and artist name. Soft hover effect with slight scaling.

**Specifications**:

- Square aspect ratio for cover image
- Card padding: 16px
- Album title: h5 typography, primary text color
- Artist name: body2 typography, secondary text color
- Hover: Scale (1.02) and elevation increase

### 3.3 Song List Item Card

**Visual Description**: Horizontal layout with small album cover (48px), song info in the middle, and duration/actions on the right. Subtle hover background.

**Specifications**:

- Height: 72px
- Album cover: 48px × 48px with 6px border radius
- Song title: body1 typography, primary text
- Artist name: body2 typography, secondary text
- Hover: Light gray background (#fafafa)

### 3.4 Playlist Card

**Visual Description**: Larger card with playlist cover, title, description, and metadata. Clean, organized layout with emphasis on content.

**Specifications**:

- Cover image: 64px × 64px with 8px border radius
- Title: h4 typography, primary text
- Description: body2 typography, secondary text
- Metadata: caption typography, tertiary text
- Padding: 20px

## 4. Navigation Components

### 4.1 Tab Navigation (MUI Tabs)

**Visual Description**: Clean horizontal tabs with subtle underline indicator. Smooth animation when switching tabs.

**Specifications**:

- Indicator color: Primary (#6366f1)
- Active tab: Primary text color
- Inactive tabs: Secondary text color
- Indicator thickness: 2px
- Smooth transition animation

### 4.2 Bottom Navigation (MUI BottomNavigation)

**Visual Description**: Fixed bottom navigation with icons and labels. Active state uses primary color, inactive uses secondary text color.

**Specifications**:

- Height: 64px
- Background: White with top border
- Active color: Primary (#6366f1)
- Inactive color: Text secondary (#6b7280)
- Icon size: 24px
- Typography: Caption

### 4.3 App Bar (MUI AppBar)

**Visual Description**: Clean header with white background and subtle bottom border. Contains logo, search, and user actions.

**Specifications**:

- Background: White
- Height: 72px
- Bottom border: 1px solid #e5e7eb
- Elevation: Level 1
- Content: Logo (left), Search (center), Actions (right)

### 4.4 Drawer/Sidebar (MUI Drawer)

**Visual Description**: Side navigation with white background, organized sections, and clear visual hierarchy.

**Specifications**:

- Width: 240px
- Background: White
- Right border: 1px solid #e5e7eb
- Section headers: Caption typography, uppercase
- Navigation items: body2 typography
- Active item: Primary color with soft background

## 5. Data Display Components

### 5.1 List (MUI List)

**Visual Description**: Clean, minimal list with subtle dividers. Consistent padding and typography hierarchy.

**Specifications**:

- Divider color: #f3f4f6
- Item padding: 16px
- Primary text: body1 typography
- Secondary text: body2 typography
- Hover: Light gray background

### 5.2 Table (MUI Table)

**Visual Description**: Clean table with subtle borders and alternating row backgrounds for large datasets.

**Specifications**:

- Header background: #fafafa
- Header text: body2 typography, medium weight
- Row hover: Light gray background
- Cell padding: 16px vertical, 24px horizontal
- Border color: #f3f4f6

### 5.3 Chip (MUI Chip)

**Visual Description**: Soft, rounded pills for tags and categories. Light background with subtle border.

**Specifications**:

- Background: #f5f5f5
- Border: 1px solid #e5e7eb
- Border radius: 16px
- Typography: body2
- Hover: Slightly darker background
- Selected: Primary color background

### 5.4 Badge (MUI Badge)

**Visual Description**: Small circular indicators overlaid on other components. Soft colors that don't overpower the interface.

**Specifications**:

- Background: Secondary (#f472b6)
- Text: White
- Size: 20px height minimum
- Border radius: 10px
- Typography: Caption, medium weight

## 6. Media Components

### 6.1 Audio Player Card

**Visual Description**: Prominent card containing current track info, progress bar, and playback controls. Clean, focused design that highlights the music.

**Specifications**:

- Large album cover: 64px × 64px
- Track title: h4 typography, primary text
- Artist name: body1 typography, secondary text
- Progress bar: Custom styled slider
- Control buttons: Large icon buttons (48px)
- Play button: Primary color background

### 6.2 Mini Player

**Visual Description**: Compact player that appears at the bottom of the screen. Contains essential controls and track info.

**Specifications**:

- Height: 72px
- Background: White with top border
- Album cover: 48px × 48px
- Track info: Limited to single line with ellipsis
- Control buttons: Medium size (32px)

### 6.3 Volume Control

**Visual Description**: Horizontal slider with volume icon. Clean, minimal design that integrates seamlessly.

**Specifications**:

- Slider width: 100px
- Volume icon: 20px × 20px
- Slider styling: Matches audio progress bar
- Icon color: Secondary text color

## 7. Feedback Components

### 7.1 Dialog/Modal (MUI Dialog)

**Visual Description**: Centered modal with soft rounded corners and subtle shadow. Clean header with close button.

**Specifications**:

- Border radius: 12px
- Max width: 600px
- Elevation: Level 4
- Header padding: 24px
- Body padding: 24px
- Action area: 16px top padding, 24px horizontal

### 7.2 Snackbar (MUI Snackbar)

**Visual Description**: Subtle notification that appears at the bottom of the screen. Soft colors and gentle animation.

**Specifications**:

- Position: Bottom center
- Border radius: 8px
- Background: Based on severity (success, error, warning, info)
- Typography: body2
- Duration: 4000ms

### 7.3 Alert (MUI Alert)

**Visual Description**: Prominent notification with icon and message. Soft colors that convey meaning without being harsh.

**Specifications**:

- Border radius: 8px
- Soft background colors for each severity
- Icon: 24px × 24px
- Typography: body2
- Padding: 16px

### 7.4 Skeleton (MUI Skeleton)

**Visual Description**: Smooth loading placeholders with subtle animation. Soft gray color that doesn't distract.

**Specifications**:

- Background: #f5f5f5
- Animation: Soft wave effect
- Border radius: Matches component being loaded
- Opacity: 0.7

## 8. Layout Components

### 8.1 Container (MUI Container)

**Visual Description**: Responsive container with appropriate max-widths for different screen sizes.

**Specifications**:

- Max width: lg (1200px)
- Padding: 24px horizontal on mobile, 32px on desktop
- Centered alignment

### 8.2 Grid (MUI Grid)

**Visual Description**: Responsive grid system with consistent spacing between items.

**Specifications**:

- Spacing: 3 units (24px) on desktop, 2 units (16px) on mobile
- Responsive breakpoints: xs, sm, md, lg, xl

### 8.3 Stack (MUI Stack)

**Visual Description**: Vertical or horizontal layout with consistent spacing between children.

**Specifications**:

- Default spacing: 2 units (16px)
- Responsive spacing adjustments
- Dividers: Subtle gray lines when needed

## 9. Specialized Music Components

### 9.1 Equalizer Visualization

**Visual Description**: Animated bars representing audio levels. Soft primary colors with smooth animations.

**Specifications**:

- Bar color: Primary (#6366f1) with opacity variations
- Background: Light gray (#f5f5f5)
- Animation: Smooth, organic movement
- Height: 32px typical

### 9.2 Waveform Display

**Visual Description**: Audio waveform with primary color fill for played portion and light gray for remaining.

**Specifications**:

- Played portion: Primary color (#6366f1)
- Unplayed portion: Light gray (#e5e7eb)
- Height: 64px typical
- Clickable for seeking

### 9.3 Genre Tag Cloud

**Visual Description**: Collection of genre chips with varying sizes based on popularity. Soft colors and gentle hover effects.

**Specifications**:

- Use MUI Chip component
- Size variations: small, medium, large
- Soft color palette with low saturation
- Hover: Subtle scale increase

### 9.4 Artist Avatar Group

**Visual Description**: Overlapping circular avatars for featured artists. Soft shadows and subtle borders.

**Specifications**:

- Avatar size: 40px × 40px
- Overlap: 8px
- Border: 2px white border
- Shadow: Soft drop shadow

## 10. Responsive Design Guidelines

### Breakpoints

- **xs**: 0px - Mobile portrait
- **sm**: 600px - Mobile landscape
- **md**: 900px - Tablet
- **lg**: 1200px - Desktop
- **xl**: 1536px - Large desktop

### Mobile Adaptations

- **Navigation**: Bottom navigation for main sections
- **Cards**: Full-width cards with reduced padding
- **Typography**: Slightly smaller sizes for mobile
- **Spacing**: Reduced margins and padding
- **Touch targets**: Minimum 44px for interactive elements

### Desktop Enhancements

- **Sidebar**: Persistent left navigation
- **Hover states**: Rich hover effects and animations
- **Larger content**: More information density
- **Keyboard navigation**: Full keyboard support

## 11. Accessibility Considerations

### Color Contrast

- All text meets WCAG AA standards
- Focus indicators are clearly visible
- Color is not the only way to convey information

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Clear focus indicators
- Logical tab order

### Screen Reader Support

- Proper semantic HTML structure
- Aria labels for complex components
- Alternative text for images

### Motion and Animation

- Respect user preferences for reduced motion
- Animations are subtle and purposeful
- No flashing or strobing effects

## 12. Implementation Notes

### Material UI Theme Configuration

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      light: '#a5b4fc',
      dark: '#4338ca',
    },
    secondary: {
      main: '#f472b6',
      light: '#fbb6ce',
      dark: '#ec4899',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    // Component customizations
  },
});
```

### Component Customization

- Use `sx` prop for one-off customizations
- Create custom theme components for repeated patterns
- Leverage Material UI's theming system for consistency

### Performance Considerations

- Use `React.memo` for expensive components
- Implement virtualization for long lists
- Lazy load images and heavy components
- Optimize bundle size with tree shaking

This design guide provides a comprehensive foundation for building a beautiful, accessible, and user-friendly music streaming application using Material UI components with a soft, minimal aesthetic.
