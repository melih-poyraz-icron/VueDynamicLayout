<template>
  <component
    :is="renderNode(layout)"
    v-if="layout"
  />
</template>

<script setup>
import { h, ref, onMounted, reactive, watch } from 'vue'
import { getComponent } from './componentRegistry'

const props = defineProps({
  layout: {
    type: Object,
    required: true
  },
  eventHandlers: {
    type: Object,
    default: () => ({})
  }
})

// Store for API data sources
const apiDataStore = reactive({})

// Store for component references
const componentRefs = reactive({})

// Fetch API data on mount
onMounted(() => {
  collectAndFetchApiData(props.layout)
})

// Watch for layout changes and refetch data
watch(() => props.layout, (newLayout) => {
  // Clear existing data
  Object.keys(apiDataStore).forEach(key => delete apiDataStore[key])
  // Fetch new data
  collectAndFetchApiData(newLayout)
}, { deep: true })

/**
 * Resolve expression in args (e.g., "$mainGrid.getSelectedRowsData()")
 */
function resolveExpression(value) {
  if (typeof value !== 'string' || !value.startsWith('$')) {
    return value
  }

  // Parse expression: $componentId.method() or $componentId.method(args)
  const match = value.match(/^\$(\w+)\.([\w.]+)(\((.*)\))?$/)
  if (!match) {
    console.warn(`Invalid expression syntax: ${value}`)
    return value
  }

  const [, componentId, methodPath, , argsStr] = match
  const componentRef = componentRefs[componentId]

  if (!componentRef || !componentRef.component) {
    console.warn(`Component "${componentId}" not found or not initialized`)
    return undefined
  }

  try {
    // Navigate method path (e.g., "option" or "columnOption")
    let target = componentRef.component
    const method = target[methodPath]

    if (typeof method !== 'function') {
      console.warn(`Method "${methodPath}" not found on component "${componentId}"`)
      return undefined
    }

    // Parse arguments if present
    let args = []
    if (argsStr && argsStr.trim()) {
      try {
        args = JSON.parse(`[${argsStr}]`)
      } catch (e) {
        console.warn(`Failed to parse arguments for ${value}:`, e)
      }
    }

    // Call method and return result
    return method.apply(target, args)
  } catch (error) {
    console.error(`Error executing expression ${value}:`, error)
    return undefined
  }
}

/**
 * Recursively resolve all expressions in an object
 */
function resolveArgs(args) {
  if (!args || typeof args !== 'object') {
    return args
  }

  if (Array.isArray(args)) {
    return args.map(item => 
      typeof item === 'string' && item.startsWith('$') 
        ? resolveExpression(item) 
        : resolveArgs(item)
    )
  }

  const resolved = {}
  for (const key in args) {
    const value = args[key]
    if (typeof value === 'string' && value.startsWith('$')) {
      resolved[key] = resolveExpression(value)
    } else if (typeof value === 'object') {
      resolved[key] = resolveArgs(value)
    } else {
      resolved[key] = value
    }
  }
  return resolved
}

/**
 * Recursively collect all API data sources and fetch them
 */
async function collectAndFetchApiData(node, path = '') {
  if (!node) return

  if (node.type === 'component' && node.props?.dataSource?.api) {
    const apiUrl = node.props.dataSource.api
    const key = `${path}_${node.component}_${apiUrl}`
    
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      apiDataStore[key] = data
    } catch (error) {
      console.error(`Error fetching data from ${apiUrl}:`, error)
      apiDataStore[key] = []
    }
  }

  if (node.children && Array.isArray(node.children)) {
    for (let i = 0; i < node.children.length; i++) {
      await collectAndFetchApiData(node.children[i], `${path}_${i}`)
    }
  }
}

/**
 * Recursively render a layout node
 */
function renderNode(node, path = '') {
  if (!node) return null

  // Render container
  if (node.type === 'container') {
    return () => renderContainer(node, path)
  }

  // Render component
  if (node.type === 'component') {
    return () => renderComponent(node, path)
  }

  return null
}

/**
 * Render a container with layout
 */
function renderContainer(node, path = '') {
  const { layout = 'vertical', children = [], style = {}, gridTemplate, class: className } = node

  // Build container style
  const containerStyle = {
    display: layout === 'grid' ? 'grid' : 'flex',
    flexDirection: layout === 'horizontal' ? 'row' : 'column',
    ...style
  }

  // Add grid template if specified
  if (layout === 'grid' && gridTemplate) {
    if (gridTemplate.columns) containerStyle.gridTemplateColumns = gridTemplate.columns
    if (gridTemplate.rows) containerStyle.gridTemplateRows = gridTemplate.rows
    if (gridTemplate.gap) containerStyle.gap = gridTemplate.gap
  }

  // Render children
  const childNodes = children.map((child, index) => 
    h(renderNode(child, `${path}_${index}`), { key: index })
  )

  return h('div', {
    class: className,
    style: containerStyle
  }, childNodes)
}

/**
 * Render a DevExtreme component
 */
function renderComponent(node, path = '') {
  const { component: componentName, props: nodeProps = {}, style = {}, class: className, events = {}, id } = node

  // Get component from registry
  const Component = getComponent(componentName)
  if (!Component) {
    return h('div', { 
      style: { color: 'red', padding: '10px', border: '1px solid red' }
    }, `Component "${componentName}" not found`)
  }

  // Build component props
  const componentProps = { ...nodeProps }

  // Store component reference if id is provided
  if (id) {
    componentProps.onInitialized = (e) => {
      componentRefs[id] = e
      // Call original onInitialized if exists
      if (nodeProps.onInitialized) {
        nodeProps.onInitialized(e)
      }
    }
  }

  // Handle API data source
  if (componentProps.dataSource && typeof componentProps.dataSource === 'object' && componentProps.dataSource.api) {
    const apiUrl = componentProps.dataSource.api
    const key = `${path}_${componentName}_${apiUrl}`
    
    // Use data from store if available
    if (apiDataStore[key]) {
      componentProps.dataSource = apiDataStore[key]
    } else {
      componentProps.dataSource = []
    }
  }

  // Add event handlers
  Object.keys(events).forEach(eventName => {
    const eventConfig = events[eventName]
    const handlers = props.eventHandlers || {}
    
    // Handle different event configuration formats
    let handler = null
    let args = null
    
    if (typeof eventConfig === 'string') {
      // Simple string reference: "handleClick"
      handler = handlers[eventConfig]
    } else if (typeof eventConfig === 'object' && eventConfig.handler) {
      // Object with handler and args: { handler: "handleClick", args: {...} }
      handler = handlers[eventConfig.handler]
      args = eventConfig.args
    } else if (typeof eventConfig === 'function') {
      // Direct function reference
      handler = eventConfig
    }
    
    if (handler) {
      // Wrap handler to resolve expressions and pass custom args
      const wrappedHandler = (e) => {
        if (args) {
          // Resolve expressions in args at runtime
          const resolvedArgs = resolveArgs(args)
          handler(e, resolvedArgs)
        } else {
          handler(e)
        }
      }
      
      // Convert event name to proper format (handle hyphenated names)
      const eventParts = eventName.split('-')
      const camelCaseEvent = eventParts
        .map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
      
      componentProps[`on${camelCaseEvent.charAt(0).toUpperCase()}${camelCaseEvent.slice(1)}`] = wrappedHandler
    } else if (typeof eventConfig === 'string') {
      console.warn(`Event handler "${eventConfig}" not found in eventHandlers prop`)
    } else if (eventConfig && eventConfig.handler) {
      console.warn(`Event handler "${eventConfig.handler}" not found in eventHandlers prop`)
    }
  })

  // Render component
  return h('div', {
    class: className,
    style: style
  }, [
    h(Component, componentProps)
  ])
}
</script>

<style scoped>
/* Default container styles */
</style>
