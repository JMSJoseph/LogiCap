<script>
    import { onMount } from 'svelte'
    import MoonIcon from '~icons/flowbite/moon-outline'
    import SunIcon from '~icons/flowbite/sun-outline'
    import { settingsStore } from '@AppComponents/SettingsMenu.svelte'

    // Check local storage for saved theme preference
    let darkModeActive = $state(false)

    onMount(() => {
        darkModeActive = localStorage.getItem('theme') === 'dark'
        updateTheme()
    })

    function toggleDarkMode() {
        darkModeActive = !darkModeActive

        // make sure the button toggle changes the value in settings
        $settingsStore.theme = darkModeActive ? 'dark' : 'light'
        localStorage.setItem('theme', darkModeActive ? 'dark' : 'light')
        updateTheme()
    }

    function updateTheme() {
        if (darkModeActive) {
            document.body.className = 'dark'
        } else {
            document.body.className = 'light'
        }
    }

    $effect(() => {
        if ($settingsStore.theme === 'light') {
            document.body.className = 'light'
            localStorage.setItem('theme', 'light')
            darkModeActive = false
        } else if ($settingsStore.theme === 'dark') {
            document.body.className = 'dark'
            localStorage.setItem('theme', 'dark')
            darkModeActive = true
        }
    })

    // set this variable's initial value based off of the users dark mode system presets.
</script>

<div class="side_menu_header">
    <div style="display: flex;align-items:center">
        <img
            src={`${import.meta.env.BASE_URL}logicap.webp`}
            alt="app-logo"
            style="max-width: 18%;min-width:10%; aspect-ratio: 1 / 1;margin-right: 5%;margin-block:15px;"
        />
        <h2>
            <span class="l_cap">L</span><span class="o_cap">o</span><span
                class="g_cap">g</span
            ><span class="i_cap">i</span><span class="c_cap">c</span><span
                class="a_cap"
                style="margin-left:4px;">A</span
            ><span class="p_cap">P</span>
        </h2>
    </div>
    {#if darkModeActive}
        <SunIcon
            onclick={toggleDarkMode}
            style="color:var(--neon-purple); min-width:28px;height:28px;margin-top: 5px;margin-right: -8px;"
        />
    {:else}
        <MoonIcon
            onclick={toggleDarkMode}
            style="color:grey !important; min-width:28px;height:28px;margin-top: 5px;margin-right: -8px;"
        />
    {/if}
    <!-- <img -->
    <!--     src={CollapseIcon} -->
    <!--     alt="used for collapsing the side menubar and making the simulator take up the whole screen" -->
    <!-- /> -->
</div>

<style>
    .side_menu_header {
        /* margin-top: -11px; */
        padding-inline: 10px;
        display: flex;
        justify-content: space-between;
        /* margin-bottom: var(--side-menu-spacing); */
    }

    h2 span:nth-child(6n) {
        color: var(--pitt-blue);
    }
    h2 span:nth-child(7n) {
        color: var(--pitt-yellow);
    }

    :global(.dark h2) {
        -webkit-text-stroke: 2px white;
    }
    :global(.light h2) {
        -webkit-text-stroke: 2px black;
    }
    h2 {
        font-size: 3rem;
        text-align: left;
        padding: 0;
        margin-bottom: 3px;
        color: transparent;
    }
</style>
