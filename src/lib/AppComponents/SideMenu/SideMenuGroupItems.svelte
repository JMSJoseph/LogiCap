<script lang="ts">
    import { onDestroy, onMount } from 'svelte'
    import { menuJsonData } from '@CircuitModel'
    import type { NodeMenuGroups } from '@CircuitModel'
    import type { menuJsonElement } from '@CircuitModel'

    // this will be a required prop but it is optional right now.
    let {
        zIndex = 0,
        createCanvasDevice,
        subMenuHeader = 'Logic Gates',
    }: {
        zIndex: number
        createCanvasDevice: (e: MouseEvent & { gateType: string }) => void
        subMenuHeader?: string
    } = $props()

    let sectionHeight: number = $state(0)

    interface GateItem {
        gateType: string
        label: string
        image: string
    }

    // why this?
    // yeah this should be replaced with the menu.ts
    // depending in the title prop passed in, use that json representation
    const menuItems: Array<menuJsonElement> =
        menuJsonData[subMenuHeader as NodeMenuGroups]['groupElements']

    let draggingItem: menuJsonElement | null = null
    let ghostElement: HTMLElement | null = null

    function createGhost(
        item: menuJsonElement,
        pageX: number,
        pageY: number
    ): void {
        ghostElement = document.createElement('div')
        ghostElement.className = 'drag-ghost'

        ghostElement.style.position = 'fixed'
        ghostElement.style.pointerEvents = 'none'
        ghostElement.style.left = pageX + 'px'
        ghostElement.style.top = pageY + 'px'
        ghostElement.style.zIndex = '200'
        ghostElement.style.transform = 'scale(1.3)'

        const img = document.createElement('img')
        img.src = item.icon
        img.alt = item.nodeType + 'drag gate ghost'
        img.style.width = '82px'
        img.style.opacity = '0.7'
        ghostElement.appendChild(img)

        document.body.appendChild(ghostElement)
    }

    function updateGhostPosition(pageX: number, pageY: number): void {
        if (ghostElement) {
            ghostElement.style.left = pageX + 'px'
            ghostElement.style.top = pageY + 'px'
        }
    }

    function removeGhost(): void {
        if (ghostElement) {
            ghostElement.remove()
            ghostElement = null
        }
    }

    function handleMouseDown(item: menuJsonElement, event: MouseEvent): void {
        event.preventDefault()
        draggingItem = item
        createGhost(item, event.pageX, event.pageY)
    }

    function handleMouseMove(event: MouseEvent): void {
        if (ghostElement) {
            updateGhostPosition(event.pageX, event.pageY)
        }
    }

    function handleGlobalClick(event: MouseEvent): void {
        event.stopPropagation()
        if (draggingItem && ghostElement) {
            const dropTarget = document.elementFromPoint(
                event.clientX,
                event.clientY
            )
            updateGhostPosition(event.pageX, event.pageY)

            // const droppedOnCanvas =
            //     dropTarget?.classList.contains('svelvet-wrapper')
            // console.log(dropTarget?.classList)
            const sideMenu = document.querySelector('.svelvet-wrapper')

            // const droppedOnMenu = dropTarget?.classList.contains('side-menu')

            const droppedOnCanvas = sideMenu?.contains(dropTarget)

            if (droppedOnCanvas) {
                const e: MouseEvent & { gateType: string } = {
                    ...event,
                    gateType: draggingItem.nodeType,
                }
                createCanvasDevice(e)
            }

            draggingItem = null
            removeGhost()
            event.stopPropagation()
        }
    }

    onMount(() => {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('click', handleGlobalClick)
    })

    onDestroy(() => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('click', handleGlobalClick)
        removeGhost()
    })
    // This component really shouldn't be an ordered list that's so stupid

    // Group items should be in an each block, images need to be passed from an
    // array or json object
    // style={showSubMenu ? 'display: none' : 'display: grid'}
</script>

<ol style={`z-index:${zIndex};`} class="side_menu_group" id="section_{zIndex}">
    {#each menuItems as item}
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <li onmousedown={(event) => handleMouseDown(item, event)}>
            <button
                class="gate-button"
                style="background:none; border:none; padding:0; cursor:pointer;"
            >
                <img src={item.icon} alt="{item.name} logic gate, hand-drawn" />
            </button>
            {item.name}
        </li>
    {/each}
</ol>

<style>
    .side_menu_group {
        position: relative;
        list-style-type: none;
        /* transform: translateY(-300px); */
        /* margin-left: 40px; */

        /* Grid Fallback */
        /* display: flex;
        flex-wrap: wrap; */

        /* Supports Grid */
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        /* grid-auto-rows: minmax(100px, auto); */
        grid-gap: 10px;
        padding-inline: 10px;
        padding-top: calc(var(--side-menu-spacing));
        /* margin-top: -10px; */
        /* Roughly centered relative to the next title same as * .9 right?*/
        /* needs to account for the outline's on hover, because outline does not take up space, so it will overlap. */
        padding-bottom: 4px;

        /*    hide scrollbars     */
    }
    img {
        width: 70px;
        margin-bottom: -6px;
        margin-top: 3px;
    }
    :global(.light .side_menu_group, .light .side_menu_group li) {
        background-color: var(--side-menu-bg);
        color: black;
    }
    :global(.side_menu_group:last-child::after) {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: calc(100vh - 100%); /* Extends to the bottom of the screen */
        z-index: -1;
    }

    :global(.dark .side_menu_group:last-child::after) {
        background-color: var(--side-menu-bg-dark);
    }

    :global(.light .side_menu_group:last-child::after) {
        background-color: var(--side-menu-bg);
    }

    :global(.dark .drag-ghost img) {
        filter: invert(100%);
    }
    :global(.dark .side_menu_group, .dark .side_menu_group li) {
        background-color: var(--side-menu-bg-dark);
        color: white;
    }

    :global(.dark .side_menu_group li img) {
        filter: invert(100%);
    }

    .side_menu_group li {
        /* z-index: -2; */
        /* background-color: var(--blue); */
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        min-height: 65px;

        border-radius: 20px;
        border: 2px solid black;
        /* box-shadow: 4px 4px 0px 0px #000000; */
    }

    .side_menu_group li:hover {
        border: 2px solid transparent;
        outline: 4px solid red;
    }
</style>
