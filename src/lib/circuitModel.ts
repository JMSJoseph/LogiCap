import andIcon from '../assets/icons/circuits/And.webp'
import bufferIcon from '../assets/icons/circuits/Buffer.webp'
import orIcon from '../assets/icons/circuits/Or.webp'
import norIcon from '../assets/icons/circuits/Nor.webp'

import xorIcon from '../assets/icons/circuits/Xor.webp'
import xnorIcon from '../assets/icons/circuits/Xnor.webp'
import nandIcon from '../assets/icons/circuits/Nand.webp'
import notIcon from '../assets/icons/circuits/Not.webp'
import outputIcon from '../assets/icons/circuits/outputIcon.png'
import inputIcon from '../assets/icons/circuits/inputIcon.png'

import LogicGate from './LogicGates/LogicGate.svelte'
import SingleIoLogic from './LogicGates/SingleIoLogic.svelte'
import Lamp from './InputOutputNodes/Lamp.svelte'
import ButtonNode from './InputOutputNodes/ButtonNode.svelte'

import { type ComponentProps } from 'svelte'

// Types that represent the different groups
// as well as each node group based off of if they are handled in the same file.
// or their grouping in the menu
export type NodeMenuGroups = "Logic Gates" | "Input/Output" | "GhostElement"

export type dualInputLogicTypes = 'And' | 'Nand' | 'Or' | 'Nor' | 'Xor' | 'Xnor'
export type singleIoLogicTypes = 'Repeater' | 'Not'
export type logicGateTypes = singleIoLogicTypes | dualInputLogicTypes

export type ioNodeTypes = "Button" | "Lamp"
export type allNodeTypes = logicGateTypes | ioNodeTypes

// types for the structure of the menu
// this object is also used when dragging and dropping from SideMenuGroupItems.svelte
export type menuJsonElement = { name: string, nodeType: allNodeTypes, icon: string }
type menuJsonGroupElements = Record<"groupElements", Array<menuJsonElement>>
type menuJsonItem = Record<"svg", string | undefined> & menuJsonGroupElements
export type menuJsonType = Record<NodeMenuGroups, menuJsonItem>

// all possible props for all component groups.
// a component group probably has different logic/ a different json for digitalJS
type LogicGateProps = ComponentProps<typeof LogicGate>
type OutputResultNodeProps = ComponentProps<typeof Lamp>
type ButtonInputNodeProps = ComponentProps<typeof ButtonNode>

// needed in SimNode.svelte
// So far we don't need to worry about initializing SimNode, with specific props.
// when we do we will get them from SideMenuGroupItems.svelte and then spread them in App.svelte
export type AllNodeProps =
    | LogicGateProps // this one needs gateType.
    | OutputResultNodeProps // signalOn, default should be okay always on init
    | ButtonInputNodeProps // this one outputs a signal, it doesn't need any special inputs.

// This maybe should be just a json file but I want it to be in this folder and that is maybe problematic
export const menuJsonData: menuJsonType = {
    "Logic Gates": {
        "svg": undefined,
        "groupElements": [
            { name: "And", nodeType: "And", icon: andIcon },
            { name: "Nand", nodeType: "Nand", icon: nandIcon },
            { name: "Or", nodeType: "Or", icon: orIcon },
            { name: "Nor", nodeType: "Nor", icon: norIcon },
            { name: "Xor", nodeType: "Xor", icon: xorIcon },
            { name: "Xnor", nodeType: "Xnor", icon: xnorIcon },
            { name: "Not", nodeType: "Not", icon: notIcon },
            { name: "Repeater", nodeType: "Repeater", icon: bufferIcon }
        ]
    },
    "Input/Output": {
        "svg": undefined,
        "groupElements": [
            { name: "Lamp", nodeType: "Lamp", icon: outputIcon },
            { name: "Button", nodeType: "Button", icon: inputIcon },
        ]
    },
    "GhostElement": {
        "svg": undefined,
        "groupElements": [
        ]
    }
}

// This function is here as opposed to inside of SimNode.svelte
// This is in order to simplify the process of adding a new component

// 1. Add item to the menu
// 2. add the component name and type to its group in the menuJsonData
// 3. create the component
// 4. add the component prop type to AllNodeProps
// 5. add it to the switch statement below.
// If your component has specific required props: this may be an issue, lmk.
// this function is used to getComponent when dropping and create the correct component.
export function getComponent(type: allNodeTypes) {
    switch (type) {
        case 'And':
        case 'Nor':
        case 'Xor':
        case 'Xnor':
        case 'Or':
        case 'Nand':
            return LogicGate
        case 'Repeater':
        case 'Not':
            return SingleIoLogic
        case 'Button':
            return ButtonNode
        case 'Lamp':
            return Lamp
        default:
            return null
    }
}