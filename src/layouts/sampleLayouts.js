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
            },
            events: {
              click: {
                handler: "handleButtonClick",
                args: {
                  action: "cancel",
                  message: "Form cancelled",
                  notifyType: "info"
                }
              }
            }
          },
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
            },
            events: {
              click: {
                handler: "handleButtonClick",
                args: {
                  action: "addRow",
                  message: "New row added!",
                  notifyType: "success"
                }
              }
            }
          },
          {
            type: "component",
            component: "DxButton",
            props: {
              text: "Delete Selected",
              icon: "trash",
              type: "danger"
            },
            events: {
              click: {
                handler: "handleButtonClick",
                args: {
                  queryParameters: {},
                  headers: {
                    "Content-Type": "application/json",
                    messageCode: "DS",
                  },
                  body: "$mainGrid.getSelectedRowsData()",
                  /*body: {
                    "InputObject": "$mainGrid.getSelectedRowsData()",
                    "ScenarioCode": "DeleteUsers",
                    "Expression": "Users",
                  },*/
                  notifyType: "warning"
                }
              }
            }
          }
        ]
      },
      {
        type: "container",
        layout: "horizontal",
        style: { gap: "20px" },
        children: [
          {
            type: "container",
            layout: "vertical",
            style: { flex: "1" },
            children: [
              {
                type: "component",
                component: "DxButton",
                props: {
                  text: "Users",
                  type: "default",
                  stylingMode: "outlined",
                  disabled: true
                },
                style: { marginBottom: "10px" }
              },
              {
                type: "component",
                component: "DxDataGrid",
                id: "mainGrid",
                props: {
                  dataSource: {
                    api: "https://jsonplaceholder.typicode.com/users",
                    /*headers: {
                      "MessageSchemaCode": "DS",
                    },
                    body: {
                      "ScenarioCode": "GetUsers",
                      "Expression": "Users",
                      "ParentClassName": "UserService"
                    }*/
                  },
                  keyExpr: "id",
                  showBorders: true,
                  rowAlternationEnabled: true,
                  columns: [
                    { dataField: "id", caption: "ID", width: 70 },
                    { dataField: "name", caption: "Name" },
                    { dataField: "email", caption: "Email" },
                    { dataField: "username", caption: "Username" },
                    { dataField: "phone", caption: "Phone" },
                    { dataField: "website", caption: "Website" }
                  ],
                  paging: {
                    pageSize: 10
                  },
                  selection: {
                    mode: "single"
                  },
                  filterRow: {
                    visible: true
                  },
                  searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: "Search..."
                  }
                }
              }
            ]
          },
          {
            type: "container",
            layout: "vertical",
            style: { flex: "1" },
            children: [
              {
                type: "component",
                component: "DxButton",
                props: {
                  text: "User Details (Posts)",
                  type: "default",
                  stylingMode: "outlined",
                  disabled: true
                },
                style: { marginBottom: "10px" }
              },
              {
                type: "component",
                component: "DxDataGrid",
                id: "userDetailsGrid",
                parentComponent: "mainGrid",
                parentEvent: "selection-changed",
                dataFetchConfig: {
                  apiTemplate: "https://jsonplaceholder.typicode.com/posts?userId={id}",
                  parentKeyField: "id"
                },
                props: {
                  dataSource: [],
                  keyExpr: "id",
                  showBorders: true,
                  rowAlternationEnabled: true,
                  columns: [
                    { dataField: "id", caption: "Post ID", width: 80 },
                    { dataField: "title", caption: "Title" },
                    { dataField: "body", caption: "Body", width: 300 }
                  ],
                  paging: {
                    pageSize: 10
                  },
                  noDataText: "Select a user to view their posts"
                }
              }
            ]
          }
        ]
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
