/**
 * DevExtreme Component Registry
 * Maps component names to actual DevExtreme Vue components
 */

import { DxButton } from 'devextreme-vue/button'
import { DxTextBox } from 'devextreme-vue/text-box'
import { DxTextArea } from 'devextreme-vue/text-area'
import { DxNumberBox } from 'devextreme-vue/number-box'
import { DxSelectBox } from 'devextreme-vue/select-box'
import { DxDateBox } from 'devextreme-vue/date-box'
import { DxCheckBox } from 'devextreme-vue/check-box'
import { DxRadioGroup } from 'devextreme-vue/radio-group'
import { DxDataGrid } from 'devextreme-vue/data-grid'
import { DxList } from 'devextreme-vue/list'
import { DxTreeView } from 'devextreme-vue/tree-view'
import { DxChart } from 'devextreme-vue/chart'
import { DxTabPanel } from 'devextreme-vue/tab-panel'
import { DxAccordion } from 'devextreme-vue/accordion'
import { DxPopup } from 'devextreme-vue/popup'
import { DxLoadPanel } from 'devextreme-vue/load-panel'

export const componentRegistry = {
  // Form Components
  DxButton,
  DxTextBox,
  DxTextArea,
  DxNumberBox,
  DxSelectBox,
  DxDateBox,
  DxCheckBox,
  DxRadioGroup,
  
  // Data Components
  DxDataGrid,
  DxList,
  DxTreeView,
  
  // Visualization
  DxChart,
  
  // Layout Components
  DxTabPanel,
  DxAccordion,
  
  // Overlay Components
  DxPopup,
  DxLoadPanel
}

// Get component by name
export function getComponent(componentName) {
  const component = componentRegistry[componentName]
  if (!component) {
    console.warn(`Component "${componentName}" not found in registry`)
    return null
  }
  return component
}
