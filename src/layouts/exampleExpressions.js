/**
 * Expression Evaluation in Event Arguments
 * 
 * This example demonstrates how to use expression syntax to dynamically
 * call component methods and pass their results to event handlers.
 */

// ========================================
// 1. Basic Expression Syntax
// ========================================

/**
 * Expression Format: "$componentId.methodName()"
 * 
 * - Starts with $ to indicate an expression
 * - componentId: The id property of the component
 * - methodName: The DevExtreme API method to call
 * - (): Method call with optional arguments
 */

// Example: Get selected rows from a grid
const buttonWithExpression = {
  type: "component",
  component: "DxButton",
  props: { text: "Process Selected" },
  events: {
    click: {
      handler: "handleButtonClick",
      args: {
        selectedRows: "$mainGrid.getSelectedRowsData()",  // ⭐ Expression
        selectedKeys: "$mainGrid.getSelectedRowKeys()"    // ⭐ Expression
      }
    }
  }
}

// ========================================
// 2. Component Registration with ID
// ========================================

// To use expressions, components must have an id
const gridWithId = {
  type: "component",
  component: "DxDataGrid",
  id: "mainGrid",  // ⭐ Required for expressions
  props: {
    dataSource: [...],
    selection: { mode: "multiple" }
  }
}

// ========================================
// 3. Supported Expression Patterns
// ========================================

// Pattern 1: Method without arguments
args: {
  selectedKeys: "$mainGrid.getSelectedRowKeys()"
}

// Pattern 2: Method with arguments (JSON format)
args: {
  columnValue: "$mainGrid.columnOption('email', 'visible')"
}

// Pattern 3: Property access (if method-like)
args: {
  totalCount: "$mainGrid.totalCount()"
}

// Pattern 4: Multiple expressions
args: {
  selectedRows: "$mainGrid.getSelectedRowsData()",
  totalRows: "$mainGrid.totalCount()",
  pageSize: "$mainGrid.pageSize()"
}

// Pattern 5: Mixed with static values
args: {
  action: "export",                                    // Static
  selectedRows: "$mainGrid.getSelectedRowsData()",    // Expression
  format: "csv",                                        // Static
  includeHeaders: true                                  // Static
}

// ========================================
// 4. Complete Example: Grid Operations
// ========================================

const gridOperationsLayout = {
  type: "container",
  layout: "vertical",
  style: { gap: "20px" },
  children: [
    // Toolbar with action buttons
    {
      type: "container",
      layout: "horizontal",
      style: { gap: "10px" },
      children: [
        {
          type: "component",
          component: "DxButton",
          props: { text: "Delete Selected", icon: "trash", type: "danger" },
          events: {
            click: {
              handler: "handleButtonClick",
              args: {
                action: "delete",
                selectedRows: "$mainGrid.getSelectedRowsData()",
                selectedKeys: "$mainGrid.getSelectedRowKeys()"
              }
            }
          }
        },
        {
          type: "component",
          component: "DxButton",
          props: { text: "Export Selected", icon: "export" },
          events: {
            click: {
              handler: "handleButtonClick",
              args: {
                action: "export",
                selectedRows: "$mainGrid.getSelectedRowsData()",
                format: "csv"
              }
            }
          }
        },
        {
          type: "component",
          component: "DxButton",
          props: { text: "Refresh Grid", icon: "refresh" },
          events: {
            click: {
              handler: "handleButtonClick",
              args: {
                action: "refresh",
                gridRef: "$mainGrid"  // Pass entire component reference
              }
            }
          }
        }
      ]
    },
    // DataGrid
    {
      type: "component",
      component: "DxDataGrid",
      id: "mainGrid",
      props: {
        dataSource: { api: "https://api.example.com/users" },
        keyExpr: "id",
        selection: { mode: "multiple" },
        showBorders: true
      }
    }
  ]
}

// ========================================
// 5. Event Handlers (Receive Resolved Data)
// ========================================

const eventHandlers = {
  handleButtonClick: (e, args = {}) => {
    const { action, selectedRows, selectedKeys } = args
    
    // selectedRows and selectedKeys are already resolved at runtime!
    // No need to access grid instance manually
    
    switch(action) {
      case 'delete':
        if (selectedRows && selectedRows.length > 0) {
          console.log(`Deleting ${selectedRows.length} rows:`, selectedRows)
          deleteRows(selectedKeys)
        } else {
          notify('No rows selected', 'info', 2000)
        }
        break
        
      case 'export':
        if (selectedRows && selectedRows.length > 0) {
          exportToCSV(selectedRows)
        } else {
          notify('No rows to export', 'info', 2000)
        }
        break
        
      case 'refresh':
        // Expression can also pass references (not just method results)
        if (args.gridRef && args.gridRef.instance) {
          args.gridRef.instance.refresh()
        }
        break
    }
  }
}

// ========================================
// 6. Advanced: Form Validation
// ========================================

const formWithValidation = {
  type: "container",
  children: [
    {
      type: "component",
      component: "DxForm",
      id: "contactForm",
      props: {
        formData: { name: "", email: "" }
      }
    },
    {
      type: "component",
      component: "DxButton",
      props: { text: "Submit" },
      events: {
        click: {
          handler: "handleSubmit",
          args: {
            formData: "$contactForm.option('formData')",
            isValid: "$contactForm.validate()"
          }
        }
      }
    }
  ]
}

// ========================================
// 7. Advanced: Chart Data Export
// ========================================

const chartWithExport = {
  type: "container",
  children: [
    {
      type: "component",
      component: "DxChart",
      id: "salesChart",
      props: {
        dataSource: [...]
      }
    },
    {
      type: "component",
      component: "DxButton",
      props: { text: "Export Chart Data" },
      events: {
        click: {
          handler: "handleExport",
          args: {
            chartData: "$salesChart.getDataSource().items()"
          }
        }
      }
    }
  ]
}

// ========================================
// 8. Multiple Component References
// ========================================

const multiComponentLayout = {
  type: "container",
  children: [
    { type: "component", component: "DxDataGrid", id: "usersGrid", props: {...} },
    { type: "component", component: "DxDataGrid", id: "ordersGrid", props: {...} },
    {
      type: "component",
      component: "DxButton",
      props: { text: "Compare Selected" },
      events: {
        click: {
          handler: "handleCompare",
          args: {
            selectedUsers: "$usersGrid.getSelectedRowsData()",
            selectedOrders: "$ordersGrid.getSelectedRowsData()"
          }
        }
      }
    }
  ]
}

// ========================================
// 9. Error Handling
// ========================================

/**
 * Expression Resolution:
 * - Happens at runtime when event fires
 * - Returns undefined if component not found
 * - Returns undefined if method fails
 * - Logs warnings to console
 * 
 * Best Practices:
 * - Always check for undefined in handlers
 * - Provide fallback values
 * - Show user-friendly error messages
 */

const eventHandlersWithErrorHandling = {
  handleButtonClick: (e, args = {}) => {
    const { selectedRows = [], selectedKeys = [] } = args
    
    // Check if expression resolved successfully
    if (!Array.isArray(selectedRows)) {
      console.error('Failed to get selected rows')
      notify('Error accessing grid data', 'error', 2000)
      return
    }
    
    if (selectedRows.length === 0) {
      notify('No rows selected', 'info', 2000)
      return
    }
    
    // Process data
    processSelectedRows(selectedRows)
  }
}

// ========================================
// 10. Key Benefits
// ========================================

/**
 * ✅ Declarative - Define data needs in schema
 * ✅ Dynamic - Values resolved at runtime
 * ✅ Clean Handlers - No manual component access
 * ✅ Type Safe - Can validate expression syntax
 * ✅ Reusable - Same pattern across all components
 * ✅ Maintainable - Data flow is explicit
 * 
 * Limitations:
 * ⚠️ Component must have id property
 * ⚠️ Method must be available in DevExtreme API
 * ⚠️ Complex expressions not supported (use callback instead)
 * ⚠️ No chaining (e.g., "$grid.method1().method2()")
 */
