<template>
  <div id="app">
    <h1>Vue Dynamic Layout with DevExtreme</h1>
    
    <div class="demo-section">
      <h2>Dynamic Layout Renderer</h2>
      <LayoutRenderer :layout="currentLayout" :eventHandlers="eventHandlers" />
    </div>

    <div class="layout-selector">
      <h3>Select Layout:</h3>
      <DxSelectBox
        :items="layoutOptions"
        display-expr="name"
        value-expr="id"
        v-model:value="selectedLayoutId"
        @value-changed="onLayoutChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { DxSelectBox } from 'devextreme-vue/select-box'
import LayoutRenderer from './components/LayoutRenderer.vue'
import { sampleLayouts } from './layouts/sampleLayouts'
import notify from 'devextreme/ui/notify'

const selectedLayoutId = ref('form')
const layoutOptions = ref([
  { id: 'form', name: 'Form Layout' },
  { id: 'grid', name: 'Data Grid Layout' },
  { id: 'dashboard', name: 'Dashboard Layout' }
])

const currentLayout = computed(() => {
  return sampleLayouts[selectedLayoutId.value]
})

const onLayoutChange = () => {
  console.log('Layout changed to:', selectedLayoutId.value)
}

// Event handlers for components
const eventHandlers = {
  // Generic button click handler
  handleButtonClick: (e, args = {}) => {
    const { 
      action, 
      message, 
      notifyType = 'info',
      callback,
      selectedRows,
      selectedKeys
    } = args
    
    // Handle delete action with resolved selected rows
    if (action === 'deleteSelected') {
      if (selectedKeys && selectedKeys.length > 0) {
        notify(`Deleting ${selectedKeys.length} row(s)`, 'warning', 2000)
        console.log('Selected keys:', selectedKeys)
        console.log('Selected row data:', selectedRows)
        // Perform actual delete operation here
      } else {
        notify('No rows selected', 'info', 2000)
      }
      return
    }
    
    // Show notification for other actions
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
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
}

#app {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 30px;
  font-size: 32px;
}

h2 {
  color: #555;
  margin-bottom: 20px;
  font-size: 24px;
}

h3 {
  color: #666;
  margin-bottom: 15px;
  font-size: 18px;
}

.demo-section {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.layout-selector {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
