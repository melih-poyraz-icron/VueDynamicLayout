# Vue Dynamic Layout with DevExtreme

A Vue 3 application featuring a clean JSON-based DSL (Domain Specific Language) for building dynamic layouts with DevExtreme components.

## 🚀 Features

- **JSON Layout DSL**: Define complex layouts using simple JSON configuration
- **DevExtreme Integration**: Full support for DevExtreme Vue components
- **Dynamic Rendering**: Components are rendered dynamically from JSON definitions
- **Flexible Layouts**: Support for vertical, horizontal, and grid-based layouts
- **Type-safe**: Structured schema for predictable layout definitions

## 📦 Installation

```bash
npm install
```

## 🏃‍♂️ Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🎨 JSON Layout DSL

### Basic Structure

```json
{
  "type": "container" | "component",
  "component": "DxButton" | "DxTextBox" | "DxDataGrid" | ...,
  "layout": "vertical" | "horizontal" | "grid",
  "props": { ... },
  "style": { ... },
  "class": "css-class-names",
  "children": [ ... ],
  "events": { ... }
}
```

### Container Types

#### Vertical Layout
```json
{
  "type": "container",
  "layout": "vertical",
  "style": { "gap": "20px" },
  "children": [ ... ]
}
```

#### Horizontal Layout
```json
{
  "type": "container",
  "layout": "horizontal",
  "style": { "gap": "10px" },
  "children": [ ... ]
}
```

#### Grid Layout
```json
{
  "type": "container",
  "layout": "grid",
  "gridTemplate": {
    "columns": "repeat(2, 1fr)",
    "rows": "auto",
    "gap": "20px"
  },
  "children": [ ... ]
}
```

### Component Definition

```json
{
  "type": "component",
  "component": "DxButton",
  "props": {
    "text": "Click Me",
    "type": "default",
    "width": 120
  },
  "style": {
    "marginTop": "10px"
  },
  "events": {
    "click": "handleClick"
  }
}
```

### Event Handlers

Define event handlers in your Vue component and pass them to LayoutRenderer:

**Generic Handler Pattern (Recommended):**
```javascript
const eventHandlers = {
  // Single handler for all buttons
  handleButtonClick: (e, args = {}) => {
    const { 
      action, 
      message, 
      notifyType = 'info',
      callback 
    } = args
    
    // Show notification
    if (message) {
      notify(message, notifyType, 2000)
    }
    
    // Log action
    console.log('Button clicked:', { action, args, event: e })
    
    // Execute custom callback if provided
    if (callback && typeof callback === 'function') {
      callback(e, args)
    }
  }
}
```

**In template:**
```vue
<LayoutRenderer :layout="myLayout" :eventHandlers="eventHandlers" />
```

**In layout JSON (with arguments):**
```javascript
{
  type: "component",
  component: "DxButton",
  props: { text: "Submit" },
  events: {
    click: {
      handler: "handleButtonClick",
      args: {
        action: "submit",
        message: "Form submitted successfully!",
        notifyType: "success"
      }
    }
  }
}
```

**In layout JSON (simple format):**
```javascript
{
  type: "component",
  component: "DxButton",
  props: { text: "Click" },
  events: {
    click: "handleButtonClick"  // Simple string reference (no args)
  }
}
```

**Benefits:**
- ✅ Single handler for all buttons
- ✅ Consistent notification handling
- ✅ Easy to maintain and test
- ✅ Flexible with custom callbacks
- ✅ Reusable across layouts

### API Data Source

Components can fetch data from REST APIs:

```json
{
  "type": "component",
  "component": "DxDataGrid",
  "props": {
    "dataSource": {
      "api": "https://api.example.com/users"
    },
    "columns": [
      { "dataField": "id", "caption": "ID" },
      { "dataField": "name", "caption": "Name" },
      { "dataField": "email", "caption": "Email" }
    ]
  }
}
```

## 📚 Supported Components

### Form Components
- `DxButton` - Button component
- `DxTextBox` - Single-line text input
- `DxTextArea` - Multi-line text input
- `DxNumberBox` - Numeric input
- `DxSelectBox` - Dropdown selection
- `DxDateBox` - Date picker
- `DxCheckBox` - Checkbox
- `DxRadioGroup` - Radio button group

### Data Components
- `DxDataGrid` - Advanced data grid
- `DxList` - List component
- `DxTreeView` - Tree structure view

### Visualization
- `DxChart` - Chart component

### Layout Components
- `DxTabPanel` - Tabbed interface
- `DxAccordion` - Accordion/collapsible panels

### Overlay Components
- `DxPopup` - Modal popup
- `DxLoadPanel` - Loading indicator

## 📖 Example Layouts

### Form Layout
```javascript
{
  type: "container",
  layout: "vertical",
  style: { gap: "20px" },
  children: [
    {
      type: "component",
      component: "DxTextBox",
      props: {
        label: "Name",
        labelMode: "floating",
        placeholder: "Enter your name"
      }
    },
    {
      type: "component",
      component: "DxButton",
      props: {
        text: "Submit",
        type: "default"
      }
    }
  ]
}
```

### Data Grid with API
The grid layout example fetches data from JSONPlaceholder API:
```javascript
{
  type: "component",
  component: "DxDataGrid",
  props: {
    dataSource: {
      api: "https://jsonplaceholder.typicode.com/users"
    },
    columns: [
      { dataField: "id", caption: "ID" },
      { dataField: "name", caption: "Name" },
      { dataField: "email", caption: "Email" }
    ],
    filterRow: { visible: true },
    searchPanel: { visible: true }
  }
}
```

### Dashboard Layout
```javascript
{
  type: "container",
  layout: "grid",
  gridTemplate: {
    columns: "repeat(2, 1fr)",
    gap: "20px"
  },
  children: [
    // Dashboard widgets
  ]
}
```

## 🗂️ Project Structure

```
VueDynamicLayout/
├── src/
│   ├── components/
│   │   ├── LayoutRenderer.vue      # Dynamic layout renderer
│   │   └── componentRegistry.js    # DevExtreme component registry
│   ├── layouts/
│   │   ├── schema.js               # DSL schema documentation
│   │   └── sampleLayouts.js        # Sample layout definitions
│   ├── App.vue                     # Main application component
│   └── main.js                     # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🔧 Extending the DSL

### Adding New Components

1. Import the component in `componentRegistry.js`:
```javascript
import { DxNewComponent } from 'devextreme-vue/new-component'
```

2. Add to the registry:
```javascript
export const componentRegistry = {
  // ... existing components
  DxNewComponent
}
```

3. Use in your layout:
```json
{
  "type": "component",
  "component": "DxNewComponent",
  "props": { ... }
}
```

### Custom Event Handlers

Define event handlers in your Vue component and reference them in the layout:

```json
{
  "type": "component",
  "component": "DxButton",
  "events": {
    "click": "handleButtonClick"
  }
}
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
