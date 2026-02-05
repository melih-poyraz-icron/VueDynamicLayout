/**
 * Additional Layout Examples
 * Demonstrating more complex use cases
 */

export const advancedLayouts = {
  // Multi-tab Interface
  tabs: {
    type: "component",
    component: "DxTabPanel",
    props: {
      items: [
        {
          title: "Profile",
          template: "profileTab"
        },
        {
          title: "Settings",
          template: "settingsTab"
        }
      ],
      animationEnabled: true
    }
  },

  // Complex Form with Validation
  registrationForm: {
    type: "container",
    layout: "vertical",
    style: { gap: "15px", maxWidth: "600px", margin: "0 auto" },
    children: [
      {
        type: "component",
        component: "DxTextBox",
        props: {
          label: "Username",
          labelMode: "floating",
          placeholder: "Choose a username"
        }
      },
      {
        type: "component",
        component: "DxTextBox",
        props: {
          label: "Email",
          labelMode: "floating",
          placeholder: "your.email@example.com",
          mode: "email"
        }
      },
      {
        type: "component",
        component: "DxTextBox",
        props: {
          label: "Password",
          labelMode: "floating",
          placeholder: "Enter password",
          mode: "password"
        }
      },
      {
        type: "component",
        component: "DxCheckBox",
        props: {
          text: "I agree to the terms and conditions"
        }
      },
      {
        type: "container",
        layout: "horizontal",
        style: { gap: "10px", justifyContent: "center", marginTop: "20px" },
        children: [
          {
            type: "component",
            component: "DxButton",
            props: {
              text: "Cancel",
              type: "normal",
              width: 120
            }
          },
          {
            type: "component",
            component: "DxButton",
            props: {
              text: "Register",
              type: "success",
              width: 120
            }
          }
        ]
      }
    ]
  },

  // Responsive Grid Dashboard
  responsiveDashboard: {
    type: "container",
    layout: "grid",
    gridTemplate: {
      columns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px"
    },
    children: [
      {
        type: "container",
        layout: "vertical",
        style: {
          padding: "20px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
          color: "white"
        },
        children: [
          {
            type: "component",
            component: "DxButton",
            props: {
              text: "Active Users",
              width: "100%",
              stylingMode: "text"
            },
            style: { color: "white", fontSize: "18px" }
          },
          {
            type: "component",
            component: "DxNumberBox",
            props: {
              value: 3456,
              readOnly: true,
              format: "#,##0"
            },
            style: { 
              marginTop: "15px", 
              fontSize: "32px", 
              fontWeight: "bold",
              color: "white"
            }
          }
        ]
      },
      {
        type: "container",
        layout: "vertical",
        style: {
          padding: "20px",
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          borderRadius: "12px",
          color: "white"
        },
        children: [
          {
            type: "component",
            component: "DxButton",
            props: {
              text: "Total Orders",
              width: "100%",
              stylingMode: "text"
            },
            style: { color: "white", fontSize: "18px" }
          },
          {
            type: "component",
            component: "DxNumberBox",
            props: {
              value: 892,
              readOnly: true,
              format: "#,##0"
            },
            style: { 
              marginTop: "15px", 
              fontSize: "32px", 
              fontWeight: "bold",
              color: "white"
            }
          }
        ]
      }
    ]
  },

  // List with Actions
  taskList: {
    type: "container",
    layout: "vertical",
    style: { gap: "15px" },
    children: [
      {
        type: "container",
        layout: "horizontal",
        style: { gap: "10px", alignItems: "center" },
        children: [
          {
            type: "component",
            component: "DxTextBox",
            props: {
              placeholder: "Add new task...",
              width: "100%"
            }
          },
          {
            type: "component",
            component: "DxButton",
            props: {
              text: "Add",
              icon: "add",
              type: "success"
            }
          }
        ]
      },
      {
        type: "component",
        component: "DxList",
        props: {
          dataSource: [
            { id: 1, text: "Complete project documentation", completed: false },
            { id: 2, text: "Review pull requests", completed: true },
            { id: 3, text: "Update dependencies", completed: false }
          ],
          itemTemplate: "item",
          height: 400,
          showSelectionControls: true,
          selectionMode: "multiple"
        }
      }
    ]
  }
}
