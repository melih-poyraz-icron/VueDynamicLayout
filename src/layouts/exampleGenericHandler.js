/**
 * Generic Button Click Handler Pattern
 * 
 * This example demonstrates how to use a single generic handler for all buttons
 * in your dynamic layouts, making your code more maintainable and consistent.
 */

// ============================================
// 1. Define Generic Handler in Parent Component
// ============================================

const eventHandlers = {
  handleButtonClick: (e, args = {}) => {
    const { 
      action,           // Identifier for the action being performed
      message,          // Notification message to display
      notifyType,       // Notification type: 'success', 'info', 'warning', 'error'
      callback,         // Optional custom callback function
      ...customData     // Any additional data
    } = args
    
    // Show notification
    if (message) {
      notify(message, notifyType || 'info', 2000)
    }
    
    // Log the action
    console.log('Button clicked:', { 
      action, 
      args, 
      event: e 
    })
    
    // Execute custom callback if provided
    if (callback && typeof callback === 'function') {
      callback(e, args)
    }
  }
}

// ============================================
// 2. Use in Layout with Different Arguments
// ============================================

const layout = {
  type: "container",
  children: [
    // Example 1: Submit button
    {
      type: "component",
      component: "DxButton",
      props: {
        text: "Submit",
        type: "default"
      },
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
    },
    
    // Example 2: Cancel button
    {
      type: "component",
      component: "DxButton",
      props: {
        text: "Cancel",
        type: "normal"
      },
      events: {
        click: {
          handler: "handleButtonClick",
          args: {
            action: "cancel",
            message: "Operation cancelled",
            notifyType: "info"
          }
        }
      }
    },
    
    // Example 3: Delete button with custom callback
    {
      type: "component",
      component: "DxButton",
      props: {
        text: "Delete",
        type: "danger"
      },
      events: {
        click: {
          handler: "handleButtonClick",
          args: {
            action: "delete",
            message: "Item deleted",
            notifyType: "warning",
            callback: (e, args) => {
              // Custom logic for delete
              deleteItem(args.itemId)
            },
            itemId: 123
          }
        }
      }
    },
    
    // Example 4: Simple button without notification
    {
      type: "component",
      component: "DxButton",
      props: {
        text: "Refresh"
      },
      events: {
        click: {
          handler: "handleButtonClick",
          args: {
            action: "refresh"
            // No message = no notification shown
          }
        }
      }
    }
  ]
}

// ============================================
// 3. Advanced: Action-Based Handler
// ============================================

const eventHandlers = {
  handleButtonClick: (e, args = {}) => {
    const { 
      action, 
      message, 
      notifyType = 'info',
      ...rest
    } = args
    
    // Show notification
    if (message) {
      notify(message, notifyType, 2000)
    }
    
    // Handle specific actions
    switch(action) {
      case 'submit':
        handleSubmit(rest)
        break
      case 'delete':
        handleDelete(rest)
        break
      case 'save':
        handleSave(rest)
        break
      case 'export':
        handleExport(rest)
        break
      default:
        console.log('Action:', action, rest)
    }
  }
}

// ============================================
// 4. Benefits of Generic Handler
// ============================================

/**
 * Advantages:
 * 
 * 1. Consistency - All buttons use the same handler structure
 * 2. Maintainability - Single place to update notification logic
 * 3. Flexibility - Easy to add new button actions
 * 4. Reusability - Same pattern works across all layouts
 * 5. Type Safety - Can add TypeScript types to args
 * 6. Testability - Single handler to test instead of many
 * 7. DRY Principle - Don't repeat notification/logging code
 * 
 * Best Practices:
 * 
 * - Always include an 'action' to identify button purpose
 * - Use consistent notifyType values
 * - Add custom data through additional args properties
 * - Use callback for complex/async operations
 * - Keep handler logic simple, delegate to other functions
 */

// ============================================
// 5. TypeScript Example (Optional)
// ============================================

interface ButtonClickArgs {
  action: string
  message?: string
  notifyType?: 'success' | 'info' | 'warning' | 'error'
  callback?: (e: any, args: ButtonClickArgs) => void
  [key: string]: any
}

const eventHandlers = {
  handleButtonClick: (e: any, args: ButtonClickArgs = {}) => {
    // TypeScript provides autocomplete and type checking
    const { action, message, notifyType = 'info', callback } = args
    
    if (message) {
      notify(message, notifyType, 2000)
    }
    
    console.log('Button clicked:', { action, args })
    
    if (callback) {
      callback(e, args)
    }
  }
}
