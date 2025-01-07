# ShapeForge Development TODOs

## Enhanced Shape Customization
- [ ] Implement shape background appearance properties
  - [ ] Add layered appearance options for shapes
  - [ ] Create presets for common damage patterns (light/medium/severe)
  - [ ] Allow custom patterns/gradients for different damage types
  - [ ] Add opacity controls for each layer
  - [ ] Enable layer blending modes

## Exportable Component System
- [ ] Create standalone Konva Scene React Component
  - [ ] Package core functionality into reusable component
  - [ ] Maintain aspect ratio scaling system
  - [ ] Preserve interactive features (tooltips)
  - [ ] Include shape control props
    - [ ] onClick handlers
    - [ ] onHover effects
    - [ ] visibility toggles
    - [ ] disabled states
  - [ ] Add documentation for component usage
  - [ ] Create example integration guide

## Responsive Preview System
- [ ] Implement multi-device preview mode
  - [ ] Add viewport size presets
    - [ ] Desktop (1920x1080, 1440x900)
    - [ ] Tablet (1024x768, 768x1024)
    - [ ] Mobile (375x667, 390x844)
  - [ ] Create preview controls panel
  - [ ] Ensure consistent aspect ratio scaling
  - [ ] Validate touch interactions for mobile
  - [ ] Test shape positioning consistency
  - [ ] Add responsive layout guidelines

## Priority Order
1. Responsive Preview System (foundational for other features)
2. Enhanced Shape Customization (builds on existing shape system)
3. Exportable Component System (requires stable core features)

## Notes
- All features should support the core use cases (vehicle customization, building plans, technical diagrams, medical imaging)
- Maintain performance considerations for complex shapes and multiple layers
- Consider adding automated tests for responsive behaviors
- Document all new features in the main app outline 