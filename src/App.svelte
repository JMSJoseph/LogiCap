<!-- https://coolorgS.co/palette/9b5de5-f15bb5-fee440-00bbf9-00f5d4 -->
<script module>
    export function onWireConnection(wireId: string) {
        console.log('Success new connection made id: ' + wireId)
        // saveCircuit() // we could auto-save on wire linking
        // but save on reload pretty much covers us.
        return null
    }
</script>

<script lang="ts">
    import CommandMenu from './lib/CommandMenu.svelte'
    // engines as just to call it with uppercase 'Engines'

    // import Circuit from './Circuit.svelte'

    // import { deviceFactoryMap } from '@Util/makeDigitalJsJson'
    import { onMount } from 'svelte'
    import { Svelvet, Minimap, ThemeToggle } from 'svelvet'

    import { CircuitStore, loadCircuit, saveCircuit } from '@CircuitStore'

    import type { logicGateTypes } from '@CircuitModel'

    import SideMenu from '@AppComponents/SideMenu/SideMenu.svelte'

    // I could call this 'generic' circuit or something
    import Circuit from './lib/Circuit.svelte'
    import SimMenu from '@AppComponents/SimMenu.svelte'
    import { fixSvelvetBugs, generateNonce, captureCurrentZoom } from './app'
    import SingleIoLogic from './lib/Circuits/LogicGates/SingleIoLogic.svelte'
    import TabMenu from '@AppComponents/TabMenu.svelte'
    import SettingsMenu from '@AppComponents/SettingsMenu.svelte'
    import ZoomThing from './lib/ZoomThing.svelte'
    import { setScale, setTranslation } from '@Util/graphUtils'

    // the Devices part of the digitalJS json. (manually synched with the CircuitStore)
    let currentDevicesData: Devices = $state({ ...$CircuitStore.devices })
    const clearDeviceData = () => (currentDevicesData = {})
    const setDeviceData = (devs: Devices) => (currentDevicesData = devs)

    let initialScale: number = $state(1)
    let initialTranslation: { x: number; y: number } = $state({ x: 0, y: 0 })

    let observer: MutationObserver

    // Dom stuff to find svelvet transformation data
    const querySelector = '[class^="svelvet-graph-wrapper"]'

    function parseTransform(transform: string) {
        // Some matching voodoo
        const match = transform.match(
            /translate\(([-.\d]+)px,\s*([-.\d]+)px\)\s*scale\(([-.\d]+)\)/
        )
        if (!match) return

        const [, x, y, scale] = match.map(Number)
        localStorage.setItem('canvasZoom', scale.toString())
        localStorage.setItem('canvasTranslation', `{"x": ${x}, "y": ${y}}`)
        // localStorage.setItem('canvasTranslation', '{"x": 0, "y": 0}')
    }

    // const setDeviceData = (newData: Devices) => (currentDevicesData = newData)

    // check if circuitStore is not null when the app starts up.
    onMount(() => {
        // All three of these ways work
        // loadCircuit((newData: Devices) => setDeviceData(newData))
        // loadCircuit((newData: Devices) => (currentDevicesData = newData))
        initialScale = parseFloat(localStorage.getItem('canvasZoom') || '1')
        initialTranslation = JSON.parse(
            localStorage.getItem('canvasTranslation') || '{"x": 0, "y": 0}'
        )

        loadCircuit() // load circuit from LS into CircuitStore,
        currentDevicesData = $CircuitStore.devices
        fixSvelvetBugs() // doesn't have to be on mount could just be in the component scope its the same.
        //Needs to wait until the dom catches up
        requestAnimationFrame(() => {
            const el = document.querySelector(querySelector) as HTMLElement

            if (!el) {
                console.warn('ZoomTrackerDOM: Svelvet wrapper not found')
                return
            }

            parseTransform(el.style.transform)

            observer = new MutationObserver(() => {
                parseTransform(el.style.transform)
            })

            observer.observe(el, {
                attributes: true,
                attributeFilter: ['style'],
            })
        })
        // restrictFitViewZoom()
    })

    // save circuit on page reload.
    window.addEventListener('beforeunload', () => {
        saveCircuit()
    })

    // create new node in the global store for circuitStore digital js backend.
    // sync the devices list with the currentDevicesData variable.

    // called on "drop" in sidemenugroupitem.svelte
    function createCanvasDevice(e: MouseEvent & { gateType: string }) {
        const gateType: logicGateTypes = e.gateType as logicGateTypes
        // this gate will update the store and then the subscribe will update the
        // list of circuits currently active on the screen

        // saves state to local storage on node add.
        const uuid = generateNonce()

        // create new gate on global circuit store on drop
        const newDeviceList = CircuitStore.addCircuitDevice(
            gateType,
            uuid
        ) as Devices
        currentDevicesData = newDeviceList

        // save on every addition of a new node.
        saveCircuit()
    }
    // fitView={true}

    let setDevices = (d: Devices) => (currentDevicesData = d)
    let currCircuitName = $state('')
</script>

<main id="logicap">
    <SettingsMenu />
    <SideMenu {createCanvasDevice} />
    <SimMenu
        clearCanvas={clearDeviceData}
        {currCircuitName}
        setCanvas={setDevices}
    />
    <CommandMenu {createCanvasDevice} />
    <TabMenu {clearDeviceData} {setDeviceData} />

    <!-- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border) -->
    <Svelvet
        theme="LogiCap"
        zoom={initialScale}
        translation={initialTranslation}
        editable={false}
        disableSelection={false}
        controls
    >
        <ZoomThing></ZoomThing>
        <Minimap width={100} corner="NE" slot="minimap" />
        <ThemeToggle main="LogiCap" corner="NW" alt="LogiCap" slot="toggle" />
        {#each Object.entries(currentDevicesData) as [nodeId, device] (nodeId)}
            <Circuit
                gateType={device.type as logicGateTypes}
                position={device.position}
                {nodeId}
                nodeProps={{
                    ...(device.type && { gateType: device.type }),
                    width: 80,
                    height: 50,
                    // Add any other specific props your node components need
                }}
            />
        {/each}
    </Svelvet>
</main>

<style>
    :root {
        --app-bar-height: 50px;
        --main-app-flex-height: calc(100vh - var(--app-bar-height));
    }

    /*   Hide the svelvet theme toggle button but make a proxy for it in simMenu.svelte *note 'has selector in css' is pretty cool*/
    :global(.controls-wrapper:has(.save-button)) {
        display: none !important;
    }

    main {
        display: flex;
        flex-direction: row;
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        padding-left: calc(1.5vw);
        justify-content: center;
        align-items: center;
        /* max-height: 100vh; */
    }

    :global(.svelvet-node) {
        background: none !important;
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
        width: auto !important;
        height: auto !important;
        min-width: 80px;
        min-height: 50px;
    }
    :global(
        .svelvet-wrapper,
        .svelvet-wrapper:focus-visible,
        .svelvet-wrapper:active,
        .svelvet-wrapper:focus
    ) {
        outline: none !important;
        border: none !important;
        box-shadow: unset !important;
    }
    :global(.svelvet-wrapper) {
        /* max-height: calc(100% - 3.5vh); */
        flex: 1;
    }
</style>
