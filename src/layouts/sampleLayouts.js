/**
 * Sample Layouts using JSON DSL
 */

export const sampleLayouts = {
  // Form Layout Example
  form: {
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
        component: "DxTextBox",
        props: {
          label: "Email",
          labelMode: "floating",
          placeholder: "Enter your email",
          mode: "email"
        }
      },
      {
        type: "component",
        component: "DxTextArea",
        props: {
          label: "Message",
          labelMode: "floating",
          placeholder: "Enter your message",
          height: 100
        }
      },
      {
        type: "container",
        layout: "horizontal",
        style: { gap: "10px", justifyContent: "flex-end" },
        children: [
          {
            type: "component",
            component: "DxButton",
            props: {
              text: "Cancel",
              type: "normal"
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
    ]
  },

  // Data Grid Layout Example
  grid: {
    type: "container",
    layout: "vertical",
    style: { gap: "20px" },
    children: [
      {
        type: "container",
        layout: "horizontal",
        style: { gap: "10px", marginBottom: "20px" },
        children: [
          {
            type: "component",
            component: "DxButton",
            props: {
              text: "Add Row",
              icon: "add",
              type: "success"
            }
          },
          {
            type: "component",
            component: "DxButton",
            props: {
              text: "Delete Selected",
              icon: "trash",
              type: "danger"
            }
          }
        ]
      },
      {
        type: "component",
        component: "DxDataGrid",
        props: {
          dataSource: [
            { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
            { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
            { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" }
          ],
          keyExpr: "id",
          showBorders: true,
          rowAlternationEnabled: true,
          columns: [
            { dataField: "id", caption: "ID", width: 70 },
            { dataField: "name", caption: "Name" },
            { dataField: "email", caption: "Email" },
            { dataField: "role", caption: "Role" }
          ],
          paging: {
            pageSize: 10
          },
          selection: {
            mode: "multiple"
          }
        }
      }
    ]
  },

  // Dashboard Layout Example
  dashboard: {
    type: "container",
    layout: "grid",
    gridTemplate: {
      columns: "repeat(2, 1fr)",
      rows: "auto",
      gap: "20px"
    },
    children: [
      {
        type: "container",
        layout: "vertical",
        style: { 
          padding: "20px", 
          background: "#f9f9f9", 
          borderRadius: "8px",
          border: "1px solid #e0e0e0"
        },
        children: [
          {
            type: "component",
            component: "DxButton",
            props: {
              text: "Total Users",
              width: "100%",
              height: 80,
              type: "default",
              stylingMode: "outlined"
            }
          },
          {
            type: "component",
            component: "DxNumberBox",
            props: {
              value: 1250,
              readOnly: true,
              format: "#,##0",
              stylingMode: "underlined"
            },
            style: { marginTop: "10px", fontSize: "24px", fontWeight: "bold" }
          }
        ]
      },
      {
        type: "container",
        layout: "vertical",
        style: { 
          padding: "20px", 
          background: "#f9f9f9", 
          borderRadius: "8px",
          border: "1px solid #e0e0e0"
        },
        children: [
          {
            type: "component",
            component: "DxButton",
            props: {
              text: "Revenue",
              width: "100%",
              height: 80,
              type: "success",
              stylingMode: "outlined"
            }
          },
          {
            type: "component",
            component: "DxNumberBox",
            props: {
              value: 45600,
              readOnly: true,
              format: "$#,##0",
              stylingMode: "underlined"
            },
            style: { marginTop: "10px", fontSize: "24px", fontWeight: "bold" }
          }
        ]
      },
      {
        type: "container",
        layout: "vertical",
        style: { 
          padding: "20px", 
          background: "#f9f9f9", 
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          gridColumn: "1 / -1"
        },
        children: [
          {
            type: "component",
            component: "DxChart",
            props: {
              dataSource: [
                { month: "Jan", value: 30 },
                { month: "Feb", value: 45 },
                { month: "Mar", value: 35 },
                { month: "Apr", value: 60 },
                { month: "May", value: 55 },
                { month: "Jun", value: 70 }
              ],
              title: "Monthly Statistics",
              series: [{
                argumentField: "month",
                valueField: "value",
                type: "bar",
                color: "#007bff"
              }]
            }
          }
        ]
      }
    ]
  }
}
