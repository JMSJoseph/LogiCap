<script context="module">
    import {
        calculateStepPath,
        calculateRadius,
        calculatePath,
    } from '../../utils/calculators'
    import { onMount, onDestroy, getContext, afterUpdate } from 'svelte'
    import { directionVectors, stepBuffer } from '../../constants'
    import { buildPath, rotateVector } from '../../utils/helpers'
    import { buildArcStringKey, constructArcString } from '../../utils/helpers'
    import { get } from 'svelte/store'
    let animationFrameId
    function moveEdge(edgeElement) {
        const parentNode = edgeElement.parentNode
        if (!parentNode) return
        parentNode.removeChild(edgeElement)
        const newContainer = document.querySelector(`.svelvet-graph-wrapper`)
        if (!newContainer) return
        newContainer.appendChild(edgeElement)
    }
</script>

<script>
    const edgeStore = getContext('edgeStore')
    const edgeStyle = getContext('edgeStyle')
    const endStyles = getContext('endStyles')
    const raiseEdgesOnSelect = getContext('raiseEdgesOnSelect')
    const edgesAboveNode = getContext('edgesAboveNode')
    export let edge = getContext('edge')
    export let straight = edgeStyle === 'straight'
    export let step = edgeStyle === 'step'
    export let start = endStyles[0]
    export let end = endStyles[1]
    export let animate = false
    export let label = ''
    export let enableHover = false
    export let enableManipulation = false
    export let edgeClick = null
    export let labelPosition = 0.5
    export let width = null
    export let color = null
    export let labelColor = null
    export let textColor = null
    export let cornerRadius = 8
    export let targetColor = null
    const source = edge.source
    const target = edge.target
    const sourceDirection = source.direction
    const targetDirection = target.direction
    const sourceRotation = source.rotation
    const targetRotation = target.rotation
    const sourcePositionStore = source.position
    const targetPositionStore = target.position
    const sourceDynamic = source.dynamic
    const targetDynamic = target.dynamic
    const sourceMoving = source.moving
    const targetMoving = target.moving
    const sourceNodePositionStore = source.node?.position
    const targetNodePositionStore = target.node?.position
    const edgeType = edge.type
    const edgeKey = edge.id
    let path
    let DOMPath
    let labelPoint = { x: 0, y: 0 }
    let tracking = false
    let prefersVertical = false
    let sourceAbove = false
    let sourceLeft = false
    let hovering = false
    let edgeElement
    $: dynamic = $sourceDynamic || $targetDynamic
    $: edgeColor = source?.edgeColor || target?.edgeColor || null
    $: edgeLabel = edge.label?.text
    $: finalColor = color || $edgeColor || null
    $: labelText = label || $edgeLabel || ''
    $: renderLabel = labelText || $$slots.label
    $: sourcePosition = $sourcePositionStore
    $: targetPosition = $targetPositionStore
    $: sourceNodePosition = $sourceNodePositionStore
    $: targetNodePosition = $targetNodePositionStore
    $: sourceX = sourcePosition.x
    $: sourceY = sourcePosition.y
    $: targetX = targetPosition.x
    $: targetY = targetPosition.y
    $: deltaX = targetX - sourceX
    $: deltaY = targetY - sourceY
    $: anchorWidth = Math.abs(deltaX)
    $: anchorHeight = Math.abs(deltaY)
    $: maxCurveDisplaceX = Math.max(30, Math.min(600, anchorWidth / 2))
    $: maxCurveDisplaceY = Math.max(30, Math.min(600, anchorHeight / 2))
    $: sourceControlVector = rotateVector(
        directionVectors[$sourceDirection],
        $sourceRotation || 0
    )
    $: targetControlVector = rotateVector(
        directionVectors[$targetDirection],
        $targetRotation || 0
    )
    $: sourceControlX = sourceX + sourceControlVector.x * maxCurveDisplaceX
    $: sourceControlY = sourceY + sourceControlVector.y * maxCurveDisplaceY
    $: targetControlX = targetX + targetControlVector.x * maxCurveDisplaceX
    $: targetControlY = targetY + targetControlVector.y * maxCurveDisplaceY

    let centerControlPoint = { x: 0, y: 0 }
    let centerControlMoving = false
    let centerControlOffset = { x: 0, y: 0 }

    // Initialize and update center control point when source/target change

    // Build path for bezier curve with center control point
    $: if (enableManipulation) {
        // Use a cubic Bezier curve from source to centerControl and another from centerControl to target
        path =
            `M ${sourceX}, ${sourceY} ` +
            `C ${sourceControlX}, ${sourceControlY} ` +
            `${centerControlPoint.x}, ${centerControlPoint.y} ` +
            `${centerControlPoint.x}, ${centerControlPoint.y} ` +
            `${centerControlPoint.x}, ${centerControlPoint.y} ` +
            `${targetControlX}, ${targetControlY} ` +
            `${targetX}, ${targetY}`
    } else {
        // Use standard Bezier curve (original implementation)
        const controlPointString = `C ${sourceControlX}, ${sourceControlY} ${targetControlX}, ${targetControlY}`
        if (!step || edgeKey === 'cursor' || $edgeType === 'bezier') {
            path = `M ${sourceX}, ${sourceY} ${!straight ? controlPointString : ''} ${targetX}, ${targetY}`
        }
    }

    // $:
    //   controlPointString = `C ${sourceControlX}, ${sourceControlY} ${targetControlX}, ${targetControlY}`;
    $: if (
        renderLabel &&
        !tracking &&
        ($sourceMoving || $targetMoving || edgeKey === 'cursor')
    ) {
        tracking = true
        trackPath()
    } else if (
        tracking &&
        !$sourceMoving &&
        !$targetMoving &&
        edgeKey !== 'cursor'
    ) {
        tracking = false
        cancelAnimationFrame(animationFrameId)
    }
    $: if (dynamic && source.node && target.node) {
        const nodeXDelta = targetNodePosition.x - sourceNodePosition.x
        const nodeYDelta = targetNodePosition.y - sourceNodePosition.y
        sourceAbove = nodeYDelta > 0
        sourceLeft = nodeXDelta > 0
        let borderDeltaY
        let borderDeltaX
        if (sourceAbove) {
            const sourceHeight = get(source.node.dimensions.height)
            const sourceBottom = sourceNodePosition.y + sourceHeight
            borderDeltaY = targetNodePosition.y - sourceBottom
        } else {
            const targetHeight = get(target.node.dimensions.height)
            const targetBottom = targetNodePosition.y + targetHeight
            borderDeltaY = sourceNodePosition.y - targetBottom
        }
        if (sourceLeft) {
            const sourceWidth = get(source.node.dimensions.width)
            const sourceRight = sourceNodePosition.x + sourceWidth
            borderDeltaX = targetNodePosition.x - sourceRight
        } else {
            const targetWidth = get(target.node.dimensions.width)
            const targetRight = targetNodePosition.x + targetWidth
            borderDeltaX = sourceNodePosition.x - targetRight
        }
        prefersVertical = borderDeltaY > borderDeltaX
    }
    $: if (dynamic) {
        let newSourceDirection
        let newTargetDirection
        if (prefersVertical) {
            newSourceDirection = sourceAbove ? 'south' : 'north'
            newTargetDirection = sourceAbove ? 'north' : 'south'
        } else {
            newSourceDirection = sourceLeft ? 'east' : 'west'
            newTargetDirection = sourceLeft ? 'west' : 'east'
        }
        if ($sourceDynamic) $sourceDirection = newSourceDirection
        if ($targetDynamic) $targetDirection = newTargetDirection
    }
    edge.rendered.set(true)
    onMount(() => {
        setTimeout(() => {
            if (DOMPath) {
                labelPoint = calculatePath(DOMPath, labelPosition)
            }

            centerControlPoint = {
                x: (sourceControlX + targetControlX) / 2,
                y: (sourceControlY + targetControlY) / 2,
            }
        }, 0)
        moveEdge(edgeElement)
    })
    afterUpdate(() => {
        if (DOMPath) {
            labelPoint = calculatePath(DOMPath, labelPosition)
        }
    })
    onDestroy(() => {
        edgeElement.remove()
        cancelAnimationFrame(animationFrameId)
    })
    function trackPath() {
        if (!tracking) return
        if (DOMPath) {
            labelPoint = calculatePath(DOMPath, labelPosition)
        }
        animationFrameId = requestAnimationFrame(trackPath)
    }
    export function destroy() {
        if (source.id === null || target.id === null) return
        const edgeKey2 = edgeStore.match(source, target)
        edgeStore.delete(edgeKey2[0])
        source?.connected.update((connected) => {
            if (target) connected.delete(target)
            return connected
        })
        target?.connected.update((connected) => {
            if (source) connected.delete(source)
            return connected
        })
    }
    // Handle mouse events for center control point
    function handleCenterControlMouseDown(e) {
        e.stopPropagation()
        centerControlMoving = true

        // Calculate offset to avoid jumping
        centerControlOffset = {
            x: e.clientX - centerControlPoint.x,
            y: e.clientY - centerControlPoint.y,
        }

        // Add listeners for move and end
        window.addEventListener('mousemove', handleCenterControlMouseMove)
        window.addEventListener('mouseup', handleCenterControlMouseUp)
    }

    function handleCenterControlMouseMove(e) {
        if (!centerControlMoving) return

        centerControlPoint = {
            x: e.clientX - centerControlOffset.x,
            y: e.clientY - centerControlOffset.y,
        }
    }

    function handleCenterControlMouseUp() {
        centerControlMoving = false
        window.removeEventListener('mousemove', handleCenterControlMouseMove)
        window.removeEventListener('mouseup', handleCenterControlMouseUp)
    }
    $: if (
        step &&
        edgeKey !== 'cursor' &&
        !($edgeType && $edgeType === 'bezier')
    ) {
        const sourceObject = {
            x: sourceX,
            y: sourceY,
            direction: directionVectors[$sourceDirection],
        }
        const targetObject = {
            x: targetX,
            y: targetY,
            direction: directionVectors[$targetDirection],
        }
        const steps = calculateStepPath(sourceObject, targetObject, stepBuffer)
        const buildArcStringIfNeeded = (step2, index, radius) => {
            if (index < steps.length - 1) {
                const arcStringKey = buildArcStringKey(step2, steps[index + 1])
                return constructArcString(radius, arcStringKey)
            }
            return ''
        }
        path = steps.reduce((string, step2, index) => {
            const directionX = Math.sign(step2.x)
            const directionY = Math.sign(step2.y)
            let xStep = step2.x
            let yStep = step2.y
            let arcString = ''
            if (cornerRadius) {
                const nextStep = steps[index + 1] || { x: 0, y: 0 }
                const previousStep = steps[index - 1] || { x: 0, y: 0 }
                const radiusX = calculateRadius(
                    step2.x,
                    nextStep.x,
                    cornerRadius
                )
                const radiusY = calculateRadius(
                    nextStep.y,
                    step2.y,
                    cornerRadius
                )
                const previousRadiusX = calculateRadius(
                    previousStep.x,
                    step2.x,
                    cornerRadius
                )
                const previousRadiusY = calculateRadius(
                    previousStep.y,
                    step2.y,
                    cornerRadius
                )
                const previousRadius = Math.min(
                    previousRadiusX,
                    previousRadiusY
                )
                const radius = Math.min(radiusX, radiusY)
                if (step2.x) {
                    xStep = step2.x - (radius + previousRadius) * directionX
                } else {
                    yStep = step2.y - (radius + previousRadius) * directionY
                }
                arcString = buildArcStringIfNeeded(step2, index, radius)
            }
            return buildPath(string, xStep, yStep, arcString)
        }, `M ${sourceX}, ${sourceY}`)
    }
    $: sourceZIndex = source.node.zIndex || 0
    $: targetZIndex = target.node.zIndex || 0
    $: maxZIndex = Math.max($sourceZIndex, $targetZIndex)
    $: zIndex =
        edgesAboveNode === 'all'
            ? 1e5
            : edgesAboveNode
              ? maxZIndex
              : raiseEdgesOnSelect === true
                ? maxZIndex - 1
                : raiseEdgesOnSelect === 'source'
                  ? $sourceZIndex - 1
                  : raiseEdgesOnSelect === 'target'
                    ? $targetZIndex - 1
                    : 0
</script>

{#if source && target}
    <svg class="edges-wrapper" style:z-index={zIndex} bind:this={edgeElement}>
        {#if start || end}
            <defs>
                <marker
                    id={edgeKey + '-end-arrow'}
                    viewBox="0 0 15 15"
                    markerWidth="15"
                    markerHeight="10"
                    refX="12.5"
                    refY="5"
                    orient="auto"
                >
                    <polygon
                        class="arrow"
                        points="0 0, 15 5, 0 10"
                        style:--prop-edge-color={finalColor}
                    />
                </marker>
                <marker
                    id={edgeKey + '-start-arrow'}
                    viewBox="0 0 15 15"
                    markerWidth="15"
                    markerHeight="10"
                    refX="0"
                    refY="5"
                    orient="auto"
                >
                    <polygon
                        class="arrow"
                        points="0 5, 15 0, 15 10"
                        style:--prop-edge-color={finalColor}
                    />
                </marker>
            </defs>
        {/if}
        <path
            role="presentation"
            id={edgeKey + '-target'}
            class="target"
            class:cursor={edgeKey === 'cursor' || (!edgeClick && !enableHover)}
            style:cursor={edgeClick || hovering ? 'pointer' : 'move'}
            style:--prop-target-edge-color={edgeClick || hovering
                ? targetColor || null
                : 'transparent'}
            d={path}
            on:mousedown={edgeClick}
            on:mouseenter={() => (hovering = true)}
            on:mouseleave={() => (hovering = false)}
            bind:this={DOMPath}
        />
        <slot {path} {destroy} {hovering}>
            <path
                id={edgeKey}
                class="edge"
                class:animate
                d={path}
                style:--prop-edge-color={finalColor}
                marker-end={end === 'arrow'
                    ? `url(#${edgeKey + '-end-arrow'})`
                    : ''}
                marker-start={start === 'arrow'
                    ? `url(#${edgeKey + '-start-arrow'})`
                    : ''}
                style:--prop-stroke-width={width ? width + 'px' : null}
            />
        </slot>
        {#if enableManipulation}
            <!-- Source control point for visualization -->
            <!-- <line -->
            <!--     class="control-line" -->
            <!--     x1={sourceX} -->
            <!--     y1={sourceY} -->
            <!--     x2={sourceControlX} -->
            <!--     y2={sourceControlY} -->
            <!-- /> -->
            <!---->
            <!-- <!-- Target control point for visualization --> -->
            <!-- <line -->
            <!--     class="control-line" -->
            <!--     x1={targetX} -->
            <!--     y1={targetY} -->
            <!--     x2={targetControlX} -->
            <!--     y2={targetControlY} -->
            <!-- /> -->
            <!---->
            <!-- <!-- Center control point lines --> -->
            <!-- <line -->
            <!--     class="control-line" -->
            <!--     x1={sourceControlX} -->
            <!--     y1={sourceControlY} -->
            <!--     x2={centerControlPoint.x} -->
            <!--     y2={centerControlPoint.y} -->
            <!-- /> -->
            <!-- <line -->
            <!--     class="control-line" -->
            <!--     x1={targetControlX} -->
            <!--     y1={targetControlY} -->
            <!--     x2={centerControlPoint.x} -->
            <!--     y2={centerControlPoint.y} -->
            <!-- /> -->
            <!---->
            <!-- Draggable center control point -->
            <circle
                class="center-control"
                cx={centerControlPoint.x}
                cy={centerControlPoint.y}
                r="6"
                on:mousedown={handleCenterControlMouseDown}
            />
        {/if}
        {#if renderLabel}
            <foreignObject
                x={labelPoint.x}
                y={labelPoint.y}
                width="100%"
                height="100%"
            >
                <span class="label-wrapper">
                    <slot name="label" {destroy} {hovering}>
                        <div
                            class="default-label"
                            style:--prop-label-color={labelColor}
                            style:--prop-label-text-color={textColor}
                        >
                            {labelText}
                        </div>
                    </slot>
                </span>
            </foreignObject>
        {/if}
    </svg>
{/if}

<style>
    /* Styles for control points and connecting lines */
    .control-line {
        stroke: #aaa;
        stroke-width: 1;
        stroke-dasharray: 4;
        pointer-events: none;
    }

    .center-control {
        fill: #ff9900;
        pointer-events: all;
        stroke: white;
        stroke-width: 2;
        cursor: move;
    }

    .arrow {
        fill: var(
            --prop-edge-color,
            var(--edge-color, var(--default-edge-color))
        ) !important;
    }

    .edge {
        stroke: var(
            --prop-edge-color,
            var(--edge-color, var(--default-edge-color))
        );
        stroke-width: var(
            --prop-stroke-width,
            var(--edge-width, var(--default-edge-width))
        );
        contain: strict;
    }
    .label-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        height: fit-content;
        transform: translate(-50%, -50%);
        pointer-events: auto;
    }

    .edges-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        fill: transparent;
        overflow: visible;
    }

    .target {
        pointer-events: stroke;
        stroke: none;
        stroke-width: calc(var(--edge-width, var(--default-edge-width)) + 8px);
    }

    .target:hover {
        stroke: var(
            --prop-target-edge-color,
            var(--target-edge-color, var(--default-target-edge-color))
        );
        opacity: 50%;
    }

    .cursor {
        pointer-events: none;
    }

    foreignObject {
        overflow: visible;
    }

    path {
        cursor: pointer;
    }

    .animate {
        stroke-dasharray: 5;
        animation: dash 1s linear infinite;
        will-change: stroke-dashoffset;
    }

    .default-label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        font-size: 1rem;
        height: 1.5rem;
        border-radius: 5px;
        padding: 10px;
        color: var(
            --prop-label-text-color,
            var(--label-text-color, var(--default-label-text-color))
        );
        background-color: var(
            --prop-label-color,
            var(--label-color, var(--default-label-color))
        );
    }

    @keyframes dash {
        from {
            stroke-dashoffset: 30;
        }
    }
</style>
