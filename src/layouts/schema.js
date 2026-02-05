/**
 * JSON Layout DSL for Vue + DevExtreme
 * 
 * This DSL allows you to define dynamic layouts using JSON configuration.
 * 
 * Layout Structure:
 * {
 *   "type": "container" | "component",
 *   "component": "DxButton" | "DxTextBox" | "DxDataGrid" | etc.,
 *   "layout": "vertical" | "horizontal" | "grid",
 *   "props": { ... component properties ... },
 *   "style": { ... CSS styles ... },
 *   "class": "css-class-names",
 *   "children": [ ... nested layouts ... ],
 *   "events": { "eventName": "handlerName" }
 * }
 * 
 * Key Concepts:
 * 
 * 1. Container - Groups multiple components
 *    - type: "container"
 *    - layout: "vertical" | "horizontal" | "grid"
 *    - children: array of child layouts
 * 
 * 2. Component - DevExtreme component
 *    - type: "component"
 *    - component: DevExtreme component name (e.g., "DxButton")
 *    - props: component properties
 *    - events: event handlers
 * 
 * 3. Grid Layout - CSS Grid based layout
 *    - layout: "grid"
 *    - gridTemplate: { columns: "1fr 1fr", rows: "auto", gap: "20px" }
 * 
 * Example:
 * {
 *   "type": "container",
 *   "layout": "vertical",
 *   "style": { "gap": "20px" },
 *   "children": [
 *     {
 *       "type": "component",
 *       "component": "DxButton",
 *       "props": {
 *         "text": "Click Me",
 *         "type": "default"
 *       }
 *     }
 *   ]
 * }
 */

export const layoutSchema = {
  version: "1.0.0",
  description: "JSON Layout DSL for Vue + DevExtreme"
}
