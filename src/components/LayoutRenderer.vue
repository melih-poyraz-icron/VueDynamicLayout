<template>
  <component
    :is="renderNode(layout)"
    v-if="layout"
  />
</template>

<script setup>
import { h } from 'vue'
import { getComponent } from './componentRegistry'

const props = defineProps({
  layout: {
    type: Object,
    required: true
  }
})

/**
 * Recursively render a layout node
 */
function renderNode(node) {
  if (!node) return null

  // Render container
  if (node.type === 'container') {
    return () => renderContainer(node)
  }

  // Render component
  if (node.type === 'component') {
    return () => renderComponent(node)
  }

  return null
}

/**
 * Render a container with layout
 */
function renderContainer(node) {
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
    h(renderNode(child), { key: index })
  )

  return h('div', {
    class: className,
    style: containerStyle
  }, childNodes)
}

/**
 * Render a DevExtreme component
 */
function renderComponent(node) {
  const { component: componentName, props = {}, style = {}, class: className, events = {} } = node

  // Get component from registry
  const Component = getComponent(componentName)
  if (!Component) {
    return h('div', { 
      style: { color: 'red', padding: '10px', border: '1px solid red' }
    }, `Component "${componentName}" not found`)
  }

  // Build component props
  const componentProps = { ...props }

  // Add event handlers
  Object.keys(events).forEach(eventName => {
    const handlerName = events[eventName]
    if (typeof handlerName === 'string') {
      // You can implement event handler lookup here
      console.log(`Event handler: ${eventName} -> ${handlerName}`)
    } else if (typeof handlerName === 'function') {
      componentProps[`on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`] = handlerName
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
